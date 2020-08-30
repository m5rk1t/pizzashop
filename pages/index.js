import React from 'react'
import { Segment, Header, Container } from 'semantic-ui-react'
import axios from 'axios'
import ProductList from '../components/Menu/ProductList'
import baseUrl from '../utils/baseUrl'

function Home({ products }) {
  return (
    <>
      <Segment vertical style={{ width: "100vw" }} textAlign='center' inverted color="teal">
        <Container text>
          <Header as="h1" inverted style={{ fontSize: "4em", fontWeight: "normal", marginTop: "0.5em" }}>
            Pizza Obchod
        </Header>
          <Header as="h2" inverted style={{ fontSize: '1.7em', fontWeight: 'normal', marginTop: '0.5em', marginBottom: '1em' }}>
            Rozvoz jídla
        </Header>
          <Header as="h3" inverted style={{ fontSize: '1.3em', fontWeight: 'normal', marginTop: '0.5em', marginBottom: '1em' }}>
            Nový eshop.
        </Header>
        </Container>
      </Segment>
      <Segment vertical style={{ width: "100vw" }} >
        <ProductList products={products} />
      </Segment>
    </>
  )

}

Home.getInitialProps = async () => {
  const url = `${baseUrl}/api/products`
  const response = await axios.get(url)
  return { products: response.data }
}


export default Home;
