import React, { useEffect } from 'react';

// Client-only chunk (via loadable ssr:false) so Gatsby's page-ssr engine does not resolve gsap/ScrollTrigger.
export default function SectionTextBlockGsap({ containerRef }) {
  useEffect(() => {
    if (!containerRef?.current) return;
    let ctx;
    Promise.all([
      import('gsap').then((mod) => mod.gsap || mod.default || mod),
      import('gsap/ScrollTrigger').then((mod) => mod.ScrollTrigger).catch(() => null),
    ]).then(([gsap, ScrollTrigger]) => {
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);
      const Power1 = gsap.Power1 ?? {};
      ctx = gsap.context(() => {
        const items = containerRef.current.querySelectorAll('.st-anim > *');
        const sectionTextTL = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        });
        ScrollTrigger.defaults({
          immediateRender: false,
          ease: Power1?.inOut ?? 'power1.inOut',
        });
        sectionTextTL.fromTo(
          [items],
          { y: '170%', opacity: 0 },
          {
            duration: 0.8,
            skewY: 0,
            opacity: 1,
            ease: Power1?.easeOut ?? 'power1.easeOut',
            y: '0',
            stagger: 0.1,
          },
          containerRef.current
        );
      }, containerRef);
    });
    return () => {
      ctx?.revert?.();
    };
  }, [containerRef]);

  return null;
}
