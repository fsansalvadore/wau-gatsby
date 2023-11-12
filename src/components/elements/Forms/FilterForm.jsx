import React from 'react';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import './antd-custom.css';

// eslint-disable-next-line import/no-default-export
const FilterForm = ({ children, otherProps }) => {
  return <StyledFilterForm {...otherProps}>{children}</StyledFilterForm>;
};

const StyledFilterForm = styled.form(() => [
  css`
    ${tw`relative z-50`}

    .ant-select {
      .ant-select-selector {
        ${tw`border-black`}
        color: black !important;
      }
    }
  `,
]);

export default FilterForm;
