import { Segment } from 'semantic-ui-react'
import axios from 'axios'
import ProductList from '../components/Menu/ProductList'
import baseUrl from '../utils/baseUrl'

function Menu({ products }) {
  return <Segment vertical>
    <ProductList products={products} />
  </Segment>

}

Menu.getInitialProps = async () => {
  const url = `${baseUrl}/api/products`
  const response = await axios.get(url)
  return { products: response.data }
}


export default Menu