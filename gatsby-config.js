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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-xxxxxxxx-0',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `@xdmorgan/gatsby-starter`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#0068fa`,
        theme_color: `#0068fa`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-typescript`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // ...(process.env.NODE_ENV === 'production' ? ['gatsby-plugin-offline'] : []),
  ],
}
