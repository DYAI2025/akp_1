import { content } from '@/data/content';

const directRequests = [
  'Projekt besprechen',
  'Grundstück prüfen lassen',
  'Sanierung anfragen',
  'Generalplanung anfragen',
  'Kooperation',
];

const inputClass = 'bg-transparent hairline-b border-t-0 border-l-0 border-r-0 py-2 focus:outline-none focus:border-ink transition-colors font-serif text-lg placeholder:text-ink/20';
const labelClass = 'font-sans text-[10px] uppercase tracking-widest text-ink/60 mb-2';

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
                <p className="font-serif text-lg leading-snug">T <a href={`tel:${content.contact.phone.replace(/[^+\d]/g, '')}`} className="hover:text-olive transition-colors">{content.contact.phone}</a></p>
                <p className="font-serif text-lg leading-snug">F {content.contact.fax}</p>
                <p className="font-serif text-lg leading-snug mt-2"><a href={`mailto:${content.contact.email}`} className="hover:text-olive transition-colors">{content.contact.email}</a></p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h4 className="font-sans text-[10px] uppercase tracking-widest text-ink/50 mb-4">Direktanfragen</h4>
            <div className="flex flex-col gap-2 items-start">
              {directRequests.map(cta => (
                <a
                  key={cta}
                  className="group font-serif text-xl md:text-2xl hover:translate-x-2 transition-transform text-ink/80 hover:text-ink"
                  href={`mailto:${content.contact.email}?subject=${encodeURIComponent(cta)}`}
                >
                  {cta} <span className="opacity-0 group-hover:opacity-100 font-sans text-sm inline-block translate-y-[-2px] ml-1">&rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white/40 hairline-l p-4 md:p-8 xl:p-12">
          <form className="max-w-2xl mx-auto space-y-8" action={`mailto:${content.contact.email}`} method="POST" encType="text/plain">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label htmlFor="contact-name" className={labelClass}>Name</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" required className={inputClass} placeholder="Ihr Name" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contact-email" className={labelClass}>E-Mail</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="mail@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label htmlFor="contact-project" className={labelClass}>Projekttyp / Ort</label>
                <input id="contact-project" name="project" type="text" className={inputClass} placeholder="Wohnungsbau Berlin" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contact-request" className={labelClass}>Leistungsphase / Anliegen</label>
                <input id="contact-request" name="request" type="text" className={inputClass} placeholder="Generalplanung" />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="contact-message" className={labelClass}>Nachricht</label>
              <textarea id="contact-message" name="message" rows={4} required className={`${inputClass} resize-none`} placeholder="Kurze Beschreibung des Vorhabens..." />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
              <div className="flex flex-col gap-3">
                <p className="font-sans text-[10px] uppercase tracking-widest text-ink/50 flex items-center gap-2 text-left">
                  <span className="w-4 h-4 hairline inline-flex items-center justify-center">i</span> Anhänge bitte direkt in der E-Mail ergänzen
                </p>
                <label htmlFor="privacy-consent" className="flex items-center gap-2 cursor-pointer group">
                  <input id="privacy-consent" name="privacy" value="accepted" type="checkbox" required className="sr-only peer" />
                  <span className="w-4 h-4 hairline flex items-center justify-center group-hover:bg-ink/5 peer-checked:bg-ink transition-colors" aria-hidden="true"></span>
                  <span className="font-sans text-[9px] uppercase tracking-widest text-ink/50">Datenschutzbestimmungen akzeptieren</span>
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
