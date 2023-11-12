import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import tw from 'twin.macro';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import Heading from '../elements/Heading/Heading';
import Layout from '../LayoutComponent';
import GridMaxWidthContainer from '../elements/Atoms/GridMaxWidthContainer';
import SocialShare from '../elements/Atoms/SocialShare';
import fallbackImg from '../../images/Wau-Architetti-social-logo.jpg';

const ProjectPage = (props) => {
  const {
    slug,
    id,
    title,
    featuredImage,
    ProjectAFC,
    lang,
    content,
    seo,
    tags,
  } = props.pageContext;

  console.log(props, title);

  const data = useStaticQuery(graphql`
    query PrevNextQuery {
      projects: allWpProject(
        limit: 100
        filter: { status: { eq: "publish" } }
      ) {
        nodes {
          id
          featuredImage {
            node {
              altText
              link
              sourceUrl
              gatsbyImage(width: 1600)
            }
          }
        }
      }
    }
  `);

  const proj = data.projects?.nodes.find((project) => project.id === id);

  return (
    <Layout>
      <Helmet>
        <title>
          {seo && seo.title
            ? `${parse(seo.title)}`
            : lang.code === 'IT'
            ? `${title} • Progetti • WAU Architetti`
            : `${title} • Projects • WAU Architects`}
        </title>
        <link
          rel="canonical"
          href={
            lang.code === 'IT'
              ? `https://www.wauarchitetti.com/progetti/${slug}`
              : `https://www.wauarchitetti.com/en/projects/${slug}`
          }
        />
        <meta name="description" content={`${seo && seo.metaDesc}`} />
        <meta
          name="keywords"
          content={
            tags
              ? tags.nodes.map((tag) => (tag.name ? ` ${tag.name}` : ''))
              : 'WAU Architetti, architetti a torino, studio di architetti'
          }
        />
        <meta
          itemprop="image"
          content={`${
            featuredImage ? featuredImage.node.sourceUrl : fallbackImg
          }`}
        />
        <meta
          property="og:site_name"
          content={
            lang.code === 'IT'
              ? `${title} • Progetti • WAU Architetti`
              : `${title} • Projects • WAU Architects`
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={
            lang.code === 'IT'
              ? `https://www.wauarchitetti.com/progetti/${slug}`
              : `https://www.wauarchitetti.com/en/projects/${slug}`
          }
        />
        <meta
          property="og:title"
          content={
            lang.code === 'IT'
              ? `${title} • Progetti • WAU Architetti`
              : `${title} • Projects • WAU Architects`
          }
        />
        <meta
          property="og:image"
          content={`${
            featuredImage ? featuredImage.node.sourceUrl : fallbackImg
          }`}
        />
        <meta property="og:description" content={`${seo && seo.metaDesc}`} />
        <meta property="og:locale" content={lang.locale} />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:site"
          content={
            lang.code === 'IT'
              ? `https://www.wauarchitetti.com/progetti/${slug}`
              : `https://www.wauarchitetti.com/en/projects/${slug}`
          }
        />
        <meta
          name="twitter:title"
          content={
            lang.code === 'IT'
              ? `${title} • Progetti • WAU Architetti`
              : `${title} • Projects • WAU Architects`
          }
        />
        <meta name="twitter:description" content={`${seo && seo.metaDesc}`} />
        <meta
          name="twitter:image"
          content={`${
            featuredImage ? featuredImage.node.sourceUrl : fallbackImg
          }`}
        />
      </Helmet>
      <ProjectContainer>
        <Heading tw="flex flex-col lg:flex-row">
          <div tw="w-full md:w-3/4">
            <div className="breadcrumbs mono">
              <Link to={lang.code === 'EN' ? '/en/projects/' : '/progetti/'}>
                {lang.code === 'EN' ? 'Projects' : 'Progetti'}
              </Link>{' '}
              /
            </div>
            <div tw="w-full p-0 md:pr-32">
              <div tw="w-full">
                <h1 tw="leading-10">{title}</h1>
              </div>
              {ProjectAFC && ProjectAFC.introduzione && (
                <div className="intro" tw="w-full">
                  {parse(ProjectAFC.introduzione)}
                </div>
              )}
            </div>
          </div>
          <aside
            tw="w-full md:w-1/4 mt-8 lg:mt-0"
            className="project-aside-info"
          >
            <hr />
            {tags && tags.nodes.length > 0 && (
              <div>
                <ul tw="my-2">
                  {tags.nodes.map((tag) => (
                    <li key={tag} tw="py-0">
                      / {tag.name}
                    </li>
                  ))}
                </ul>
                <hr />
              </div>
            )}
            {ProjectAFC &&
              ProjectAFC.projectdate &&
              ProjectAFC.projectdate.split('/') && (
                <div>
                  <p tw="my-2">
                    {ProjectAFC.projectdate.split('/').slice(-1)[0]}
                  </p>
                  <hr />
                </div>
              )}
            {ProjectAFC && ProjectAFC.location && (
              <div>
                <p tw="my-2">{ProjectAFC.location}</p>
                <hr />
              </div>
            )}
          </aside>
        </Heading>
        {proj.featuredImage && (
          <figure className="project-coverImage" tw="mb-10 md:mb-16 xl:mb-24">
            {proj?.featuredImage.node.gatsbyImage ? (
              <GatsbyImage
                tw="relative w-full h-64 top-0 right-0 bottom-0 left-0"
                alt={title}
                image={getImage(proj?.featuredImage.node.gatsbyImage)}
              />
            ) : (
              <img
                src={proj.featuredImage.node.sourceUrl}
                alt={proj.featuredImage.node.altText}
                tw="relative w-full h-64 top-0 right-0 bottom-0 left-0"
              />
            )}
          </figure>
        )}
        <article tw="w-full flex justify-center">
          <GridMaxWidthContainer
            className="project-content"
            tw="w-full grid grid-cols-12 mb-16 md:mb-32"
          >
            {content && parse(content)}
            <SocialShare lang={lang.slug} />
          </GridMaxWidthContainer>
        </article>
      </ProjectContainer>
    </Layout>
  );
};

const ProjectContainer = styled.div`
  .project-coverImage .gatsby-image-wrapper {
    width: 100% !important;
    height: 50vw !important;
  }

  .project-aside-info {
    p,
    li {
      ${tw`inline-block font-light`}
    }
    li {
      ${tw`mr-2`}
    }
  }
  article {
    .project-content {
      // max-width: 1600px;

      > * {
        ${tw`col-span-12`}
      }

      > p,
      > ul,
      > ol,
      > h1,
      > h2,
      > h3,
      > h4,
      > .social-share,
      > .wp-block-quote {
        ${tw`col-span-12 md:col-span-7 md:col-start-6 my-4 mb-8 md:mb-8 xl:mb-8`}
      }

      ul {
        ${tw`pl-4`}

        li {
          ${tw`list-disc`}
        }
      }

      p {
        line-height: 1.6rem;
        ${tw`md:text-lg`}
      }

      > .wp-block-columns {
        ${tw`flex flex-col md:flex-row`}

        .wp-block-column {
          flex-grow: 1;
          ${tw`mr-0 md:mr-4`}
        }

        .wp-block-column:last-of-type {
          ${tw`mr-0`}
        }
      }

      .wp-block-embed {
        iframe {
          width: 100%;
          height: 57vw;
        }
      }

      .wp-block-separator {
        ${tw`my-6 md:my-12 xl:my-24`}
      }
      .wp-block-image {
        ${tw`my-4 md:my-12 xl:my-24`}

        img {
          ${tw`w-full h-auto`}
        }
      }
    }
  }
`;

// eslint-disable-next-line import/no-default-export
export default ProjectPage;
