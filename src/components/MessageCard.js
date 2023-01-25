import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
const MessageCard = ({ message, author, date, index, addComment }) => {
  const [commentField, setCommentField] = useState(false)
  const [comment, setComment] = useState('')

  const handleComment = () => {
    if (comment !== '') {
      addComment(index, comment)
    }
  }

  return (
    <>
      <Card
        text={'black'}
        style={{
          width: '%40',
          borderRadius: '2rem ',
          margin: 'auto',
          background: '#86b3d1',
        }}
        className="mb-2"
      >
        <Card.Header>{author}</Card.Header>
        <Card.Body>
          <Card.Text>{message}</Card.Text>
          <Card.Text className="text-muted">
            {date}
            <Button
              key={index}
              variant="outline-dark"
              style={{ float: 'right' }}
              onClick={() => setCommentField((state) => !state)}
            >
              {commentField ? 'Cancel' : 'Comment'}
            </Button>
          </Card.Text>
        </Card.Body>
        {commentField ? (
          <Card.Footer>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                {/* <Form.Label>Comment</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Enter Comment"
                  // onChange={e => e.}
                />
              </Form.Group>
            </Form>
            <Button variant="outline-dark" style={{ float: 'right' }}>
              Send
            </Button>
          </Card.Footer>
        ) : null}
      </Card>
    </>
  )
}

export default MessageCard
