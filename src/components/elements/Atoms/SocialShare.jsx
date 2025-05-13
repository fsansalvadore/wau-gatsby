import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import {
  FacebookShareButton,
  EmailShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';

const StyledSocialShare = styled.div`
  ${tw`flex items-center`}

  .share-icons > * {
    margin: 2px 4px 2px 2px !important;

    ${tw`opacity-70 hover:opacity-100`}
  }

  .share-icons {
    ${tw`relative flex items-center`}

    button {
      ${tw`flex items-center`}
    }
    svg path {
      fill: var(--black) !important;
    }
  }
`;

const SocialShare = ({ lang, title }) => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setLocation(window.location.href);
    }
  }, [setLocation]);

  return (
    <StyledSocialShare className="social-share flex flex-col items-center gap-2">
      <p tw="inline-flex">{lang === 'it' ? 'Condividi su' : 'Share on'}</p>
      <div className="share-icons ml-8 flex gap-4">
        <EmailShareButton url={location} title={title}>
          {/* <EmailIcon size={32} round={true} bgStyle={iconStyle} /> */}
          E-Mail
        </EmailShareButton>
        /
        <FacebookShareButton url={location} title={title}>
          {/* <FacebookIcon size={32} round={true} bgStyle={iconStyle} /> */}
          Facebook
        </FacebookShareButton>
        /
        <LinkedinShareButton url={location} title={title}>
          {/* <LinkedinIcon size={32} round={true} bgStyle={iconStyle} /> */}
          LinkedIn
        </LinkedinShareButton>
        /
        <TwitterShareButton url={location} title={title}>
          {/* <TwitterIcon size={32} round={true} bgStyle={iconStyle} /> */}X
        </TwitterShareButton>
      </div>
    </StyledSocialShare>
  );
};

export default SocialShare;
