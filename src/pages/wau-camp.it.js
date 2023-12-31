import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import WauCampPageLayout from '../components/elements/WauCamp/WauCampPageLayout';

const WauCampIta = () => {
  const data = useStaticQuery(graphql`
    query WauCampItaQuery {
      pages: allWpPage(
        filter: {
          status: { eq: "publish" }
          language: { slug: { eq: "it" } }
          title: { eq: "WAU CAMP" }
        }
      ) {
        nodes {
          slug
          title
          pagesACF {
            title
            introduzione
          }
          waucampACF {
            caroselloIntro {
              slide1 {
                immagine {
                  sourceUrl
                }
                testo
              }
              slide2 {
                immagine {
                  sourceUrl
                }
                testo
              }
              slide3 {
                immagine {
                  sourceUrl
                }
                testo
              }
              slide4 {
                immagine {
                  sourceUrl
                }
                testo
              }
            }
            sezione1 {
              paragrafo
              titolo
              immagine {
                sourceUrl
              }
            }
            sezione3 {
              paragrafo
              titolo
              immagine {
                sourceUrl
              }
            }
            sezione4 {
              titolo
              paragrafo
              immagine {
                sourceUrl
              }
            }
            sezione5 {
              paragrafo
              titolo
              immagine {
                sourceUrl
              }
            }
            sezione6 {
              paragrafo
              titolo
              immagine {
                sourceUrl
              }
            }
            sezione7Form {
              titolo
              paragrafo
            }
          }
        }
      }
    }
  `);

  return <WauCampPageLayout data={data} lang="it" />;
};

// eslint-disable-next-line import/no-default-export
export default WauCampIta;
