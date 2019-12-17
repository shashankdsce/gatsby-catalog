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
  const { allPhonesJson } = useStaticQuery(
    graphql`
      query {
          allPhonesJson {
            edges{
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
  )
  const getPrice = price => {
    console.log(price);
    //const devicePricing =JSON.parse(price);
    //var firstKey = Object.keys(price)[0];
    return "$50" ;
  //  return "$0";
  }


  return (
    <Grid>
       {allPhonesJson.edges
        ? allPhonesJson.edges.map(data => (
          <Product key={data.node.id} >
            <Link to={`/product/${data.node.id}/`}>

              {data.node.fields && data.node.fields.images &&
                (<Img
                  fluid={data.node.fields.images[0].localFile.childImageSharp.fluid}
                  alt={data.node.name}
                />)
              }
            </Link>
            <Title>{data.node.name}</Title>
            <PriceTag>{data.node.id} {getPrice(data.node.pricing)}</PriceTag>
          </Product>
        ))
        : <p>No Products found!</p>}
    </Grid>
  )
}

export default ProductGrid
