require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `@xdmorgan/gatsby-starter`,
    description: `with Typescript and PostCSS`,
    author: `@gatsbyjs + @xdmorgan`,
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
