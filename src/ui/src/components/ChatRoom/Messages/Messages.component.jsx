import React, { useRef, useEffect } from 'react'
import moment from 'moment'

// Styles
import {
  MessagesContainer,
  Message,
  Username,
  CreatedAt
} from './Messages.styles'

// utils
import autoscroll from '../../../utils/autoscoll'

const Messages = ({ messages }) => {
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messages.length > 0) {
      autoscroll(messagesRef)
    }
  }, [messages])

  return (
    <MessagesContainer ref={messagesRef}>
      {messages.map((message, index) => {
        const { username, text, createdAt } = message
        return (
          <Message key={`${createdAt}-${username}-${index}`}>
            <p>
              <Username>{username}</Username>
              <CreatedAt>{moment(createdAt).format('h:mm a')}</CreatedAt>
            </p>
            <p>{text}</p>
          </Message>
        )
      })}
    </MessagesContainer>
  )
}

export default Messages
