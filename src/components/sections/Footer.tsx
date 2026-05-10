import { content } from '@/data/content';

export default function Footer() {
  return (
    <footer className="mt-24 pt-8 pb-12 px-8 md:px-12 xl:px-16 border-t border-black/10 grid grid-cols-1 md:grid-cols-12 items-end gap-12 md:gap-4 max-w-[1600px] mx-auto w-full">
       
       {/* Left / Office Info */}
       <div className="md:col-span-3 text-[9px] leading-relaxed uppercase tracking-widest">
         <p className="font-bold mb-1">AKP Berlin</p>
         <p className="opacity-60">{content.contact.address[1]}<br/>{content.contact.address[2]}</p>
       </div>

       {/* Middle / Process Steps representation */}
       <div className="md:col-span-6 flex justify-center hidden lg:flex">
          <div className="flex items-center gap-4">
             {content.process.slice(0,4).map((phase, i) => (
                <div key={phase.title} className="flex items-center">
                  <div className={`flex flex-col items-center cursor-default transition-opacity ${i === 2 ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}>
                    <span className="text-[8px] font-mono">{String(phase.phase).padStart(2, '0')}</span>
                    <span className={`text-[7px] uppercase tracking-widest mt-1 ${i === 2 ? 'font-bold underline underline-offset-4' : ''}`}>
                      {phase.title}
                    </span>
                  </div>
                  {i < 3 && <div className="w-8 h-[1px] bg-black/10 mx-4 mt-3"></div>}
                </div>
             ))}
          </div>
       </div>

       {/* Right / Legal */}
       <div className="md:col-span-3 md:text-right text-[8px] uppercase tracking-widest opacity-40 leading-relaxed font-sans">
         Architektenkammer-Nr. 06750 <br/> 
         &copy; 2024 AKP Kauschke + Partner
       </div>

    </footer>
  );
}
