import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'

// utils
import autoscroll from '../../../utils/autoscoll'

const MessagesContainer = styled.ul`
  flex-grow: 1;
  padding: 24px 24px 0 24px;
  overflow-y: scroll;
`

const Message = styled.li`
  margin-bottom: 16px;
`

const Username = styled.span`
  font-weight: 600;
  font-size: 14px;
  margin-right: 8px;
`

const CreatedAt = styled.span`
  color: #777;
  font-size: 14px;
`

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
