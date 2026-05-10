import {useEffect, useState} from 'react';
import { content } from '@/data/content';
import { motion, AnimatePresence } from 'motion/react';

type Project = typeof content.projects[0];

function getProjectImage(project: Project) {
  return 'image' in project && typeof project.image === 'string' ? project.image : undefined;
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Extract all unique filters
  const allFilters = ["Alle", ...Array.from(new Set(content.projects.flatMap(p => p.category)))];

  const filteredProjects = activeFilter === "Alle"
    ? content.projects
    : content.projects.filter(p => p.category.includes(activeFilter));

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="projekte" className="py-24 max-w-[1600px] mx-auto border-t border-black/10">

      {/* Header & Filters */}
      <div className="px-8 md:px-12 xl:px-16 mb-16 space-y-12">
        <h2 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight">Archiv / Projekte</h2>

        <div className="flex flex-wrap gap-2">
          {allFilters.map(filter => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`font-sans text-[10px] uppercase tracking-[0.2em] px-4 py-2 transition-all border ${
                activeFilter === filter
                  ? 'bg-ink text-paper border-ink'
                  : 'border-black/20 hover:bg-black/5 text-ink'
              }`}
              data-cursor="Filtern"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 md:px-12 xl:px-16">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const isFeatured = index % 5 === 0 && activeFilter === "Alle";
            const projectImage = getProjectImage(project);
            return (
              <motion.button
                type="button"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                key={project.title}
                onClick={() => setSelectedProject(project)}
                aria-label={`Details zu ${project.title} öffnen`}
                className={`group cursor-pointer flex flex-col bg-paper transition-all hover:-translate-y-1 text-left ${
                  isFeatured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                data-cursor="Details"
              >
                {/* Visual Area for All Projects */}
                <div className={`w-full relative bg-[#EBEBEB] overflow-hidden mb-4 ${
                  isFeatured ? 'aspect-[4/3] md:aspect-[3/2]' : 'aspect-square md:aspect-[4/5]'
                }`}>
                  {projectImage ? (
                    <img
                      src={projectImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:10px_10px] group-hover:scale-105 transition-transform duration-700 ease-out ${projectImage ? 'hidden' : ''}`}></div>
                  <div className="absolute inset-0 border border-black/5 pointer-events-none"></div>
                  <div className={`absolute bottom-4 left-4 font-mono text-[8px] z-10 uppercase ${projectImage ? 'text-white mix-blend-difference' : 'text-ink/30'}`}>
                    Ref. / {index.toString().padStart(2, '0')}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="font-sans text-[9px] uppercase tracking-widest text-ink/50">{project.location}</span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl leading-tight group-hover:text-ink/70 transition-colors mb-3">
                    {project.title}
                  </h3>

                  <p className="font-sans text-sm text-ink/60 leading-relaxed max-w-lg mb-6 line-clamp-3">
                    {project.desc}
                  </p>

                  <div className="mt-auto flex gap-2 items-center pt-4 border-t border-black/10">
                     <span className="font-sans text-[9px] uppercase tracking-widest flex items-center justify-between w-full text-ink/40">
                       <span className="truncate pr-4">{project.category.join(', ')}</span>
                       <span className="group-hover:translate-x-1 group-hover:text-ink transition-all inline-block">&rarr;</span>
                     </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

       {/* Overlay / Drawer (Simple modal approach) */}
       <AnimatePresence>
         {selectedProject && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-end p-4 md:p-8 bg-ink/20 backdrop-blur-sm"
             onClick={() => setSelectedProject(null)}
             role="dialog"
             aria-modal="true"
             aria-labelledby="project-detail-title"
           >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full max-w-2xl h-full bg-paper hairline overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-8 md:p-12 relative">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-8 right-8 font-sans text-xs uppercase tracking-widest"
                    aria-label="Projekt-Detailansicht schließen"
                  >
                    Schließen
                  </button>
                  <div className="mt-12">
                     <span className="font-sans text-[10px] uppercase tracking-widest text-ink/50 block mb-4">{selectedProject.location}</span>
                     <h2 id="project-detail-title" className="font-serif text-3xl md:text-5xl leading-tight mb-8">{selectedProject.title}</h2>
                     <p className="font-sans text-lg text-ink/80 leading-relaxed mb-12">{selectedProject.desc}</p>

                     {getProjectImage(selectedProject) ? (
                       <div className="w-full relative aspect-[16/9] mb-12 bg-gray-100 overflow-hidden">
                         <img
                           src={getProjectImage(selectedProject)}
                           alt={selectedProject.title}
                           className="absolute inset-0 w-full h-full object-cover"
                           onError={(e) => {
                             e.currentTarget.style.display = 'none';
                             e.currentTarget.nextElementSibling?.classList.remove('hidden');
                           }}
                         />
                         <div className="hidden absolute inset-0 bg-ink/5 hairline flex items-center justify-center p-8">
                            <span className="font-sans text-[10px] uppercase tracking-widest text-ink/30 text-center">Projektbild Platzhalter<br/>Detailansicht</span>
                         </div>
                       </div>
                     ) : (
                       <div className="aspect-[16/9] w-full bg-ink/5 hairline flex items-center justify-center p-8 mb-12">
                          <span className="font-sans text-[10px] uppercase tracking-widest text-ink/30 text-center">Projektbild Platzhalter<br/>Detailansicht</span>
                       </div>
                     )}

                     <div className="grid grid-cols-2 gap-8 pt-8 hairline-t">
                        <div>
                          <h4 className="font-sans text-[10px] uppercase tracking-widest text-ink/50 mb-2">Kategorien</h4>
                          <ul className="space-y-1">
                            {selectedProject.category.map(c => <li key={c} className="font-sans text-sm">{c}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-sans text-[10px] uppercase tracking-widest text-ink/50 mb-2">Status</h4>
                          <p className="font-sans text-sm">Abgeschlossen</p>
                        </div>
                        {/* the prompt says: "Nur anzeigen, wenn entsprechende Informationen im SSOT vorhanden sind." So we only show what we have. */}
                     </div>
                  </div>
                </div>
              </motion.div>
           </motion.div>
         )}
       </AnimatePresence>

    </section>
  );
}
