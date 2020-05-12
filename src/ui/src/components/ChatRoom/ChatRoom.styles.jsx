import styled from 'styled-components'

export const modalStyles = {
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

export const ChatRoomContainer = styled.div`
  display: flex;
`
ChatRoomContainer.displayName = 'ChatRoomContainer'

export const ChatSideBarContainer = styled.div`
  height: 100vh;
  color: white;
  background: #333744;
  width: 225px;
  overflow-y: scroll;
`
ChatSideBarContainer.displayName = 'ChatSideBarContainer'

export const ChatMessageContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
`
ChatMessageContainer.displayName = 'ChatMessageContainer'

export const ComposeMessageContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-top: 16px;
  padding: 24px;
`
ComposeMessageContainer.displayName = 'ComposeMessageContainer'
