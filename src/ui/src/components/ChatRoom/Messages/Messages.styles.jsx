import styled from 'styled-components'

export const MessagesContainer = styled.ul`
  flex-grow: 1;
  padding: 24px 24px 0 24px;
  overflow-y: scroll;
`
MessagesContainer.displayName = 'MessagesContainer'

export const Message = styled.li`
  margin-bottom: 16px;
`
Message.displayName = 'Message'

export const Username = styled.span`
  font-weight: 600;
  font-size: 14px;
  margin-right: 8px;
`
Username.displayName = 'Username'

export const CreatedAt = styled.span`
  color: #777;
  font-size: 14px;
`
CreatedAt.displayName = 'CreatedAt'
