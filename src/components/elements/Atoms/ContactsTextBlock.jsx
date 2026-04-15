import React, { useRef } from 'react';
import loadable from '@loadable/component';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import Button from './Button';

const ContactsTextBlockGsap = loadable(
  () => import('./ContactsTextBlockGsap'),
  { ssr: false }
);

// eslint-disable-next-line import/no-default-export
const ContactsTextBlock = ({ title, content, link, cta, ...otherProps }) => {
  const contactsTextBlockRef = useRef(null);

  return (
    <StyledSectionTextBlock {...otherProps} ref={contactsTextBlockRef}>
      <ContactsTextBlockGsap containerRef={contactsTextBlockRef} />
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
