import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function CarAnimation() {
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const section = sectionRef.current;
    if (!path || !section) return;

    const pathLength = path.getTotalLength();
    path.setAttribute('stroke-dasharray', pathLength.toString());
    path.setAttribute('stroke-dashoffset', pathLength.toString());

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = 1 - Math.min(Math.max(rect.top, 0), window.innerHeight) / window.innerHeight;
      anime.set(path, { strokeDashoffset: pathLength * (1 - progress) });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="400" height="200" viewBox="0 0 400 200" fill="none" stroke="#0ff" strokeWidth="2">
        <path
          ref={pathRef}
          d="M20 150 L80 80 L320 80 L380 150"
        />
      </svg>
    </section>
  );
}
