import React, { useState } from 'react'

// Styles
import {
  Modal,
  InputLabel,
  InputContainer,
  Input,
  Button,
  ErrorMsg
} from './JoinChatRoom.styles'

const JoinChatRoomModal = ({ joinChatHandler }) => {
  const [userName, setUserName] = useState('')
  const [isError, setIsError] = useState(false)

  const onSubmitHandler = async (evt) => {
    evt.preventDefault()
    try {
      await joinChatHandler(userName)
    } catch {
      setIsError(true)
      setUserName('')
    }
  }

  return (
    <Modal>
      <InputLabel>Enter username to join chat</InputLabel>
      <div>
        {isError && <ErrorMsg>Username already is use.</ErrorMsg>}
        <InputContainer onSubmit={onSubmitHandler}>
          <Input
            placeholder="Enter UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            autoComplete="off"
            maxLength="15"
          />
          <Button type="submit">Join</Button>
        </InputContainer>
      </div>
    </Modal>
  )
}

export default JoinChatRoomModal
