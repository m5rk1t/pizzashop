import { Segment, Container } from 'semantic-ui-react'
import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'

function Cart() {
  return (
    <Segment vertical>
      <Container text>
        <CartItemList />
        <CartSummary />
      </Container>
    </Segment>
  )
}

export default Cart;
