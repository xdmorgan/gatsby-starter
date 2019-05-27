require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    // site meta description
    description: process.env.SITE_META_DESCRIPTION || "",
    // site meta keywords
    keywords: (process.env.SITE_META_KEYWORDS || "").split(', '),
    // site logo (meta json schema)
    logo: process.env.SITE_META_LOGO || "",
    // organization name (meta json schema)
    organization: process.env.SITE_META_ORGANIZATION || "",
    // Base page title
    title: process.env.SITE_META_TITLE || "",
    // twitter card user attribution
    twitter: process.env.SITE_META_TWITTER || "",
    // fkn base url
    url: process.env.SITE_META_URL || ""
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
