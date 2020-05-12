import React from 'react'

// Styles
import {
  Title,
  UserList
} from './SideBar.styles'

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
