import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ContactsPageLayout from '../components/elements/Contacts/ContactsPageLayout';

// import loadable from '@loadable/component'

// const VideoSection = loadable(() => import('../components/organisms/video-section/video-section.component'))

const ContattiPage = () => {
  const data = useStaticQuery(graphql`
    query ContactsItaQuery {
      pages: allWpPage(
        filter: {
          status: { eq: "publish" }
          language: { slug: { eq: "en" } }
          title: { eq: "Contacts" }
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
          contactsACF {
            emails {
              email1 {
                email
                etichetta
              }
              email2 {
                email
                etichetta
              }
              email3 {
                email
                etichetta
              }
              email4 {
                email
                etichetta
              }
            }
            map {
              box
              mappa {
                altText
                sourceUrl
                # imageFile {
                #   childImageSharp {
                #     fixed(width: 1500, quality: 90) {
                #       ...GatsbyImageSharpFixed
                #     }
                #   }
                # }
              }
            }
            form {
              titolo
              sottotitolo
            }
          }
        }
      }
      menu: wpMenu(id: { eq: "dGVybTo0OQ==" }) {
        name
        menuItems {
          nodes {
            label
            path
          }
        }
      }
    }
  `);

  return (
    <ContactsPageLayout
      data={data.pages.nodes[0]}
      socials={data.menu}
      lang="it"
    />
  );
};

// eslint-disable-next-line import/no-default-export
export default ContattiPage;
