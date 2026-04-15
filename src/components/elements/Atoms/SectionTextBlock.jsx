import React, { useRef } from 'react';
import loadable from '@loadable/component';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import Button from './Button';

const SectionTextBlockGsap = loadable(() => import('./SectionTextBlockGsap'), {
  ssr: false,
});

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

  return (
    <StyledContactsTextBlock
      $fullWidthContent={fullWidthContent}
      $hasTextCenter={hasTextCenter}
      {...otherProps}
      ref={sectionRef}
    >
      <SectionTextBlockGsap containerRef={sectionRef} />
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
