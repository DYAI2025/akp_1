import { content } from '@/data/content';

export default function Contact() {
  return (
    <section id="kontakt" className="py-24 max-w-[1600px] mx-auto hairline-b relative">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--color-ink) 0, var(--color-ink) 1px, transparent 1px, transparent 10px)' }} />

      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Contact Info */}
        <div className="lg:col-span-5 px-4 md:px-8 xl:px-12 py-12 flex flex-col justify-between">
           <div>
             <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8">Kontakt</h2>
             <div className="space-y-6 max-w-sm">
                <div>
                   <h4 className="font-sans text-[10px] uppercase tracking-widest text-ink/50 mb-2">Büro</h4>
                   {content.contact.address.map(line => (
                     <p key={line} className="font-serif text-lg leading-snug">{line}</p>
                   ))}
                </div>
                <div>
                   <h4 className="font-sans text-[10px] uppercase tracking-widest text-ink/50 mb-2">Verbindung</h4>
                   <p className="font-serif text-lg leading-snug">T {content.contact.phone}</p>
                   <p className="font-serif text-lg leading-snug">F {content.contact.fax}</p>
                   <p className="font-serif text-lg leading-snug mt-2"><a href={`mailto:${content.contact.email}`} className="hover:text-olive transition-colors">{content.contact.email}</a></p>
                </div>
             </div>
           </div>

           <div className="mt-16">
              <h4 className="font-sans text-[10px] uppercase tracking-widest text-ink/50 mb-4">Direktanfragen</h4>
              <div className="flex flex-col gap-2 items-start">
                 {['Projekt besprechen', 'Grundstück prüfen lassen', 'Sanierung anfragen', 'Generalplanung anfragen', 'Kooperation'].map(cta => (
                   <button key={cta} className="font-serif text-xl md:text-2xl hover:translate-x-2 transition-transform text-ink/80 hover:text-ink">
                     {cta} <span className="opacity-0 group-hover:opacity-100 font-sans text-sm inline-block translate-y-[-2px] ml-1">&rarr;</span>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white/40 hairline-l p-4 md:p-8 xl:p-12">
           <form className="max-w-2xl mx-auto space-y-8" action="#" method="POST" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex flex-col">
                   <label className="font-sans text-[10px] uppercase tracking-widest text-ink/60 mb-2">Name</label>
                   <input type="text" className="bg-transparent hairline-b border-t-0 border-l-0 border-r-0 py-2 focus:outline-none focus:border-ink transition-colors font-serif text-lg placeholder:text-ink/20" placeholder="Ihr Name" />
                 </div>
                 <div className="flex flex-col">
                   <label className="font-sans text-[10px] uppercase tracking-widest text-ink/60 mb-2">E-Mail</label>
                   <input type="email" className="bg-transparent hairline-b border-t-0 border-l-0 border-r-0 py-2 focus:outline-none focus:border-ink transition-colors font-serif text-lg placeholder:text-ink/20" placeholder="mail@example.com" />
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex flex-col">
                   <label className="font-sans text-[10px] uppercase tracking-widest text-ink/60 mb-2">Projekttyp / Ort</label>
                   <input type="text" className="bg-transparent hairline-b border-t-0 border-l-0 border-r-0 py-2 focus:outline-none focus:border-ink transition-colors font-serif text-lg placeholder:text-ink/20" placeholder="Wohnungsbau Berlin" />
                 </div>
                 <div className="flex flex-col">
                   <label className="font-sans text-[10px] uppercase tracking-widest text-ink/60 mb-2">Leistungsphase / Anliegen</label>
                   <input type="text" className="bg-transparent hairline-b border-t-0 border-l-0 border-r-0 py-2 focus:outline-none focus:border-ink transition-colors font-serif text-lg placeholder:text-ink/20" placeholder="Generalplanung" />
                 </div>
              </div>

              <div className="flex flex-col">
                 <label className="font-sans text-[10px] uppercase tracking-widest text-ink/60 mb-2">Nachricht</label>
                 <textarea rows={4} className="bg-transparent hairline-b border-t-0 border-l-0 border-r-0 py-2 focus:outline-none focus:border-ink transition-colors font-serif text-lg placeholder:text-ink/20 resize-none" placeholder="Kurze Beschreibung des Vorhabens..."></textarea>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
                 <div className="flex flex-col gap-3">
                    <button type="button" className="font-sans text-[10px] uppercase tracking-widest text-ink/50 flexItems-center gap-2 hover:text-ink transition-colors text-left">
                       <span className="w-4 h-4 hairline inline-flex items-center justify-center">+</span> Datei / Plan hochladen
                    </button>
                    <label className="flex items-center gap-2 cursor-pointer group">
                       <div className="w-4 h-4 hairline flex items-center justify-center group-hover:bg-ink/5 transition-colors"></div>
                       <span className="font-sans text-[9px] uppercase tracking-widest text-ink/50">Datenschutzbestimmungen akzeptieren</span>
                       {/* TODO: Datenschutztext rechtlich prüfen und ergänzen. */}
                    </label>
                 </div>
                 <button type="submit" className="font-sans text-[11px] uppercase tracking-widest px-8 py-4 bg-ink text-paper hover:bg-ink/90 transition-colors" data-cursor="Anfragen">
                    Nachricht Senden
                 </button>
              </div>
           </form>
        </div>

      </div>
    </section>
  );
}
