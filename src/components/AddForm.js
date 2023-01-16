import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AddForm = ({
  loading,
  isOwner,
  addMember,
  addMessage,
  setInputValue,
  inputValue,
}) => {
  const messageRef = React.useRef('')
  const typeRef = React.useRef('')
  const [checked, setChecked] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    let type = null
    if (checked) type = 'general'
    else if (typeRef.current.value === '') alert('Type should be indicate.')
    else type = typeRef.current.value

    let message = null
    if (messageRef.current.value === '') alert('Message cannot be empty.')
    else message = messageRef.current.value

    if (message && type) addMessage(type, message)
  }
  if (loading) return null
  return (
    // <div style={{ margin: '20px' }}>
    //   <form>
    //     <>
    //       <label>
    //         {isOwner ? 'Address to Add:' : 'New Message:'}
    //         <input
    //           type="text"
    //           value={inputValue}
    //           onChange={(e) => setInputValue(e.target.value)}
    //         />
    //       </label>
    //       {isOwner ? (
    //         <button type="button" onClick={addMember}>
    //           Add Member
    //         </button>
    //       ) : (
    //         <button type="button" onClick={addMessage}>
    //           Add Message
    //         </button>
    //       )}
    //     </>
    //   </form>
    // </div>

    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{isOwner ? 'Address to Add:' : 'New Message:'} </Form.Label>
        <Form.Control ref={messageRef} type="email" placeholder="Enter message" />
      </Form.Group>

      {/* <Form.Group className="mb-3">
        <Form.Label>Disabled select menu</Form.Label>
        <Form.Select>
          <option>Disabled select</option>
          <option>Disabled select2</option>
        </Form.Select>
        <Form.Text className="text-muted">
          Indicate the type for your message, if it's general, you can check the
          box below.
        </Form.Text>
      </Form.Group> */}

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
      {isOwner ? (
        <Button variant="primary" type="submit" onClick={addMember}>
          Add Member
        </Button>
      ) : (
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Share Message
        </Button>
      )}
    </Form>
  )
}

export default AddForm
