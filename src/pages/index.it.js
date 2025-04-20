import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import HomePageLayout from '../components/elements/HomePage/HomePageLayout';

const IndexIta = () => {
  const data = useStaticQuery(graphql`
    query HomePageItaQuery {
      page: wpPage(id: { eq: "cG9zdDo4NDk=" }) {
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
      projects: allWpProject(
        limit: 100
        filter: { status: { eq: "publish" }, language: { slug: { eq: "it" } } }
      ) {
        nodes {
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
      expertises: allWpExpertise(
        limit: 40
        filter: { status: { eq: "publish" }, language: { slug: { eq: "it" } } }
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
      articles: allWpArticle(
        limit: 3
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
          categories {
            nodes {
              name
              id
            }
          }
          ArticleACF {
            anteprima
          }
        }
      }
    }
  `);

  const [lang, setLang] = useState('it');

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

// eslint-disable-next-line import/no-default-export
export default IndexIta;
