import React from 'react'
import styled from 'styled-components'

const Title = styled.h3`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 4px;
  padding: 12px 24px 0 24px;
`
const UserList = styled.ul`
  font-weight: 300;
  padding: 12px 24px 0 24px;
`

const SideBar = ({ users }) => {
  return (
    <>
      <Title>Users</Title>
      {
        users && (
          <UserList>
            {users.map((user) => {
              return <li key={user.id}>{user.username}</li>
            })}
          </UserList>
        )
      }
      
    </>
  )
}

export default SideBar
