import { content } from '@/data/content';
import { motion } from 'motion/react';

export default function Process() {
  return (
    <section id="leistungen" className="py-24 px-8 md:px-12 xl:px-16 max-w-[1600px] mx-auto border-t border-black/10 relative">
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl px-0 tracking-tight leading-tight mb-6">Leistungen & Prozess</h2>
          <p className="font-sans text-sm leading-relaxed opacity-80">
            Wir verbinden Entwurf, Generalplanung und Bauleitung mit lückenloser Präzision. Der Workflow umfasst alle 9 Leistungsphasen und ergänzende Beratungsstrukturen.
          </p>
        </div>
      </div>

      {/* Main Process Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
        {content.process.map((phase, index) => (
          <motion.div
            key={phase.phase}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex flex-col relative border border-black/10 p-6 group hover:bg-black hover:text-white transition-colors cursor-default"
          >
            <div className="mb-6 font-mono text-[9px] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-80">
              LPH {String(phase.phase).padStart(2, '0')}
            </div>
            
            <div className="h-full flex flex-col">
               <h3 className="font-serif text-lg mb-3">{phase.title}</h3>
               <p className="font-sans text-xs opacity-60 leading-relaxed font-light">{phase.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Supporting Services */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-black/10">
        <div className="lg:col-span-4">
          <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40">Unterstützende Leistungen</h3>
        </div>
        <div className="lg:col-span-8">
          <div className="flex flex-wrap gap-2">
             {content.services.map(service => (
               <div key={service} className="px-4 py-2 border border-black/10 font-sans text-[10px] uppercase tracking-widest opacity-80 hover:bg-black/5 transition-colors">
                  {service}
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
