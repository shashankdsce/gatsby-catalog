import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import {
  Grid,
  Product,
  Title,
  PriceTag
} from './styles'
import { Img } from '~/utils/styles'

const ProductGrid = () => {
  const { store: {checkout} } = useContext(StoreContext)
  const { optusCatalog } = useStaticQuery(
    graphql`
      query {
        optusCatalog {
          allPhones {
              id
              name
              brand
              features
              media
              pricing
              mediaimage
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
  )
  const getPrice = price => {
    console.log(price);
    //const devicePricing =JSON.parse(price);
    var firstKey = Object.keys(price)[0];
    return "$" + price[firstKey].plan;
  //  return "$0";
  }
  //console.log(optusCatalog);

  return (
    <Grid>
       {optusCatalog.allPhones
        ? optusCatalog.allPhones.map(data => (
          <Product key={data.id} >
            <Link to={`/product/${data.id}/`}>
              {data.imageFile  && data.imageFile.childImageSharp && data.imageFile.childImageSharp.fluid &&
                (<Img
                  fluid={data.imageFile.childImageSharp.fluid}
                  alt={data.name}
                />)
              }
            </Link>
            <Title>{data.name}</Title>
            <PriceTag>{getPrice(data.pricing)}</PriceTag>
          </Product>
        ))
        : <p>No Products found!</p>}
    </Grid>
  )
}

export default ProductGrid
