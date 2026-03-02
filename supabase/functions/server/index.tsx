import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const publicAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';

// Ensure storage bucket exists
const bucketName = 'make-89eb1c84-portfolio';
(async () => {
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
  if (!bucketExists) {
    await supabase.storage.createBucket(bucketName, { public: false });
    console.log('Created portfolio storage bucket');
  }
})();

// Health check endpoint
app.get("/make-server-89eb1c84/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all projects (PUBLIC - no auth required)
app.get("/make-server-89eb1c84/projects", async (c) => {
  try {
    const projects = await kv.getByPrefix('project:');
    
    // Get signed URLs for all project images
    const projectsWithUrls = await Promise.all(
      projects.map(async (project) => {
        if (project.imageKey) {
          const { data } = await supabase.storage
            .from(bucketName)
            .createSignedUrl(project.imageKey, 3600);
          
          return {
            ...project,
            imageUrl: data?.signedUrl || null
          };
        }
        return project;
      })
    );
    
    return c.json({ projects: projectsWithUrls });
  } catch (error) {
    console.log('Error fetching projects:', error);
    return c.json({ error: 'Failed to fetch projects', details: String(error) }, 500);
  }
});

// Upload a new project (PROTECTED - requires authentication)
app.post("/make-server-89eb1c84/projects", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken || accessToken === publicAnonKey) {
      return c.json({ error: 'Unauthorized - Admin access required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user?.id) {
      console.log('Authentication error while uploading project:', authError);
      return c.json({ error: 'Unauthorized - Invalid authentication' }, 401);
    }

    const formData = await c.req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File;
    
    if (!title || !imageFile) {
      return c.json({ error: 'Title and image are required' }, 400);
    }
    
    // Generate unique project ID
    const projectId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const fileExt = imageFile.name.split('.').pop();
    const imageKey = `projects/${projectId}.${fileExt}`;
    
    // Upload image to Supabase Storage
    const imageBuffer = await imageFile.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(imageKey, imageBuffer, {
        contentType: imageFile.type,
        upsert: false
      });
    
    if (uploadError) {
      console.log('Error uploading image:', uploadError);
      return c.json({ error: 'Failed to upload image', details: uploadError.message }, 500);
    }
    
    // Save project metadata to KV store
    const project = {
      id: projectId,
      title,
      description: description || '',
      category: category || 'Uncategorized',
      imageKey,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`project:${projectId}`, project);
    
    // Get signed URL for the uploaded image
    const { data } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(imageKey, 3600);
    
    return c.json({ 
      project: {
        ...project,
        imageUrl: data?.signedUrl || null
      }
    });
  } catch (error) {
    console.log('Error creating project:', error);
    return c.json({ error: 'Failed to create project', details: String(error) }, 500);
  }
});

// Delete a project (PROTECTED - requires authentication)
app.delete("/make-server-89eb1c84/projects/:id", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken || accessToken === publicAnonKey) {
      return c.json({ error: 'Unauthorized - Admin access required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user?.id) {
      console.log('Authentication error while deleting project:', authError);
      return c.json({ error: 'Unauthorized - Invalid authentication' }, 401);
    }

    const projectId = c.req.param('id');
    const project = await kv.get(`project:${projectId}`);
    
    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }
    
    // Delete image from storage
    if (project.imageKey) {
      await supabase.storage
        .from(bucketName)
        .remove([project.imageKey]);
    }
    
    // Delete project from KV store
    await kv.del(`project:${projectId}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting project:', error);
    return c.json({ error: 'Failed to delete project', details: String(error) }, 500);
  }
});

// Admin signup endpoint (PROTECTED - requires secret key)
app.post("/make-server-89eb1c84/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, signupKey } = body;
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Verify the signup secret key
    const SECRET_SIGNUP_KEY = Deno.env.get('SECRET_SIGNUP_KEY');
    if (!signupKey || signupKey !== SECRET_SIGNUP_KEY) {
      console.log('Invalid signup attempt - incorrect secret key');
      return c.json({ error: 'Invalid signup key. This is a personal portfolio and signup is restricted to the owner only.' }, 403);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || 'Admin' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Error creating admin user:', error);
      return c.json({ error: 'Failed to create user', details: error.message }, 500);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Error in signup:', error);
    return c.json({ error: 'Failed to create user', details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);