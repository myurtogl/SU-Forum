import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const MessageCard = ({ message, author, date, index }) => {
  return (
    <>
      <Card
        bg={'dark'}
        key={'dark'}
        text={'white'}
        style={{ width: '40rem' }}
        className="mb-2"
      >
        <Card.Header>{author}</Card.Header>
        <Card.Body>
          <Card.Text>{message}</Card.Text>
          <Card.Text className="text-muted">
            {date}{' '}
            <Button
              key={index}
              onClick={() => console.log('commented ' + index)}
            >
              Comment
            </Button>
          </Card.Text>
          {/* <Card.Footer className="text-muted">
            <Button
              key={index}
              onClick={() => console.log('commented ' + index)}
            >
              Comment
            </Button>
          </Card.Footer> */}
        </Card.Body>
      </Card>
    </>
  )
}

export default MessageCard
