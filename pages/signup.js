import React from 'react'
import { Container, Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import axios from 'axios'
import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'
import { handleLogin } from '../utils/auth'

const INITIAL_USER = {
  name: "",
  email: "",
  password: ""
}

function Signup() {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  function handleChange(event) {
    const { name, value } = event.target
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault() //prevent refreshing page
    try {
      setLoading(true)
      setError('')
      const url = `${baseUrl}/api/signup`
      const payload = { ...user}
      const response = await axios.post(url, payload)
      handleLogin(response.data)
    
    } catch (error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }

  }

  return (
    <Segment vertical>
      <Container text>
        <Message
          attached
          icon="settings"
          header="Začněme!"
          content="Vytvořit nový účet"
          color="teal"
        />
        <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
          <Message
            error
            header="Jejda!"
            content={error}
          />
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              label="Jméno"
              placeholder="Jméno"
              name="name"
              onChange={handleChange}
              value={user.name}
            />
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              label="Email"
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
              value={user.email}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="Heslo"
              placeholder="Heslo"
              name="password"
              type="password"
              onChange={handleChange}
              value={user.password}
            />
            <Button
              disabled={disabled || loading}
              icon="signup"
              type="submit"
              color="orange"
              content="Registrovat se"
            />
          </Segment>
        </Form>
        <Message attached="bottom" warning>
          <Icon name="help" />
      Existující uživatel?{" "}
          <Link href="/login">
            <a>Přihlásit se</a>
          </Link>
        </Message>
      </Container>
    </Segment>
  )
}

export default Signup;
