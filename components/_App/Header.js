import React from 'react'
import { Menu, Container, Button, Icon, Label, Modal } from 'semantic-ui-react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import CartItemList from '../Cart/CartItemList'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

function Header() {
  const [modal, setModal] = React.useState(false)
  const router = useRouter()
  const user = false

  function isActive(route) {
    return route === router.pathname
  }

  return (<>
    <Menu stackable pointing secondary id="menu" inverted style={{ margin: "0" }}>
      <Container text>
        <Link href="/">
          <Menu.Item header>
            PIZZA OBCHOD
        </Menu.Item>
        </Link>
        <Link href="/">
          <Menu.Item active={isActive('/')}>
            <Icon
              name="home"
              size="large"
            />
            Úvod
          </Menu.Item>
        </Link>

        <Link href="/menu">
          <Menu.Item active={isActive('/menu')}>
            <Icon
              name="food"
              size="large"
            />
            Menu
          </Menu.Item>
        </Link>

        {user && (<Link href="/create">
          <Menu.Item active={isActive('/create')}>
            <Icon
              name="add square"
              size="large"
            />
          Přidat
        </Menu.Item>
        </Link>)}

        {user ? (<>
          <Link href="/account">
            <Menu.Item active={isActive('/account')}>
              <Icon
                name="user"
                size="large"
              />
              Účet
            </Menu.Item>
          </Link>

          <Menu.Item>
            <Button basic compact inverted animated='fade'>
              <Button.Content visible>Odhlášení</Button.Content>
              <Button.Content hidden>
                <Icon name='sign out' />
              </Button.Content>
            </Button>
          </Menu.Item>
        </>)
          :
          (<>
            <Menu.Item>
              <Link href="/login">
                <Button basic compact inverted animated='fade'>
                  <Button.Content visible>Přihlášení</Button.Content>
                  <Button.Content hidden>
                    <Icon name='sign in' />
                  </Button.Content>
                </Button>
              </Link>
              <Link href="/signup">
                <Button basic compact inverted animated='fade' style={{ marginLeft: '0.5em' }}>
                  <Button.Content visible>Registrace</Button.Content>
                  <Button.Content hidden>
                    <Icon name='signup' />
                  </Button.Content>
                </Button>
              </Link>
            </Menu.Item>
          </>)
        }
          <Menu.Item as="button" position="right" onClick={() => setModal(true)} >
            <Icon name='cart' size="large" />
            <Label color='grey' corner='right' content="0" />
          </Menu.Item>

      </Container>
    </Menu>        
    <Modal dimmer="blurring"  closeIcon open={modal} 
    onClose={() => setModal(false)} onOpen={() => setModal(true)}>
          <Modal.Header>Košík</Modal.Header>
          <Modal.Content scrolling>
            {/* <CartItemList /> */}
            <p>Váš košík je prázdný</p>
            <p><strong>Celkem:</strong> 0.00 Kč</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Zavřít"
              onClick={() => setModal(false)}
            />
            <Button
              content="Zobrazit produkty"
            />
            <Button
              negative
              icon="cart"
              labelPosition="right"
              content="Pokračovat"
            />
          </Modal.Actions>
        </Modal>
  </>)
}

export default Header;
