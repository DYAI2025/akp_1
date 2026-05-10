import { content } from '@/data/content';
import { motion } from 'motion/react';

export default function Attitude() {
  return (
    <section id="buero" className="py-24 px-8 md:px-12 xl:px-16 max-w-[1600px] mx-auto border-t border-black/10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
        
        {/* Section Context */}
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-6 tracking-tight">Büro & Haltung</h2>
            <p className="font-sans text-sm leading-relaxed text-ink/80 opacity-80 max-w-md">
              Die Herangehensweise von AKP ist nicht durch formale Dogmen geprägt, sondern entspringt einer präzisen Auseinandersetzung mit dem Ort, der Funktion und den Zielen der Bauherren.
            </p>
          </div>
        </div>

        {/* Attitude Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.attitude.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-6 border border-black/10 flex flex-col justify-between group relative 
                ${index === 0 ? 'md:col-span-2 bg-ink text-paper' : 'bg-transparent text-ink aspect-square'} 
                hover:border-black/20 transition-colors`}
              data-cursor="Lesen"
            >
               <div className="flex justify-between items-start mb-12">
                  <span className={`font-sans text-[10px] uppercase tracking-[0.2em] underline underline-offset-4 ${index === 0 ? 'text-white/50' : 'opacity-40'}`}>
                    Haltung {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-olive' : 'bg-olive'}`} />
               </div>
               <div>
                 <h3 className="font-serif text-xl md:text-2xl mb-4 leading-snug">{item.title}</h3>
                 <p className={`font-sans text-sm leading-relaxed max-w-md ${index === 0 ? 'text-white/80' : 'opacity-80'}`}>
                   {item.text}
                 </p>
                 <p className={`text-[9px] mt-6 italic ${index === 0 ? 'opacity-40' : 'opacity-40'}`}>AKP Philosophie — 2024</p>
               </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
