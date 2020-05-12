exports.EVENTS = {
  CONNECTION: 'connection',
  JOIN: 'join',
  NEW_MESSAGE: 'newMessage',
  USER_LIST: 'userList',
  SEND_MESSAGE: 'sendMessage',
  DISCONNECT: 'disconnect'
}

exports.ENDPOINT =
  process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:4000' : '/'
