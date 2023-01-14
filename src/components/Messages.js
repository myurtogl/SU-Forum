import React from 'react'

const Messages = ({ loading, messages }) => {
  if (loading) return null
  return (
    <ul>
      {messages.length !== 0
        ? messages.map((message) => (
            <li key={message.timestamp}>
              {message.author}: {message.content}
            </li>
          ))
        : 'no message'}
    </ul>
  )
}

export default Messages
