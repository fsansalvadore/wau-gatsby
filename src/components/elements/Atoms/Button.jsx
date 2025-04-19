import React from 'react';
import tw, { css } from 'twin.macro';
import styled from 'styled-components';
import { Link } from 'gatsby';

const StyledButton = styled(Link)(() => [
  css`
    ${tw`font-mono px-4 py-2 border border-solid text-black text-sm font-light hover:bg-black cursor-pointer`}
    color: var(--black);
    background: transparent;
    border-color: var(--black);

    &:hover {
      border-color: var(--black);
      background: var(--black) !important;
    }
  `,
]);

// eslint-disable-next-line import/no-default-export
const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
