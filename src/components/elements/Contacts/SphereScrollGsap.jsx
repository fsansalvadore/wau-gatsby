import React, { useEffect } from 'react';

export default function SphereScrollGsap({ ctaSectionRef, sphereRef }) {
  useEffect(() => {
    if (!ctaSectionRef?.current || !sphereRef?.current) return;
    let ctx;
    Promise.all([
      import('gsap').then((mod) => mod.gsap || mod.default || mod),
      import('gsap/ScrollTrigger').then((mod) => mod.ScrollTrigger).catch(() => null),
    ]).then(([gsap, ScrollTrigger]) => {
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);
      const Power1 = gsap.Power1 ?? {};
      ctx = gsap.context(() => {
        const sphereTL = gsap.timeline({
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: 'top 85%',
            end: 'top 15%',
          },
        });
        ScrollTrigger.defaults({
          immediateRender: false,
          ease: Power1.inOut ?? 'power1.inOut',
        });
        sphereTL.from(
          sphereRef.current.position,
          { duration: 2, y: 10 },
          ctaSectionRef.current
        );
      }, ctaSectionRef);
    });
    return () => {
      ctx?.revert?.();
    };
  }, [ctaSectionRef, sphereRef]);

  return null;
}
