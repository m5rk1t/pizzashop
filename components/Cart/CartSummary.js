import { Button, Segment, Divider } from 'semantic-ui-react'

function CartSummary() {
  return <>
    <Divider />
    <Segment clearing size="large">
      <strong>Celkem:</strong> 0.00 Kč
      <Button
      icon="cart"
      color="teal"
      floated="right"
      content="Pokračovat"
      />
    </Segment>
  </>;
}

export default CartSummary;
