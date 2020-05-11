import React, { useState } from 'react'
import styled from 'styled-components'

const Modal = styled.div`
  padding: 10px;
`

const InputLabel = styled.label`
  display: block;
  margin-bottom: 20px;
`

const Container = styled.div``

const InputContainer = styled.form`
  display: flex;
  height: 30px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const Input = styled.input`
  width: 80%;
  height: 100%;
  padding: 10px 5px;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
`
const Button = styled.button`
  height: 100%;
  font-size: 1.2rem;
  border: 1px solid #e1e1e1;
  border-radius: 2px;
`

const ErrorMsg = styled.p`
  font-size: 1.2rem;
  color: red;
  margin-bottom: 5px;
`

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
      <Container>
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
          <Button type="submit">
            Join
          </Button>
        </InputContainer>
      </Container>
    </Modal>
  )
}

export default JoinChatRoomModal
