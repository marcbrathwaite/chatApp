import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import socketIOClient from 'socket.io-client'
import Modal from 'react-modal'

// Components
import JoinChatRoomModal from './JoinChatRoomModal/JoinChatRoomModal.component'
import SideBar from './SideBar/SideBar.component'
import Messages from './Messages/Messages.component'

// utils
// import autoscroll from '../../utils/autoscoll'

const ENDPOINT = 'http://127.0.0.1:4000'

Modal.setAppElement('#root')

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'none',
    height: '150px'
  }
}

const ChatRoomContainer = styled.div`
  display: flex;
`
const ChatSideBarContainer = styled.div`
  height: 100vh;
  color: white;
  background: #333744;
  width: 225px;
  overflow-y: scroll;
`

const ChatMessageContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
`

const ComposeContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-top: 16px;
  padding: 24px;
`

const ComposeForm = styled.form`
  display: flex;
  flex-grow: 1;
  margin-right: 16px;
`

const ComposeInput = styled.input`
  border: 1px solid #eeeeee;
  width: 100%;
  padding: 12px;
  margin: 0 16px 0 0;
  flex-grow: 1;
`

const ComposeButton = styled.button`
  font-size: 14px;
`

const ChatRoom = ({ router }) => {
  const [socketConnection, setSocketConnection] = useState()
  const [existingMessages, setExistingMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [showModal, setShowModal] = useState(true)
  const [users, setUsers] = useState()

  useEffect(() => {
    // add socket to state
    setSocketConnection(socketIOClient(ENDPOINT))
  }, [setSocketConnection, router])

  useEffect(() => {
    if (socketConnection) {
      socketConnection.on('newMessage', (newMessage) => {
        setExistingMessages((prevMessages) => [...prevMessages, newMessage])
      })

      socketConnection.on('userList', ({ users }) => {
        setUsers(users)
      })
    }
  }, [socketConnection])

  const sendMessageHandler = (evt) => {
    evt.preventDefault()
    socketConnection.emit('sendMessage', newMessage, (error) => {
      if (error) {
        return showModal(true)
      }
    })
    setNewMessage('')
  }

  const joinChatHandler = (user) => {
    return new Promise((resolve, reject) => {
      socketConnection.emit('join', user, (error) => {
        if (error) {
          return reject(new Error('Username already exists'))
        }
        resolve()
        setShowModal(false)
      })
    })
  }

  return (
    <ChatRoomContainer>
      <ChatSideBarContainer>
        <SideBar users={users} />
      </ChatSideBarContainer>
      <ChatMessageContainer>
        <Messages messages={existingMessages} />
        <ComposeContainer>
          <ComposeForm onSubmit={sendMessageHandler}>
            <ComposeInput
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              required
              autoComplete="off"
            />
            <ComposeButton type="submit">Send</ComposeButton>
          </ComposeForm>
        </ComposeContainer>
        {showModal && (
          <Modal isOpen={showModal} style={modalStyles}>
            <JoinChatRoomModal joinChatHandler={joinChatHandler} />
          </Modal>
        )}
      </ChatMessageContainer>
    </ChatRoomContainer>
  )
}

export default ChatRoom
