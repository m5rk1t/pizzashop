import React from 'react'
import { Form, Input, TextArea, Button, Image, Message, Header, Icon, Segment, Container } from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: '',
  description: ""
}

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT)
  const [mediaPreview, setMediaPreview] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [disabled, setDisabled] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const isProduct = Object.values(product).every((el) => Boolean(el))
    isProduct ? setDisabled(false) : setDisabled(true)
  }, [product])


  function handleChange(event) {
    const { name, value, files } = event.target
    if (name === 'media') {
      setProduct((prevState) => ({ ...prevState, media: files[0] }))
      setMediaPreview(window.URL.createObjectURL(files[0]))
    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  async function handleImageUpload(params) {
    const data = new FormData()
    data.append('file', product.media)
    data.append('upload_preset', 'pizzastore')
    data.append('cloud_name', 'pizzastore')
    const response = await axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl = response.data.url
    return mediaUrl
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault() //prevent refreshing page
      setLoading(true)
      setError('')
      const mediaUrl = await handleImageUpload()
      const url = `${baseUrl}/api/product`
      const { name, price, description } = product
      const payload = { name, price, description, mediaUrl }
      const response = await axios.post(url, payload)
      console.log({ response })
      setProduct(INITIAL_PRODUCT)
      setSuccess(true)
    } catch (error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }

  }

  return (
    <Segment vertical>
      <Container text>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Přidat nový produkt
      </Header>
      <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
        <Message
          error
          header="Jejda!"
          content={error}
        />
        <Message
          success
          icon="check"
          header="Úspěch!"
          content="Produkt byl přidán."
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Název"
            placeholder="Název"
            type="text"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Cena"
            placeholder="Cena"
            type="text"
            min="0"
            step="1"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Soubor"
            accept="image/*"
            content="Vybrat obrázek"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Popis"
          placeholder="Popis"
          value={product.description}
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Přidat"
          type="submit"
        />
      </Form>
      </Container>
    </Segment>
  )
}

export default CreateProduct;
