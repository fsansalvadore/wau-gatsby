import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import Button from './Button';

// eslint-disable-next-line import/no-default-export
const SectionTextBlock = ({
  label,
  title,
  content,
  link,
  cta,
  fullWidthContent,
  hasTextCenter,
  ...otherProps
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    let ctx;
    Promise.all([
      import('gsap').then((mod) => mod.gsap || mod.default || mod),
      import('gsap/ScrollTrigger').then((mod) => mod.ScrollTrigger).catch(() => null),
    ]).then(([gsap, ScrollTrigger]) => {
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);
      const Power1 = gsap.Power1 ?? {};
      ctx = gsap.context(() => {
        const items = sectionRef.current.querySelectorAll('.st-anim > *');
        const sectionTextTL = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
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
          sectionRef.current
        );
      }, sectionRef);
    });
    return () => {
      ctx?.revert?.();
    };
  }, []);

  return (
    <StyledContactsTextBlock
      $fullWidthContent={fullWidthContent}
      $hasTextCenter={hasTextCenter}
      {...otherProps}
      ref={sectionRef}
    >
      {label && (
        <div className="st-label st-anim">
          <motion.h4 tw="text-sm mb-4">{label}</motion.h4>
        </div>
      )}
      {title && (
        <div className="st-title st-anim">
          <motion.div>{parse(title)}</motion.div>
        </div>
      )}
      {content && (
        <div className="st-content st-anim">
          <motion.span tw="block md:text-xl mb-4 w-3/4">
            {parse(content)}
          </motion.span>
        </div>
      )}
      {!!link?.length && (
        <div className="st-link st-anim" tw="py-8">
          <div>
            <Button to={link || '#'}>{cta ? cta : 'Scopri di più'}</Button>
          </div>
        </div>
      )}
    </StyledContactsTextBlock>
  );
};

const StyledContactsTextBlock = styled(motion.div)(
  ({ $fullWidthContent, $hasTextCenter }) => [
    css`
      ${tw`w-full flex flex-col`}

      > div {
        ${tw`overflow-hidden relative`}
      }

      .st-title {
        > * {
          ${tw`text-3xl mb-8 w-full lg:(text-4xl w-3/4)`}
        }
      }
    `,
    $fullWidthContent &&
      css`
        .st-title {
          ${tw`w-full`}

          > * {
            ${tw`w-full lg:w-3/4`}
          }
        }
        .st-content {
          ${tw`w-full`}

          > * {
            ${tw`w-full`}
          }
        }
      `,
    $hasTextCenter &&
      css`
        ${tw`text-center flex justify-center items-stretch`}

        > div, > div > div {
          ${tw`text-center flex justify-center`}
        }
      `,
  ]
);

export default SectionTextBlock;
