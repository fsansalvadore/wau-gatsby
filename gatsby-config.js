const path = require(`path`);

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
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sass',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-meta-redirect',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        // path: './src/images/',
        path: path.join(__dirname, `src`, `images`),
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'it',
        langKeyForNull: 'it ',
        prefixDefault: false,
        useLangKeyLayout: false,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-195952687-1',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        defer: false,
      },
    },
    {
      resolve: 'gatsby-plugin-gdpr-cookies',
      options: {
        googleAnalytics: {
          trackingId: 'UA-195952687-1',
          cookieName: 'wau',
          anonymize: true,
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ['production', 'development'],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `WAU Architetti`,
        short_name: `WAU`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        icon: `src/images/favicon.svg`,
      },
    },
  ],
};
