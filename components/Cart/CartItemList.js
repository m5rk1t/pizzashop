import { Header,  Icon, Segment } from 'semantic-ui-react'

function CartItemList() {
  const user = false

  return (
    <Segment>
      <Header icon>
        <Icon name="shopping basket" />
        Váš košík je prázdný
      </Header>
      <div>
        {user ? (
          <Button color="white">Zobrazit produkty</Button>
        ) : (
          <Button color="grey">Pro přidávání se přihlaste</Button>
        )}
      </div>
      </Segment>
  )
}

export default CartItemList;
