import { content } from '@/data/content';
import { motion } from 'motion/react';

export default function Hero() {
  const { title, subtitle, description, meta } = content.hero;

  return (
    <section className="relative min-h-[90vh] pt-32 pb-16 px-8 md:px-12 xl:px-16 max-w-[1600px] mx-auto flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* Text Content (Left Column) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[0.95] mb-6 tracking-tighter">
              Architekten<br/>Kauschke +<br/>Partner
            </h1>
            <p className="font-sans text-sm leading-relaxed max-w-sm mb-8 opacity-80">
              {subtitle} {description}
            </p>
          </motion.div>

          {/* Metatags / Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 border-t border-black/10 pt-6 mb-8"
          >
            <div className="flex flex-col">
              <span className="font-sans text-[9px] uppercase tracking-widest opacity-40 mb-1">Standort</span>
              <span className="font-sans text-xs font-medium">Berlin, DE</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[9px] uppercase tracking-widest opacity-40 mb-1">Gegründet</span>
              <span className="font-sans text-xs font-medium">1991</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[9px] uppercase tracking-widest opacity-40 mb-1">Fokus</span>
              <span className="font-sans text-xs font-medium">Architektur & Gen.planung</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[9px] uppercase tracking-widest opacity-40 mb-1">Netzwerk</span>
              <span className="font-serif text-xs font-medium italic">21 Wettbewerbe</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4"
          >
            <a href="#projekte" className="inline-block border border-black px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-sans hover:bg-black hover:text-white transition-all" data-cursor="Projekte ansehen">
              Projekte ansehen
            </a>
          </motion.div>
        </div>

        {/* Visual / Material (Right Column) */}
        <div className="lg:col-span-7 relative w-full aspect-[4/3] bg-gray-200 group overflow-hidden" data-cursor="Scrollen">
          <motion.div 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img src="/big2284.jpg" alt="Pestalozzistraße 45-46" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="absolute inset-0 border border-black/5"></div>
            <div className="absolute bottom-6 left-6 z-10">
               <span className="text-[9px] uppercase font-sans tracking-widest bg-white/90 px-2 py-1">Featured</span>
               <h3 className="font-serif text-2xl mt-2 text-white drop-shadow-md">Pestalozzistraße 45–46</h3>
            </div>
            <div className="absolute top-4 right-4 font-mono text-[9px] text-white opacity-90 z-10 mix-blend-difference">01/03</div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
