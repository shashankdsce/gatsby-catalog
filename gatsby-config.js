const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `Optus Shop`,
    description: `Optus Catalog..`,
    author: `@alexanderhorl`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "OPTUSCATALOG",
        // This is the field under which it's accessible
        fieldName: "optusCatalog",
        // URL to query from
        url: "http://localhost:3002",
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '~': path.join(__dirname, 'src/'),
      },
    },
    {
    // Note: this plugin is coded to only work on production
      resolve: `gatsby-plugin-suscribers`,
      options: {
        id: '03eb77bf-f731-473e-b760-cb2d2bd0d30f',
      }
    },
  //  {
    //  resolve: `gatsby-plugin-google-analytics`,
    //  options: {
      //  trackingId: "UA-134421805-1",
      //  anonymize: true,
      //  respectDNT: true,
      //},
    //},
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
     'gatsby-plugin-offline',
  ],
}
