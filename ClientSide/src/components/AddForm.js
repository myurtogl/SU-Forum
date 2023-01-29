import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AddForm = ({ loading, isOwner, addMember, addMessage }) => {
  const messageRef = React.useRef('')
  const typeRef = React.useRef('')
  const [checked, setChecked] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    let message = null
    if (messageRef.current.value === '') {
      alert('Message section cannot be empty.')
      return
    } else message = messageRef.current.value

    let type = null
    if (checked) type = 'general'
    else if (typeRef.current.value === '') {
      alert('Type should be indicated.')
      return
    } else type = typeRef.current.value

    if (message && type) addMessage(type, message)
  }
  if (loading || isOwner) return null
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{isOwner ? 'Address to Add:' : 'Message:'} </Form.Label>
        <Form.Control
          ref={messageRef}
          type="textarea"
          placeholder={isOwner ? 'Enter address' : 'Enter message'}
        />
      </Form.Group>

      {isOwner ? null : (
        <>
          <Form.Group controlId="formBasicSelect">
            <Form.Label>Message Type</Form.Label>
            <Form.Control ref={typeRef} as="select" disabled={checked}>
              <option value="" required selected disabled hidden>
                Type of Message
              </option>
              <option value="academic">Academic</option>
              <option value="activities">Activities</option>
              <option value="criticism">Criticism</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="General Message"
              onChange={() => setChecked((checked) => !checked)}
            />
          </Form.Group>
        </>
      )}

      <Button variant="dark" type="submit" onClick={handleSubmit}>
        {isOwner ? 'Add Member' : 'Share Message'}
      </Button>
    </Form>
  )
}

export default AddForm
