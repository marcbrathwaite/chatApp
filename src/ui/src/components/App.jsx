import React from 'react'

// Components
import ChatRoom from './ChatRoom/ChatRoom.component'

// Styles
import { GlobalStyle } from './global.style'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ChatRoom />
    </>
  )
}

export default App
