import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutDrama from './components/AboutDrama';
import DossierSection from './components/DossierSection';
import EpisodesGuide from './components/EpisodesGuide';
import CasesArchive from './components/CasesArchive';
import InspectorQuiz from './components/InspectorQuiz';
import QuotesSection from './components/QuotesSection';
import GallerySection from './components/GallerySection';
import CommunitySection from './components/CommunitySection';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'dossiers', 'episodes', 'cases', 'quiz', 'gallery', 'community'];
      const scrollPos = window.scrollY + 200;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero scrollToSection={scrollToSection} />
        <AboutDrama />
        <DossierSection />
        <EpisodesGuide />
        <CasesArchive />
        <InspectorQuiz />
        <QuotesSection />
        <GallerySection />
        <CommunitySection />
      </main>

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
