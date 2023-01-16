import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const RegisterModal = (props) => {
  const privateKeyRef = React.useRef('')
  const addressRef = React.useRef('')
  const [checked, setChecked] = React.useState(false)

  const handleSubmit = () => {
    const pk = privateKeyRef.current.value
    const addr = addressRef.current.value

    if (pk != '' && addr != '') {
      props.onRegister(pk, addr)
      props.onHide()
    } else {
      alert('Fill all fields please.')
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Address to Use</Form.Label>
            <Form.Control
              ref={addressRef}
              type="text"
              placeholder={checked ? props.account : ''}
              disabled={checked}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox2">
            <Form.Check
              type="checkbox"
              label="Use existing address"
              onChange={() => setChecked((checked) => !checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Private Key</Form.Label>
            <Form.Control
              ref={privateKeyRef}
              type="password"
              placeholder=""
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Register</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RegisterModal
