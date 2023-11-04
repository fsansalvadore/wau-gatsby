import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import TeamPageLayout from '../components/elements/Team/TeamPageLayout';

const TeamPageIta = () => {
  const data = useStaticQuery(graphql`
    query TeamEngQuery {
      team_members: allWpTeamMember(
        limit: 100
        filter: { status: { eq: "publish" }, language: { slug: { eq: "it" } } }
      ) {
        nodes {
          date
          title
          featuredImage {
            node {
              altText
              link
              sourceUrl
              gatsbyImage(width: 900)
            }
          }
          teamMemberAFC {
            ruolo
            descrizione
            email
            founder
          }
          language {
            code
            locale
            slug
          }
        }
      }
      collaborators: allWpCollaborator(
        limit: 100
        filter: { status: { eq: "publish" }, language: { slug: { eq: "it" } } }
      ) {
        nodes {
          date
          title
          collaboratorsACF {
            ruolo
          }
        }
      }
      pages: allWpPage(
        filter: {
          status: { eq: "publish" }
          language: { slug: { eq: "it" } }
          title: { eq: "Team" }
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
    }
  `);

  return <TeamPageLayout data={data} lang="it" />;
};

// eslint-disable-next-line import/no-default-export
export default TeamPageIta;
