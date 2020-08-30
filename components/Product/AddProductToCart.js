import { Input } from 'semantic-ui-react'

function AddProductToCart() {
  return <Input
    type="number"
    min="1"
    placeholder="Počet"
    value={1}
    action={{
      color: 'teal',
      content: "Do košíku",
      icon: "plus cart"
    }}

  />;
}

export default AddProductToCart;
