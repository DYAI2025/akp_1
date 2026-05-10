import { content } from '@/data/content';
import { motion } from 'motion/react';

export default function Competencies() {
  return (
    <section id="kompetenzen" className="py-24 max-w-[1600px] mx-auto border-t border-black/10 mt-16 px-8 md:px-12 xl:px-16">
      <div className="mb-16">
        <h2 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight mb-6">Expertise & Kompetenzen</h2>
        <p className="font-sans text-sm leading-relaxed opacity-80 max-w-xl">
          Die strukturelle Aufstellung des Büros ermöglicht die Bearbeitung hochkomplexer Bauaufgaben. Erfahrung, Präzision und Innovationsbereitschaft bilden das Fundament.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.competencies.map((comp, index) => (
          <motion.div
            key={comp.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`p-6 border border-black/10 hover:bg-black/5 transition-colors group relative`} 
          >
             <h3 className="font-serif text-2xl mb-6 pr-8 leading-snug">{comp.title}</h3>
             
             <ul className="space-y-3 relative z-10">
               {comp.items.map(item => (
                 <li key={item} className="font-sans text-xs opacity-80 flex items-start group-hover:opacity-100 transition-opacity">
                   <span className="opacity-30 mr-2 mt-px font-mono text-[10px]">-</span>
                   {item}
                 </li>
               ))}
             </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
