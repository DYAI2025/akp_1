/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Cursor from './components/Cursor';
import Navigation from './components/Navigation';
import Hero from './components/sections/Hero';
import Attitude from './components/sections/Attitude';
import Process from './components/sections/Process';
import Portfolio from './components/sections/Portfolio';
import Competencies from './components/sections/Competencies';
import History from './components/sections/History';
import Publications from './components/sections/Publications';
import Network from './components/sections/Network';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

export default function App() {
  return (
    <>
      <Cursor />
      
      {/* Shell constraints */}
      <div className="min-h-screen border-8 border-gray-100 max-w-[1600px] mx-auto relative bg-paper flex flex-col">
        {/* Design Accents */}
        <div className="fixed top-0 left-0 w-1 h-full bg-olive/10 z-50 pointer-events-none"></div>
        <div className="absolute top-12 right-12 pointer-events-none hidden md:block">
          <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-10 text-ink">
            <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="0.5" />
            <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <Navigation />
        
        <main>
          <Hero />
          <Attitude />
          <Process />
          <Portfolio />
          <Competencies />
          <History />
          <Publications />
          <Network />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
