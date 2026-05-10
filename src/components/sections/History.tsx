import { content } from '@/data/content';
import { motion } from 'motion/react';

export default function History() {
  return (
    <section id="geschichte" className="py-24 px-4 md:px-8 xl:px-12 max-w-[1600px] mx-auto bg-white/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Intro & Stats */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">Geschichte & Vita</h2>
            <p className="font-sans text-sm leading-relaxed text-ink/70">
              Von internationalen Strukturen zu präziser lokaler und überregionaler Planung. Stationen, die den Qualitätsanspruch formen.
            </p>
          </div>

          <div className="mt-16 flex flex-col gap-6">
            <h3 className="font-sans text-[10px] uppercase tracking-widest text-ink/50 border-b border-ink/10 pb-2">Kennzahlen</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              {content.stats.map(stat => (
                <div key={stat.text}>
                  <div className="font-serif text-3xl mb-1">{stat.value}</div>
                  <div className="font-sans text-[10px] uppercase tracking-widest text-ink/60">{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-8 relative mt-16 lg:mt-0">
           {/* Vertical Line Desktop */}
           <div className="hidden md:block absolute top-0 bottom-0 left-[8.5rem] w-px bg-ink/10" />
           {/* Vertical Line Mobile */}
           <div className="block md:hidden absolute top-0 bottom-0 left-6 w-px bg-ink/10" />

           <div className="space-y-16 relative z-10 py-8">
             {content.history.map((event, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col md:flex-row gap-6 md:gap-16 items-start group relative"
                >
                   {/* Year Marker */}
                   <div className="flex-shrink-0 md:w-32 relative z-20 pl-4 md:pl-0 flex items-center md:items-start md:pt-4">
                      {/* Node on line */}
                      <div className="absolute left-[20px] md:left-[8.15rem] top-1/2 -translate-y-1/2 md:-translate-y-0 md:top-6 w-[9px] h-[9px] rounded-full bg-paper border-2 border-ink/30 group-hover:border-ink group-hover:bg-ink transition-all duration-300 shadow-[0_0_0_4px_var(--color-paper)]" />
                      
                      <div className="font-mono text-sm md:text-base text-ink pl-8 md:pl-0 md:text-right w-full md:pr-10">
                        {event.year}
                      </div>
                   </div>
                   
                   {/* Content - Archivnotiz */}
                   <div className="pl-12 md:pl-0 w-full">
                      <div className="relative bg-[#faf9f8] border border-black/10 p-6 md:p-8 max-w-2xl w-full group-hover:border-black/30 group-hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.05)] transition-all duration-300">
                        
                        {/* Plan Lines aesthetic */}
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                          <div className="absolute top-0 bottom-0 left-[24px] w-px bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,currentColor_2px,currentColor_4px)] text-ink" />
                          <div className="absolute top-[24px] left-0 right-0 h-px bg-[repeating-linear-gradient(to_right,transparent,transparent_2px,currentColor_2px,currentColor_4px)] text-ink" />
                          
                          {/* Crosshairs */}
                          <div className="absolute top-[20px] right-[20px] w-2 h-2 border-t border-r border-ink" />
                          <div className="absolute bottom-[20px] left-[20px] w-2 h-2 border-b border-l border-ink" />
                        </div>

                        <div className="relative z-10 pl-4 md:pl-6 border-l border-ink/20 mt-4 group-hover:border-ink/50 transition-colors">
                          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40 mb-4 flex gap-4 items-center">
                            <span className="bg-ink/5 px-2 py-1">Archiv-Ref. {String(index + 1).padStart(2, '0')}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block">Dossier öffnen</span>
                          </div>
                          
                          <p className="font-serif text-lg md:text-xl text-ink/80 leading-relaxed group-hover:text-ink transition-colors">
                            {event.text}
                          </p>
                        </div>
                      </div>
                   </div>
                </motion.div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
}
