import styled from 'styled-components';
import tw from 'twin.macro';

const Heading = styled.div`
  width: 100%;
  ${tw`py-8 pt-28 md:py-16 md:pt-40`}

  h1 {
    ${tw`text-3xl tracking-[-0.05rem] md:(text-5xl tracking-[-0.01rem])`}
  }

  .breadcrumbs,
  h1 {
    ${tw`mb-3 md:mb-8`}
  }

  .intro {
    ${tw`text-xl tracking-[-0.02rem] md:(tracking-[-0.01rem])`}

    > p {
      ${tw`mb-4`}
    }

    a {
      ${tw`underline`}
    }
  }
`;

// eslint-disable-next-line import/no-default-export
export default Heading;
