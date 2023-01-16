import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import MessageCard from './MessageCard'

/* global BigInt */
const Messages = ({ loading, messages }) => {
  const fromEpochToDate = (epoch) => {
    return new Date(epoch * 1000).toLocaleString()
  }
  if (loading) return null
  return (
    <ul>
      {messages.length !== 0
        ? messages.map((message) => (
            <>
              <MessageCard
                message={message.content}
                author={message.author}
                date={fromEpochToDate(Number(message.timestamp._hex))}
                index={message.index}
              />
            </>
          ))
        : 'no message'}
    </ul>
  )
}

export default Messages
