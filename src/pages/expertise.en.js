import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ExpertisesPageLayout from '../components/elements/Expertise/ExpertisePageLayout';

const ExpertisesPageIta = () => {
  const data = useStaticQuery(graphql`
    query ExpertisesEngQuery {
      pages: allWpPage(
        filter: {
          status: { eq: "publish" }
          language: { slug: { eq: "en" } }
          title: { eq: "Expertise" }
        }
      ) {
        nodes {
          slug
          title
          pagesACF {
            title
            introduzione
          }
        }
      }
      expertises: allWpExpertise(
        limit: 100
        filter: { status: { eq: "publish" }, language: { slug: { eq: "en" } } }
      ) {
        nodes {
          date
          status
          slug
          id
          title
          featuredImage {
            node {
              altText
              link
              sourceUrl
            }
          }
          expertiseACF {
            anteprima
          }
          language {
            code
            locale
            slug
          }
        }
      }
    }
  `);

  return <ExpertisesPageLayout data={data} lang="en" />;
};

// eslint-disable-next-line import/no-default-export
export default ExpertisesPageIta;
