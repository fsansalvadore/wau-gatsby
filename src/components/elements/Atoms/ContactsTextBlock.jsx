import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import Button from './Button';

// eslint-disable-next-line import/no-default-export
const ContactsTextBlock = ({ title, content, link, cta, ...otherProps }) => {
  const contactsTextBlockRef = useRef(null);

  useEffect(() => {
    if (!contactsTextBlockRef?.current) return;
    let ctx;
    Promise.all([
      import('gsap').then((mod) => mod.gsap || mod.default || mod),
      import('gsap/ScrollTrigger').then((mod) => mod.ScrollTrigger).catch(() => null),
    ]).then(([gsap, ScrollTrigger]) => {
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);
      const Power1 = gsap.Power1 ?? {};
      ctx = gsap.context(() => {
        const sectionTextTL = gsap.timeline({
          scrollTrigger: {
            trigger: contactsTextBlockRef.current,
            start: 'top 80%',
          },
        });
        ScrollTrigger.defaults({
          immediateRender: false,
          ease: Power1.inOut ?? 'power1.inOut',
        });
        sectionTextTL.fromTo(
          contactsTextBlockRef.current,
          { y: '170%', skewY: 4, opacity: 0 },
          {
            duration: 0.8,
            skewY: 0,
            opacity: 1,
            ease: Power1.easeOut ?? 'power1.easeOut',
            y: '0',
            stagger: 0.1,
          },
          contactsTextBlockRef.current
        );
      }, contactsTextBlockRef);
    });
    return () => {
      ctx?.revert?.();
    };
  }, []);

  return (
    <StyledSectionTextBlock {...otherProps} ref={contactsTextBlockRef}>
      <div className="left" tw="col-span-full xl:col-span-3">
        {title && (
          <div className="st-title">
            <motion.div tw="text-4xl mb-4 w-3/4">{parse(title)}</motion.div>
          </div>
        )}
      </div>
      <div className="right" tw="col-span-full xl:col-span-5 xl:col-start-4">
        {content && (
          <div className="st-content">
            <motion.div tw="text-xl mb-4">{parse(content)}</motion.div>
          </div>
        )}
        <div className="st-link" tw="py-8">
          <div>
            <Button to={link ? link : '#'}>
              {cta ? cta : 'Scopri di più'}
            </Button>
          </div>
        </div>
      </div>
    </StyledSectionTextBlock>
  );
};

const StyledSectionTextBlock = styled(motion.div)(() => [
  css`
    ${tw`grid grid-cols-8`}
    .right {
      ${tw`w-full flex flex-col `}
    }

    > div > div {
      ${tw`overflow-hidden relative`}
    }
  `,
]);

export default ContactsTextBlock;
