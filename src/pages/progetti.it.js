import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ProjectsPageLayout from '../components/elements/Projects/ProjectsPageLayout';

const ProjectsPageIta = () => {
  const data = useStaticQuery(graphql`
    query ProjectsItaQuery {
      pages: allWpPage(
        filter: {
          status: { eq: "publish" }
          language: { slug: { eq: "it" } }
          title: { eq: "Progetti" }
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
      projects: allWpProject(
        limit: 100
        filter: { status: { eq: "publish" }, language: { slug: { eq: "it" } } }
      ) {
        nodes {
          content
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
              gatsbyImage(width: 1200)
            }
          }
          tags {
            nodes {
              name
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
    }
  `);

  return <ProjectsPageLayout data={data} lang="it" />;
};

// eslint-disable-next-line import/no-default-export
export default ProjectsPageIta;
