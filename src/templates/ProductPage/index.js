import React from 'react'
import { graphql } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
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

  const product = data.optusCatalog.Phone
  console.log('Product is',product);
  return (
    <>
      <SEO title={product.name} description={product.description} />
      <Container>
        <TwoColumnGrid>
          <GridLeft>
          {product.imageFile  && product.imageFile.childImageSharp && product.imageFile.childImageSharp.fluid &&
            (<Img
              fluid={product.imageFile.childImageSharp.fluid}
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
                <ProductForm product={product} />
            </>
            }
          </GridRight>
        </TwoColumnGrid>
      </Container>
    </>
  )
}

export const query = graphql`
  query($handle: ID!) {
    optusCatalog {
      Phone( id : $handle ) {
        id
        name
        brand
        features
        pricing
        media
        imageFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }

    }
  }
`

export default ProductPage
