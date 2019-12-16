const path = require(`path`);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)


// Page creations
exports.createPages = async ({
  graphql,
  actions,
  createNodeId,
  store,
  cache,
}) => {
  // The Gatsby API “createPages” is called once the
  // data layer is bootstrapped to let plugins create pages from data.
  const { createPage, createNode, createNodeField } = actions
  return graphql(`
    {
    optusCatalog {
      allPhones {
        id
        media
      }
    }
  }
  `).then(result => {

    result.data.optusCatalog.allPhones.forEach( node => {
      createPage({
        path: `/product/${node.id}/`,
        component: path.resolve(`./src/templates/ProductPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.id,
        },
      })
    })
  })
}

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions
  console.log("Creating nodes");
  createResolvers({
    OPTUSCATALOG_Phone: {
      imageFile: {
        type: `File`,
        // projection: { url: true },
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url:  encodeURI(`https:${source.mediaimage}`),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}
