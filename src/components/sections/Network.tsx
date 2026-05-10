import { content } from '@/data/content';
import { motion } from 'motion/react';

export default function Network() {
  return (
    <section className="py-24 px-4 md:px-8 xl:px-12 max-w-[1600px] mx-auto bg-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <div className="lg:col-span-4 sticky top-32">
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">Netzwerk & Teampartner</h2>
          <p className="font-sans text-sm leading-relaxed text-ink/70 mb-8">
            Komplexe Bauaufgaben erfordern ein starkes, interdisziplinäres Fundament. Unser Fachplanernetzwerk strukturiert die Schnittstellen der Bauplanung.
          </p>
          <div className="w-16 h-16 rounded-full hairline flex items-center justify-center">
             <div className="w-8 h-px bg-ink/30 rotate-45" />
             <div className="w-px h-8 bg-ink/30 absolute" />
          </div>
        </div>

        <div className="lg:col-span-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.network.map((node, index) => (
                <motion.div 
                  key={node}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="p-6 hairline bg-white/20 hover:bg-white/50 transition-colors group cursor-default relative overflow-hidden"
                >
                   {/* Background network lines on hover */}
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                   
                   <h3 className="font-serif text-xl relative z-10">{node}</h3>
                   <div className="mt-4 flex items-center gap-2 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-4 h-px bg-ink/40" />
                      <span className="font-sans text-[9px] uppercase tracking-widest text-ink/50">Partner anzeigen</span>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}
