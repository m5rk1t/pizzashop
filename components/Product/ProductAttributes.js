import React from 'react'
import { Header, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import { useRouter } from 'next/router'

function ProductAttributes({ description, _id }) {
  const [modal, setModal] = React.useState(false)
  const router = useRouter()

  async function handleDelete() {
    const url = `${baseUrl}/api/product`
    const payload = { params: { _id } }
    await axios.delete(url, payload)
    router.push('/')
  }
  return (
    <>
      <Header as="h3">Popis produktu</Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Odstranit produkt"
        onClick={() => setModal(true)}
      />
      <Modal open={modal} dimmer="blurring">
        <Modal.Header>Odstranit produkt</Modal.Header>
        <Modal.Content >
          <p>Opravdu chcete odstranit tento produkt?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Zrušit"
            onClick={() => setModal(false)}
          />
          <Button
            negative
            icon="trash"
            labelPosition="right"
            content="Odstranit"
            onClick={handleDelete}
          />
        </Modal.Actions>
      </Modal>
    </>)
}

export default ProductAttributes;
