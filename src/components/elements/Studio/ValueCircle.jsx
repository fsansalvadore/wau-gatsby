import React from 'react';
import tw, { css } from 'twin.macro';
import styled from 'styled-components';

// eslint-disable-next-line import/no-default-export
const ValueCircle = ({ value, index, counter }) => {
  return (
    <StyledValueCircle
      tw="flex"
      data-counter={index}
      active={counter === index}
    >
      <p>{value.title}</p>
    </StyledValueCircle>
  );
};

const StyledValueCircle = styled.div(() => [
  css`
    ${tw`w-[30vw] h-[30vw] sm:max-w-[200px] sm:max-h-[200px] md:max-w-[270px] md:max-h-[270px] flex items-center justify-center rounded-full border-2 border-solid border-gray-800 opacity-50 hover:opacity-100 transition-all cursor-pointer`}
    p {
      ${tw`text-10 sm:text-base`}
    }

    ${({ active }) =>
      active &&
      css`
        transition: transform 0.3s ease;
        border-color: var(--green) !important;
        opacity: 1 !important;
        color: var(--purple) !important;
      `}

    &:hover {
      transition: transform 0.3s ease;
      border-color: var(--green) !important;
      opacity: 1 !important;
      color: var(--purple) !important;
    }
  `,
]);

export default ValueCircle;
