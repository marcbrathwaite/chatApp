const socketio = require('socket.io')

// Manager
const UserManager = require('../managers/UserManager')

// utils
const generateMessage = require('../utils/generateMessage')

// Constants
const { EVENTS } = require('../../ui/src/constants')

const {
  CONNECTION,
  JOIN,
  NEW_MESSAGE,
  USER_LIST,
  SEND_MESSAGE,
  DISCONNECT
} = EVENTS

const registerSocketHandlers = (server) => {
  const io = socketio(server)

  // initiate userManager
  const userManager = new UserManager()

  // listen for Client connection
  io.on(CONNECTION, (socket) => {
    console.log('New web socket connection')

    socket.on(JOIN, (username, callback) => {
      // Add user to list of users
      const { user, error } = userManager.addUser({
        id: socket.id,
        username
      })

      if (error) {
        return callback('User already exists')
      }

      // Send welcome message to user
      socket.emit(
        NEW_MESSAGE,
        generateMessage('Admin', `Welcome ${user.username}`)
      )
      socket.broadcast.emit(
        NEW_MESSAGE,
        generateMessage('Admin', `${user.username} has joined`)
      )
      // Send user list
      io.emit(USER_LIST, {
        users: userManager.users
      })

      callback()
    })

    // Sending a message
    socket.on(SEND_MESSAGE, (message, callback) => {
      const user = userManager.getUser(socket.id)
      if (!user) {
        return callback({
          error: 'User does not exist'
        })
      }
      io.emit(NEW_MESSAGE, generateMessage(user.username, message))
    })

    // disconnecting
    socket.on(DISCONNECT, () => {
      const user = userManager.removeUser(socket.id)
      if (user) {
        io.emit(
          NEW_MESSAGE,
          generateMessage('Admin', `${user.username} has left`)
        )
        // Send updated user list
        io.emit(USER_LIST, {
          users: userManager.users
        })
      }
    })
  })
}

module.exports = registerSocketHandlers
