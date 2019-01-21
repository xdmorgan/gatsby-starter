require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const {
  SITE_META_DESCRIPTION = `An opinionated Gatsby starter project with TypeScript and styled-components`,
  SITE_META_KEYWORDS = 'gatsby-starter, Gatsby template, FPO',
  SITE_META_LOGO = 'https://xdmorgan-gatsby-starter.netlify.com/icons/icon-256x256.png',
  SITE_META_ORGANIZATION = 'Dan Morgan',
  SITE_META_TITLE = '@xdmorgan/gatsby-starter',
  SITE_META_TWITTER = '@xdanmorgan',
  SITE_META_URL = `https://xdmorgan-gatsby-starter.netlify.com/`,
} = process.env

module.exports = {
  siteMetadata: {
    description: SITE_META_DESCRIPTION,
    keywords: SITE_META_KEYWORDS.split(', '),
    logo: SITE_META_LOGO,
    organization: SITE_META_ORGANIZATION,
    title: SITE_META_TITLE,
    twitter: SITE_META_TWITTER,
    url: SITE_META_URL,
  },
  plugins: [
    /**
     * Typescript
     * ------------------------------------------------------------------------
     */
    `gatsby-plugin-typescript`,
    /**
     * Sources
     * ------------------------------------------------------------------------
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    /**
     * Images
     * ------------------------------------------------------------------------
     */
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    /**
     * Styling
     * ------------------------------------------------------------------------
     */
    `gatsby-plugin-postcss`, // global
    {
      resolve: `gatsby-plugin-styled-components`, // components
      options: {}, // Add any options here
    },
    /**
     * SEO
     * ------------------------------------------------------------------------
     */
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.UA_TRACKING_ID,
      },
    },
    /**
     * PWA
     * ------------------------------------------------------------------------
     * this (optional) plugin enables Progressive Web App + Offline functionality
     * To learn more, visit: https://gatsby.app/offline
     * ------------------------------------------------------------------------
     */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `@xdmorgan/gatsby-starter`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#0068fa`,
        theme_color: `#0068fa`,
        display: `minimal-ui`,
        icon: `src/images/avatar.png`, // This path is relative to the root of the site.
      },
    },
    // ...(process.env.NODE_ENV !== 'development'
    //   ? ['gatsby-plugin-offline']
    //   : []),
  ],
}
