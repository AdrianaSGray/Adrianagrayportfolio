import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS } from '../data/projects';

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  // Filter projects by category
  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B0E14] text-[#F1E194] rounded-full font-medium hover:bg-[#8b1e24] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(91,14,20,0.5)]"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-[#F1E194]">All</span>{' '}
            <span className="text-white">Projects</span>
          </h1>
          <p className="text-xl text-[#F1E194]/70 max-w-2xl mx-auto">
            Explore the complete collection of my creative works with detailed descriptions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#5B0E14] to-[#F1E194] mx-auto mt-6" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
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

        {/* Projects List */}
        <div className="space-y-20">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl overflow-hidden border border-[#F1E194]/10 shadow-[0_0_40px_rgba(241,225,148,0.1)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#0a0a0a]">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[#F1E194]/20 text-lg">No Image</span>
                    </div>
                  )}
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/50 lg:to-[#0a0a0a]/80" />
                  
                  {/* Category badge */}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-[#5B0E14]/90 backdrop-blur-sm rounded-full">
                    <span className="text-[#F1E194] text-sm font-medium">{project.category}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#F1E194] mb-4">
                      {project.title}
                    </h2>
                    <p className="text-[#F1E194]/40 text-sm">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-[#F1E194]/30 via-[#F1E194]/10 to-transparent" />

                  {/* Full Description */}
                  <div className="text-[#F1E194]/80 leading-relaxed space-y-4">
                    {project.fullDescription.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-base md:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full border-l-2 border-t-2 border-[#F1E194] rounded-br-full" />
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
                <div className="absolute bottom-0 right-0 w-full h-full border-r-2 border-b-2 border-[#F1E194] rounded-tl-full" />
              </div>
            </motion.article>
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
    </div>
  );
}
