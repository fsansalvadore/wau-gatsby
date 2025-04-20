import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import SocialIcon from './SocialIcon';

const SocialIconsContainer = styled.div((isDark, hasGrid) => [
  css`
    ${tw`w-auto`}
    a {
      transition: opacity 0.25s ease;
    }

    a.social-icon:hover {
      opacity: 1 !important;
    }

    ${({ $hasGrid }) =>
      $hasGrid &&
      css`
        ${tw`md:(grid grid-cols-3 auto-cols-min max-w-[145px])`}
      `}
  `,
]);

const SocialIcons = ({ menu, isDark, spacing = 'false', hasGrid }) => {
  const socialIconsRef = useRef(null);

  useEffect(() => {
    const links = socialIconsRef.current.querySelectorAll('a');

    links.forEach((link) => {
      link.addEventListener('mouseover', () => {
        socialIconsRef.current
          .querySelectorAll('a')
          .forEach((l) => (l.style.opacity = '0.5'));
        link.style.opacity = '1';
      });
      link.addEventListener('mouseout', () => {
        socialIconsRef.current
          .querySelectorAll('a')
          .forEach((l) => (l.style.opacity = '1'));
      });
    });
  }, [socialIconsRef]);

  return (
    <SocialIconsContainer
      ref={socialIconsRef}
      $hasGrid={hasGrid}
      isDark={isDark}
    >
      {menu &&
        menu.menuItems.nodes.map((social, i) => (
          <SocialIcon
            isDark={isDark}
            social={social}
            spacing={spacing}
            key={`icons-${social.id}`}
          />
        ))}
    </SocialIconsContainer>
  );
};

// eslint-disable-next-line import/no-default-export
export default SocialIcons;
