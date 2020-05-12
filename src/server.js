const path = require('path')
const express = require('express')
const http = require('http')

// Config
const { EXPRESS_PORT } = require('./config/constants')

const registerSocketHandlers = require('./backend/socketHandlers/registerSocketHandlers')

const app = express()
const server = http.createServer(app)

registerSocketHandlers(server)

const publicPath = path.join(__dirname, './ui/build')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(publicPath))
}

server.listen(EXPRESS_PORT, () => {
  console.log(`Server started on port ${EXPRESS_PORT}`)
})
