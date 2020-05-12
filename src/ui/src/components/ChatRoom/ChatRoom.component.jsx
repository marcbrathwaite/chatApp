import React, { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import Modal from 'react-modal'

// Components
import JoinChatRoomModal from './JoinChatRoomModal/JoinChatRoomModal.component'
import SideBar from './SideBar/SideBar.component'
import ComposeMessage from './ComposeMessage/ComposeMessage.component'
import Messages from './Messages/Messages.component'

// Styles
import {
  modalStyles,
  ChatRoomContainer,
  ChatSideBarContainer,
  ChatMessageContainer,
  ComposeMessageContainer
} from './ChatRoom.styles'

// Constants
import { EVENTS, ENDPOINT } from '../../constants'

const { JOIN, NEW_MESSAGE, USER_LIST, SEND_MESSAGE } = EVENTS

Modal.setAppElement('#root')

const ChatRoom = ({ router }) => {
  const [socketConnection, setSocketConnection] = useState()
  const [existingMessages, setExistingMessages] = useState([])
  const [showModal, setShowModal] = useState(true)
  const [users, setUsers] = useState()

  useEffect(() => {
    // add socket to state
    setSocketConnection(socketIOClient(ENDPOINT))
  }, [setSocketConnection, router])

  useEffect(() => {
    if (socketConnection) {
      // register listener for new messages
      socketConnection.on(NEW_MESSAGE, (newMessage) => {
        setExistingMessages((prevMessages) => [...prevMessages, newMessage])
      })
      // register listener for updated user list
      socketConnection.on(USER_LIST, ({ users }) => {
        setUsers(users)
      })
    }
  }, [socketConnection])

  const sendMessageHandler = (message) => {
    socketConnection.emit(SEND_MESSAGE, message, (error) => {
      if (error) {
        return showModal(true)
      }
    })
  }

  const joinChatHandler = (user) => {
    return new Promise((resolve, reject) => {
      socketConnection.emit(JOIN, user, (error) => {
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
        <ComposeMessageContainer>
          <ComposeMessage composeMessageHandler={sendMessageHandler} />
        </ComposeMessageContainer>
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
