import {useEffect, useState} from 'react';

const SECTIONS = [
  {label: 'Büro', href: '#buero'},
  {label: 'Leistungen', href: '#leistungen'},
  {label: 'Projekte', href: '#projekte'},
  {label: 'Kompetenzen', href: '#kompetenzen'},
  {label: 'Geschichte', href: '#geschichte'},
  {label: 'Kontakt', href: '#kontakt'},
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Hauptnavigation"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-paper/90 backdrop-blur-md border-b border-black/10' : ''
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 xl:px-16 flex flex-col gap-4 py-5 md:h-24 md:flex-row md:items-baseline md:justify-between md:pt-8 md:pb-4 border-b border-black/10">
        <div className="flex gap-8 items-baseline justify-between md:justify-start">
          <a href="#top" className="font-serif text-2xl font-semibold tracking-tight" data-cursor="Start">
            AKP
          </a>

          <div className="hidden md:flex items-center gap-6">
            {SECTIONS.map(sec => (
              <a
                key={sec.label}
                href={sec.href}
                className="font-sans text-[10px] uppercase tracking-[0.15em] font-medium opacity-60 hover:opacity-100 transition-opacity"
                data-cursor={`Gehe zu ${sec.label}`}
              >
                {sec.label}
              </a>
            ))}
          </div>

          <div className="md:hidden text-[10px] uppercase tracking-widest pl-4">
            <span className="font-bold">DE</span> <span className="opacity-30 mx-2">/</span> <span className="opacity-30">EN</span>
          </div>
        </div>

        <div className="md:hidden -mx-6 px-6 overflow-x-auto pb-1" aria-label="Mobile Abschnittsnavigation">
          <div className="flex min-w-max items-center gap-4">
            {SECTIONS.map(sec => (
              <a
                key={sec.label}
                href={sec.href}
                className="font-sans text-[10px] uppercase tracking-[0.15em] font-medium opacity-70 hover:opacity-100 transition-opacity"
                data-cursor={`Gehe zu ${sec.label}`}
              >
                {sec.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex text-[10px] uppercase tracking-widest pl-4">
          <span className="font-bold">DE</span> <span className="opacity-30 mx-2">/</span> <span className="opacity-30">EN</span>
        </div>
      </div>
    </nav>
  );
}
