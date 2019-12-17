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
      allPhonesJson {
        edges {
          node {
            id
          }
        }
      }
    }
  `).then(result => {
    result.data.allPhonesJson.edges.forEach( edge => {

      createPage({
        path: `/product/${edge.node.id}/`,
        component: path.resolve(`./src/templates/ProductPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: edge.node.id,
        },
      })
    })
  })
}

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions
  if (node.internal.type === "PhonesJson") {
    if (node.media) {
      const images = await Promise.all(
        node.media.map(url =>
          createRemoteFileNode({
            url: encodeURI((url.largeImg.startsWith('//') ? `https:${url.largeImg}` : url.largeImg)),
            parentNodeId: node.id,
            store,
            cache,
            createNode,
            createNodeId: id => `product-images-${node.id}`,
          })
        )
      )
      await createNodeField({
        node,
        name: "images",
        value: images,
      })

      node.fields.images.forEach((image, i) => {
        console.log('Node is',node);
        console.log('Node fields is',node.fields);
        image.localFile___NODE = images[i].id
      })
    }
  }
}
