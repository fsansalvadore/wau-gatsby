// import styled from 'styled-components';
import tw, { styled } from 'twin.macro';

export const StyledIntroContainer = styled.div`
  width: 100%;
  position: relative !important;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  #continue-cta {
    ${tw`font-light`}
    bottom: 6%;
    color: var(--black);
    z-index: 4;
    animation: bounce 0.8s ease-in-out infinite alternate both;

    &.white {
      color: var(--white) !important;

      svg path {
        fill: var(--white) !important;
      }
    }
  }

  .canvas {
    top: 0;
  }

  .hidden {
    display: none;
  }

  .main-cta {
    color: var(--white);
    text-decoration: none;
    padding: 10px 30px;
    /* border: 1px solid black; */
    position: absolute;
    top: auto;
    bottom: 8%;
    transition: bottom 0.3s ease;
    will-change: bottom;

    z-index: 50;
    transition: opacity 0.3s ease !important;
    // animation: fadeIn 0.3s ease 2s both;
    animation: zIndexIn 0.3s ease 2s both;

    &.off {
      opacity: 0 !important;
      pointer-events: none;
    }

    /* &:hover {
      opacity: 1;
      border: 1px solid #111;
    } */
  }

  .vision-section {
    z-index: -1;
  }

  .intro-text {
    min-height: 700px;
    z-index: -10;

    img {
      height: 40px;
      top: 18%;
      ${tw`absolute right-0 left-0 mx-auto mb-32`}
    }

    h1.intro-title {
      ${tw`absolute right-0 font-light text-4xl md:text-5xl left-0 mx-auto text-center`}
      top: 25%;
      letter-spacing: -0.05rem;
      line-height: 100%;
    }

    @media (min-width: 1024px) {
      img {
        right: calc(50% + 150px);
        ${tw`top-auto left-auto m-0`}
      }

      h1.intro-title {
        ${tw`text-left top-auto`}
        left: calc(50% + 140px);
        line-height: 100%;
      }
    }
  }

  .video-container {
    position: absolute;
    // left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    min-width: 100%;
    min-height: 100%;
    // top: 0;
    bottom: 0;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;

    video.video {
      object-fit: cover;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
    }

    p {
      ${tw`absolute left-0 right-0 bottom-32 z-20 mx-auto text-white text-center uppercase`}
    }
  }

  .intro-text-container {
    z-index: -2;

    p {
      ${tw`text-2xl font-light leading-[110%]! max-w-[200px] md:(text-3xl max-w-[300px] leading-[100%]!)`}
      text-align: center;
      color: white;
      text-transform: uppercase;
    }
  }

  @media screen and (min-width: 600px) {
    .video-container {
      .video {
        width: 100vw;
        height: 105vh;
      }
    }
  }
`;
