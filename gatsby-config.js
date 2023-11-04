/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `wau-gatsby`,
    siteUrl: `https://www.wauarchitetti.com/`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: 'https://wp.wauarchitetti.com/graphql',
        typeName: 'WPGraphQL',
        fieldName: 'wpgraphql',
        useACF: true,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
  ],
};
