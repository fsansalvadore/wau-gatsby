import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import StudioPageLayout from '../components/elements/Studio/StudioPageLayout';

const StudioPageIta = () => {
  const data = useStaticQuery(graphql`
    query StudioItaQuery {
      pages: allWpPage(
        filter: {
          status: { eq: "publish" }
          language: { slug: { eq: "it" } }
          title: { eq: "Studio" }
        }
      ) {
        nodes {
          slug
          title
          pagesACF {
            title
            introduzione
          }
          studioACF {
            valuesSection {
              values {
                value1 {
                  title
                  description
                }
                value2 {
                  title
                  description
                }
                value3 {
                  title
                  description
                }
              }
              title
            }
            video
            videonative {
              sourceUrl
              uri
              altText
              mediaItemUrl
            }
            image1 {
              sourceUrl
            }
            image2 {
              sourceUrl
            }
            sectionEnd {
              title
              content
            }
            sectionApproach {
              title
              content
            }
          }
        }
      }
    }
  `);

  return <StudioPageLayout data={data} />;
};

// eslint-disable-next-line import/no-default-export
export default StudioPageIta;
