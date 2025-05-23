import React, { useEffect } from 'react';
import anime from 'animejs';
import CarAnimation from './CarAnimation';

export default function App() {
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      anime.set(section, { opacity: 0 });
    });
    const handleScroll = () => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          anime({ targets: section, opacity: 1, duration: 500, easing: 'easeOutQuad' });
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section>
        <h1>ProTint AnimeJS Experience</h1>
        <p>Scroll down to animate the car.</p>
      </section>
      <CarAnimation />
      <section>
        <h2>More Content</h2>
        <p>As you keep scrolling, sections fade in smoothly.</p>
      </section>
    </>
  );
}
