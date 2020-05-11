const socketio = require('socket.io')

// Manager
const UserManager = require('../managers/UserManager')

// utils
const generateMessage = require('../utils/generateMessage')

const registerSocketHandlers = (server) => {
  const io = socketio(server)

  // initiate userManager
  const userManager = new UserManager()

  // listen for Client connection
  io.on('connection', (socket) => {
    console.log('New web socket connection')

    socket.on('join', (username, callback) => {
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
        'newMessage',
        generateMessage('Admin', `Welcome ${user.username}`)
      )
      socket.broadcast.emit(
        'newMessage',
        generateMessage('Admin', `${user.username} has joined`)
      )
      io.emit('userList', {
        users: userManager.users
      })

      callback()
    })

    // Sending a message
    socket.on('sendMessage', (message, callback) => {
      const user = userManager.getUser(socket.id)
      if (!user) {
        return callback({
          error: 'User does not exist'
        })
      }
      io.emit('newMessage', generateMessage(user.username, message))
    })

    // disconnecting
    socket.on('disconnect', () => {
      const user = userManager.removeUser(socket.id)
      if (user) {
        io.emit(
          'newMessage',
          generateMessage('Admin', `${user.username} has left`)
        )
      }
    })
  })
}

module.exports = registerSocketHandlers
