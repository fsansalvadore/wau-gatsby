import React from 'react';
import 'twin.macro';
import { Link } from 'gatsby';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import Img from 'gatsby-image';
import { transition } from '../../../../helpers/framer-defaults';

const StyledProjectPreviewCard = styled(motion.div)``;

const ProjectPreviewCard = ({
  data,
  link,
  imgSrc,
  imgAlt,
  title,
  projectdate,
  featuredImage,
  location,
  ...otherProps
}) => {
  return (
    <LazyLoad height={300}>
      <StyledProjectPreviewCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, duration: 0.8 }}
        tw="relative flex items-end w-full"
        {...otherProps}
      >
        <Link to={link} className="w-full flex flex-col gap-2">
          <figure className="relative w-full aspect-video m-0">
            {featuredImage && featuredImage.node.imageFile ? (
              <Img
                fixed={featuredImage.node.imageFile.childImageSharp.fixed}
                // fluid={featuredImage.node.imageFile.childImageSharp.fluid}
                className="absolute w-full h-full top-0 right-0 bottom-0 left-0 object-cover"
                alt={imgAlt ? imgAlt : 'Image'}
              />
            ) : (
              <img
                className="absolute w-full h-full top-0 right-0 bottom-0 left-0 object-cover"
                src={featuredImage && featuredImage.node.sourceUrl}
                alt={imgAlt ? imgAlt : 'Image'}
              />
            )}
          </figure>
          <div className="w-full">
            <div tw="overflow-hidden">
              <motion.h2
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ ...transition, delay: 0.1, duration: 1 }}
                className="font-bold text-sm leading-tight"
              >
                {title ? title : 'Missing title project'}
              </motion.h2>
            </div>
          </div>
        </Link>
      </StyledProjectPreviewCard>
    </LazyLoad>
  );
};

export default ProjectPreviewCard;
