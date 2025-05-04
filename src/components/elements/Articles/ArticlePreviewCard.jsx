import React, { useEffect, useState } from 'react';
import { css } from 'twin.macro';
import { Link } from 'gatsby';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import WAUFallback from '../../../assets/WAUFallback.svg';
import { months } from '../../../helpers/utils';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const MotionLink = motion(Link);

const ArticlePreviewCard = ({ article, isLast, ...otherProps }) => {
  const [articleDate, setArticleDate] = useState(null);

  useEffect(() => {
    const date = new Date(article.date);

    if (date) {
      if (article.language.code === 'EN') {
        setArticleDate(
          `${
            months.eng[date.getMonth()]
          } ${date.getDay()}, ${date.getFullYear()}`
        );
      } else {
        setArticleDate(
          `${date.getDay()} ${
            months.ita[date.getMonth()]
          } ${date.getFullYear()}`
        );
      }
    }
  }, [setArticleDate, article]);

  return (
    <div
      className={[
        'opacity-70 hover:opacity-100 transition-opacity duration-150 ease-in-out border-0 border-solid border-gray-500 py-4 md:py-8',
        isLast ? '' : 'border-b',
      ].join(' ')}
    >
      <LazyLoad>
        <StyledArticlePreviewCard
          to={
            article.language.code === 'EN'
              ? `/en/news/${article.slug}`
              : `/notizie/${article.slug}`
          }
          tw="w-full grid grid-cols-9 gap-y-[20px]"
          {...otherProps}
        >
          <div
            className="article-preview-image"
            tw="relative flex items-center justify-center col-span-9 md:col-span-3 h-[50vw] md:h-[12vw] min-h-[200px] w-full overflow-hidden"
          >
            {article.featuredImage && article.featuredImage.node.imageFile ? (
              <GatsbyImage
                alt={article.imgAlt ? article.imgAlt : 'Image'}
                image={getImage(article.featuredImage.node.gatsbyImage)}
              />
            ) : (
              <img
                tw=""
                src={
                  article.featuredImage
                    ? article.featuredImage.node.sourceUrl
                    : WAUFallback
                }
                alt={article.imgAlt ? article.imgAlt : 'Image'}
              />
            )}
          </div>
          <div tw="col-span-9 md:col-start-4 md:col-span-6 pl-0 md:pl-8">
            <h3 tw="text-2xl md:text-3xl">{article.title}</h3>
            <p tw="mt-2 text-sm">
              <span>{articleDate && articleDate}</span>
              {article.categories.nodes.length > 0 && (
                <ul tw="block md:inline ml-0 md:ml-4">
                  {article.categories.nodes.map((category) => (
                    <li
                      key={`art-cat-${Math.floor(
                        Math.random() * (100 - 999) + 100
                      )}`}
                      tw="inline mr-2"
                    >
                      / {category.name}
                    </li>
                  ))}
                </ul>
              )}
            </p>
            <div tw="w-full mt-4">
              {article.ArticleACF && article.ArticleACF.anteprima && (
                <p>{article.ArticleACF.anteprima}</p>
              )}
            </div>
            <p tw="mt-4">
              {article.language.code === 'EN'
                ? 'Read the article'
                : "Leggi l'articolo"}
            </p>
          </div>
        </StyledArticlePreviewCard>
      </LazyLoad>
    </div>
  );
};

const StyledArticlePreviewCard = styled(MotionLink)(() => [
  css`
    color: var(--black);

    .article-preview-image {
      // padding-bottom: 65%;

      .gatsby-image-wrapper {
        position: absolute !important;
        width: 100% !important;
        height: 100% !important;
      }
    }
  `,
]);

export default ArticlePreviewCard;
