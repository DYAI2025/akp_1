import { content } from '@/data/content';
import { motion } from 'motion/react';

export default function Publications() {
  return (
    <section className="py-24 max-w-[1600px] mx-auto">
      <div className="px-4 md:px-8 xl:px-12 mb-16">
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">Publikationen &<br />Veröffentlichungen</h2>
        <p className="font-sans text-sm leading-relaxed text-ink/70 max-w-xl">
          Das Archiv umfasst Fachartikel, Projektbesprechungen und analytische Beiträge. Ein Querschnitt durch den architektonischen Diskurs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 hairline-t hairline-b">
        {content.publications.map((pub, index) => (
          <motion.div
            key={pub.group}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`p-6 lg:p-8 hairline-r last:border-r-0 hover:bg-white/40 transition-colors group ${index > 0 ? 'hairline-t lg:border-t-0' : ''}`}
          >
             <h3 className="font-sans text-[10px] uppercase tracking-widest text-ink/50 mb-8">{pub.group}</h3>
             <ul className="space-y-4">
               {pub.items.map(item => (
                 <li key={item} className="font-serif text-lg leading-snug group-hover:text-olive transition-colors">
                   {item}
                 </li>
               ))}
             </ul>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center mt-12">
         {/* Decorative element replacing full list since full list wasn't provided in detail in the prompt */}
         <a
           href="#kontakt"
           className="font-sans text-[10px] uppercase tracking-widest px-6 py-3 hairline hover:bg-white/50 transition-colors flex items-center gap-2"
           data-cursor="Anfragen"
         >
           Publikationsliste anfragen <span className="font-serif text-sm" aria-hidden="true">+</span>
         </a>
      </div>
    </section>
  );
}
