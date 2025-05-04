const path = require(`path`);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

// Query language fields
const language = `
language {
  code
  locale
  slug
}
`;

const seoFields = `
  seo {
    title
    focuskw
    metaDesc
    metaKeywords
    opengraphDescription
    opengraphImage {
      link
    }
    opengraphTitle
    twitterDescription
    twitterImage {
      link
    }
    twitterTitle
  }
`;

const query = `
  query GlobalQuery {
    allWpProject {
      nodes {
        content
        date
        id
        status
        slug
        title
        ${seoFields}
        featuredImage {
          node {
            sourceUrl
            altText
            link
          }
        }
        ProjectAFC {
          introduzione
          projectdate
          location
        }
        tags {
          nodes {
            name
            id
          }
        }
        ${language}
      }
    }
    allWpTeamMember {
      nodes {
        date
        status
        slug
        title
        teamMemberAFC {
          ruolo
          descrizione
          email
          founder
        }
        ${language}
      }
    }
    allWpExpertise {
      nodes {
        slug
        content
        title
        ${language}
        ${seoFields}
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        expertiseACF {
          introduzione
          progetti {
            ... on WpProject {
              id
              title
              date
              slug
              language {
                code
              }
              ProjectAFC {
                location
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
    allWpArticle {
      nodes {
        slug
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        ${seoFields}
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
        ${language}
      }
    }
    allWpCollaborator {
      nodes {
        slug
        id
        title
        collaboratorsACF {
          ruolo
        }
      }
    }
    allWpPage {
      nodes {
        slug
        title
        ${seoFields}
        pagesACF {
          titoletto
          title
          introduzione
        }
        homePageACF {
          introWords
          testoDentroSfera
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
              link
            }
          }
          form {
            titolo
            sottotitolo
          }
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
    allWpClient {
      nodes {
        title
        featuredImage {
          node {
            altText
            link
            sourceUrl
          }
        }
        clientACF {
          link
        }
      }
    }
  }
`;

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;

  await createResolvers({
    WpMediaItem: {
      imageFile: {
        type: 'File',
        async resolve(source) {
          let sourceUrl = source.sourceUrl;

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl;
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
        },
      },
    },
  });
};

exports.createPages = async ({ actions, graphql, gatsbyUtilities }) => {
  const { data } = await graphql(`
    ${query}
  `);

  const { createRedirect } = actions;

  createRedirect({
    fromPath: `/cookie-policy`,
    toPath: `/privacy-policy#cookies`,
  });
  createRedirect({
    fromPath: `/wau-camp`,
    toPath: `/`,
  });

  console.log('CREATING PROJECT PAGES =========');

  // create ita projects pages
  data.allWpProject.nodes
    .filter((p) => p.language.code === 'IT')
    .forEach((project) => {
      actions.createPage({
        path: `/progetti/${project.slug}`,
        component: path.resolve(`./src/components/templates/project.jsx`),
        context: {
          ...project,
          index: data.allWpProject.nodes.indexOf(project),
          id: project.id,
          title: project.title,
          slug: project.slug,
          lang: project.language,
          featuredImage: project.featuredImage,
          content: project.content,
          seo: project.seo,
        },
      });
    });

  // create eng projects pages
  data.allWpProject.nodes
    .filter((p) => p.language.code === 'EN')
    .forEach((project) => {
      actions.createPage({
        path: `/en/projects/${project.slug}`,
        component: path.resolve(`./src/components/templates/project.jsx`),
        context: {
          ...project,
          index: data.allWpProject.nodes.indexOf(project),
          id: project.id,
          title: project.title,
          slug: project.slug,
          lang: project.language,
          featuredImage: project.featuredImage,
          content: project.content,
          seo: project.seo,
        },
      });
    });

  console.log('CREATING EXPERTISE PAGES =========');

  // create ita expertises pages
  data.allWpExpertise.nodes
    .filter((e) => e.language.code === 'IT')
    .forEach((expertise) => {
      actions.createPage({
        path: `/expertise/${expertise.slug}`,
        component: path.resolve(
          `./src/components/templates/expertise-show.jsx`
        ),
        context: {
          ...expertise,
          index: data.allWpExpertise.nodes.indexOf(expertise),
          id: expertise.id,
          title: expertise.title,
          slug: expertise.slug,
          lang: expertise.language,
          seo: expertise.seo,
        },
      });
    });

  // create eng expertises pages
  data.allWpExpertise.nodes
    .filter((e) => e.language.code === 'EN')
    .forEach((expertise) => {
      actions.createPage({
        path: `/en/expertise/${expertise.slug}`,
        component: path.resolve(
          `./src/components/templates/expertise-show.jsx`
        ),
        context: {
          ...expertise,
          index: data.allWpExpertise.nodes.indexOf(expertise),
          id: expertise.id,
          title: expertise.title,
          slug: expertise.slug,
          lang: expertise.language,
          seo: expertise.seo,
        },
      });
    });

  console.log('CREATING ARTICLES PAGES =========');

  // create ita articles pages
  data.allWpArticle.nodes
    .filter((a) => a.language.code === 'IT')
    .forEach((article) => {
      actions.createPage({
        path: `/notizie/${article.slug}`,
        component: path.resolve(`./src/components/templates/article-show.jsx`),
        context: {
          ...article,
          index: data.allWpArticle.nodes.indexOf(article),
          id: article.id,
          title: article.title,
          slug: article.slug,
          lang: article.language,
          seo: article.seo,
        },
      });
    });

  // create eng articles pages
  data.allWpArticle.nodes
    .filter((a) => a.language.code === 'EN')
    .forEach((article) => {
      actions.createPage({
        path: `/en/news/${article.slug}`,
        component: path.resolve(`./src/components/templates/article-show.jsx`),
        context: {
          ...article,
          index: data.allWpArticle.nodes.indexOf(article),
          id: article.id,
          title: article.title,
          slug: article.slug,
          lang: article.language,
          seo: article.seo,
        },
      });
    });
};
