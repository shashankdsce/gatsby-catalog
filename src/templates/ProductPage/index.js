import React from 'react'
import { graphql } from 'gatsby'

import SEO from '~/components/seo'


import {
  Img,
  Container,
  TwoColumnGrid,
  GridLeft,
  GridRight,
} from '~/utils/styles'
import {
  ProductTitle,
  ProductDescription
} from './styles'

const ProductPage = ({ data }) => {
   const product = data.allPhonesJson.edges[0].node

  return (
    <>
      <SEO title={product.name} description={product.description} />
      <Container>
        <TwoColumnGrid>
          <GridLeft>
          {product.fields.images.localFile  && product.fields.images.localFile.childImageSharp && product.fields.images.localFile.fluid &&
            (<Img
              fluid={product.fields.images.localFile.fluid}
              alt={product.name}
            />)
          }

          </GridLeft>
          <GridRight>
            {product &&
            <>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription
                dangerouslySetInnerHTML={{ __html: product.features }}
                />

            </>
            }
          </GridRight>
        </TwoColumnGrid>
      </Container>
    </>
  )
}

export const query = graphql`
query($handle: String!) {
  allPhonesJson(filter: {id: {eq: $handle}}) {
    edges {
      node {
        id
        name
        brand
        features
        fields {
          images {

            localFile {
              childImageSharp {
              fluid(maxWidth: 910) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
            }
          }
        }
        pricing {
          in_stock
          _128GB {
            default
            plan
          }
          _256GB {
            plan
            device_outright
          }
          _32GB {
            plan
            in_stock
          }
          _512GB {
            plan
            in_stock
          }
          _64GB {
            plan
            in_stock
          }
        }
      }
    }
  }
}
`

export default ProductPage
