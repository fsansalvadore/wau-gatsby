import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import HomePageLayout from '../components/elements/HomePage/HomePageLayout';

const IndexEng = () => {
  const data = useStaticQuery(graphql`
    query HomePageEngQuery {
      page: wpPage(id: { eq: "cG9zdDo5Mjc=" }) {
        id
        title
        language {
          code
          locale
          slug
        }
        homePageACF {
          introWords
          testoDentroSfera
          h1
          progetti {
            ... on WpProject {
              id
              status
              slug
              title
              featuredImage {
                node {
                  link
                  sourceUrl
                  gatsbyImage(width: 1200)
                }
              }
              ProjectAFC {
                projectdate
                location
              }
              language {
                code
                locale
                slug
              }
            }
          }
          sezioneContatti {
            paragrafo
            tasto {
              link
              testo
            }
            titolo
          }
          sezioneExpertise {
            titoletto
            titolo
            tasto {
              link
              testo
            }
          }
          sezioneStudio {
            paragrafo
            titoletto
            titolo
            tasto {
              link
              testo
            }
          }
          sezioneVision {
            paragrafo
            titoletto
            titolo
            tasto {
              link
              testo
            }
          }
          tastoIniziale {
            link
            testo
          }
        }
      }
      expertises: allWpExpertise(
        limit: 40
        filter: { status: { eq: "publish" }, language: { slug: { eq: "en" } } }
      ) {
        nodes {
          date
          status
          slug
          id
          title
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

  const [lang, setLang] = useState('en');

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const location = window.location.href;
      if (
        location.includes('00/en') ||
        location.includes('app/en') ||
        location.includes('com/en')
      ) {
        setLang('en');
      }
    }
  }, [lang]);

  return <HomePageLayout lang={lang} data={data} />;
};

export default IndexEng;
