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
        path: path.join(__dirname, `data`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-layout`,
    `gatsby-transformer-json`,
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
      resolve: `gatsby-plugin-remote-images`,
      options: {
        // The node type that has the images you want to grab.
        // This is generally the camelcased version of the word
        // after the 'all' in GraphQL ie. allMyImages type is myImages
        nodeType: 'phonesJson',
        // For simple object traversal, this is the string path to the image you
        // want to use, relative to the node.
        // This uses lodash .get, see [docs for accepted formats here](https://lodash.com/docs/4.17.11#get).
        // For traversing objects with arrays at given depths, see [how to handle arrays below](#traversing-objects-with-arrays)
        imagePath: 'media.largeImg',
        // ** ALL OPTIONAL BELOW HERE: **
        // Name you want to give new image field on the node.
        // Defaults to 'localImage'.
        // Allows modification of the URL per image if needed. Expects a function
        // taking the original URL as a parameter and returning the desired URL.
        prepareUrl: url => (url.startsWith('//') ? `https:${url}` : url),
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
