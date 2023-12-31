import React, { useState } from 'react';
import tw, { css } from 'twin.macro';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
// import parse from "html-react-parser";
import Button from '../Atoms/Button';
import {
  transition,
  teamMemberFilterVariants,
  teamMemberContentVariants,
  teamMemberDescriptionVariants,
} from '../../../helpers/framer-defaults';

const ButtonWrapper = tw.div`mt-10 z-10`;

const StyledTeamMemberCard = styled(motion.div)(() => [
  css`
    .team-card-container {
      padding-bottom: 150%;
    }

    * {
      color: var(--white);
    }

    .description {
      height: 65%;

      p {
        ${tw`mb-4`}
      }
    }

    .gatsby-image-wrapper {
      position: absolute !important;
      width: 100% !important;
      height: 100% !important;
      left: 0 !important;
      right: 0 !important;
      top: 0 !important;
      bottom: 0 !important;
      // filter: blur(10px);
    }

    .preview-card-info-container {
      height: auto;
      // background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
    }

    .team-card-filter {
      background: var(--green);
    }
  `,
]);

const TeamMemberCard = ({
  title,
  date,
  featuredImage,
  afc,
  member,
  setActiveMember,
  lang,
  setModalIsOpen,
  ...otherProps
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const setModal = () => {
    if (!!member) {
      setModalIsOpen(true);
      setActiveMember(member);
    }
  };

  const featuredImg = getImage(featuredImage.node.gatsbyImage);

  return (
    <LazyLoad height={500}>
      <StyledTeamMemberCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, duration: 0.8 }}
        tw="relative flex items-end w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setModal(member)}
        {...otherProps}
      >
        <div tw="w-full relative" className="team-card-container">
          <motion.div
            variants={teamMemberContentVariants}
            animate={isHovered ? 'hovered' : 'hidden'}
            initial={'hidden'}
            className="preview-card-info-container"
            tw="absolute w-full h-full bottom-0 py-4 px-4 md:py-8 md:px-8 z-20"
          >
            <div tw="overflow-hidden pt-1 mb-px">
              <motion.h2 tw="pb-2">
                {title ? title : 'Missing member name'}
              </motion.h2>
            </div>
            {afc && afc.ruolo && (
              <div tw="">
                <motion.p>{afc.ruolo}</motion.p>
              </div>
            )}
            <ButtonWrapper>
              <Button>{lang === 'it' ? 'Leggi di più' : 'Read more'}</Button>
            </ButtonWrapper>
            {afc && afc.email && (
              <motion.div
                tw="absolute bottom-4 mb-4 hidden md:block text-sm"
                variants={teamMemberDescriptionVariants}
                animate={isHovered ? 'hovered' : 'hidden'}
                initial="hidden"
              >
                <a href={`mailto:${afc.email}`}>{afc.email}</a>
              </motion.div>
            )}
          </motion.div>
          <motion.div
            variants={teamMemberFilterVariants}
            animate={isHovered ? 'hovered' : 'hidden'}
            initial={'hidden'}
            transition={{ ...transition, duration: 1 }}
            tw="absolute w-full h-full left-0 top-0 right-0 bottom-0 z-10"
            className="team-card-filter"
          />
          <div tw="absolute w-full h-full top-0 right-0 bottom-0 left-0 z-0">
            {featuredImage ? (
              <GatsbyImage
                image={featuredImg}
                tw="absolute w-full h-full top-0 right-0 bottom-0 left-0"
                alt={
                  featuredImage.node.altText
                    ? featuredImage.node.altText
                    : 'WAU team member'
                }
              />
            ) : (
              // <Img
              //   src={featuredImage.node.sourceUrl}
              //   tw="absolute w-full h-full top-0 right-0 bottom-0 left-0"
              //   alt={
              //     featuredImage.node.altText
              //       ? featuredImage.node.altText
              //       : 'WAU team member'
              //   }
              // />
              <img
                tw="absolute w-full h-full top-0 right-0 bottom-0 left-0"
                src=""
                alt="WAU team member"
              />
            )}
          </div>
        </div>
      </StyledTeamMemberCard>
    </LazyLoad>
  );
};

// eslint-disable-next-line import/no-default-export
export default TeamMemberCard;
