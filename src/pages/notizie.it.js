import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import 'twin.macro';
import ArticlesPageLayout from '../components/elements/Articles/ArticlesPageLayout';

const NewsPageIta = () => {
  const data = useStaticQuery(graphql`
    query ArticlesItaQuery {
      pages: allWpPage(
        filter: {
          status: { eq: "publish" }
          language: { slug: { eq: "it" } }
          title: { eq: "Notizie" }
        }
      ) {
        nodes {
          slug
          title
          pagesACF {
            titoletto
            title
            introduzione
          }
        }
      }
      articles: allWpArticle(
        filter: { status: { eq: "publish" }, language: { slug: { eq: "it" } } }
      ) {
        nodes {
          date
          content
          slug
          id
          title
          language {
            code
            locale
            slug
          }
          featuredImage {
            node {
              sourceUrl
              gatsbyImage(width: 900)
            }
          }
          categories {
            nodes {
              name
              id
            }
          }
          ArticleACF {
            anteprima
            introduzione
          }
        }
      }
    }
  `);

  return <ArticlesPageLayout data={data} lang="it" />;
};

// eslint-disable-next-line import/no-default-export
export default NewsPageIta;
