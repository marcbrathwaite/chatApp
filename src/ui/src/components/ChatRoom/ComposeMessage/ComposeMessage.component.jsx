import React, { useState } from 'react'

// Styles
import {
  ComposeForm,
  ComposeInput,
  ComposeButton
} from './ComposeMessage.styles'

const ComposeMessage = ({ composeMessageHandler }) => {
  const [message, setMessage] = useState('')

  const onSubmitHandler = (evt) => {
    evt.preventDefault()
    composeMessageHandler(message)
    setMessage('')
  }

  return (
    <ComposeForm onSubmit={onSubmitHandler}>
      <ComposeInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        autoComplete="off"
      />
      <ComposeButton type="submit">Send</ComposeButton>
    </ComposeForm>
  )
}

export default ComposeMessage
