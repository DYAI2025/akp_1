import { useState, useEffect } from 'react';

const SECTIONS = [
  { label: "Büro", href: "#buero" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Projekte", href: "#projekte" },
  { label: "Kompetenzen", href: "#kompetenzen" },
  { label: "Geschichte", href: "#geschichte" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'bg-paper/90 backdrop-blur-md border-b border-black/10' : ''}`}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 xl:px-16 flex items-baseline justify-between h-24 pt-8 mb-8 border-b border-black/10 pb-4">
        <div className="flex gap-8 items-baseline">
          <a href="#" className="font-serif text-2xl font-semibold tracking-tight" data-cursor="Start">
            AKP
          </a>
          
          <div className="hidden md:flex items-center gap-6">
            {SECTIONS.map((sec) => (
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
        </div>

        <div className="hidden md:flex text-[10px] uppercase tracking-widest pl-4">
          <span className="font-bold">DE</span> <span className="opacity-30 mx-2">/</span> <span className="opacity-30">EN</span>
        </div>
      </div>
    </nav>
  );
}
