import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectGalleryProps {
  projects: Project[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [selectedProject]);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  // Filter projects by category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-[#F1E194]">Featured</span>{' '}
            <span className="text-white">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#5B0E14] to-[#F1E194] mx-auto" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#5B0E14] text-[#F1E194] shadow-[0_0_20px_rgba(91,14,20,0.4)]'
                  : 'bg-[#F1E194]/10 text-[#F1E194] hover:bg-[#F1E194]/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl overflow-hidden border border-[#F1E194]/10 hover:border-[#F1E194]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(241,225,148,0.15)] cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[#F1E194]/20 text-lg">No Image</span>
                  </div>
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Category badge */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-[#5B0E14]/90 backdrop-blur-sm rounded-full">
                  <span className="text-[#F1E194] text-sm font-medium">{project.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-[#F1E194] group-hover:text-white transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-[#F1E194]/70 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Click to view more */}
                <div className="pt-2">
                  <span className="text-[#F1E194] text-sm font-medium group-hover:underline">
                    Click to view full details →
                  </span>
                </div>

                {/* Date */}
                <div className="pt-4 border-t border-[#F1E194]/10">
                  <p className="text-[#F1E194]/40 text-sm">
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <div className="absolute bottom-0 right-0 w-full h-full border-r-2 border-b-2 border-[#F1E194] rounded-tl-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-[#F1E194]/60 text-xl">
              No projects found in this category
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl max-w-4xl w-full border border-[#F1E194]/20 shadow-[0_0_60px_rgba(241,225,148,0.2)] my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-[#5B0E14]/90 hover:bg-[#5B0E14] rounded-full transition-colors duration-300"
              >
                <X className="w-6 h-6 text-[#F1E194]" />
              </button>

              {/* Image */}
              {selectedProject.imageUrl && (
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                  
                  {/* Category badge */}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-[#5B0E14]/90 backdrop-blur-sm rounded-full">
                    <span className="text-[#F1E194] text-sm font-medium">{selectedProject.category}</span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-8 md:p-12 space-y-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-[#F1E194] mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-[#F1E194]/40 text-sm">
                    {new Date(selectedProject.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#F1E194]/30 to-transparent" />

                {/* Full Description */}
                <div className="text-[#F1E194]/80 leading-relaxed space-y-4">
                  {(selectedProject.fullDescription || selectedProject.description).split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full border-l-2 border-t-2 border-[#F1E194] rounded-br-full" />
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                <div className="absolute bottom-0 right-0 w-full h-full border-r-2 border-b-2 border-[#F1E194] rounded-tl-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}