const UserManager = class {
  constructor() {
    this._users = []
  }

  get users() {
    return this._users
  }

  getUser(id) {
    // if users is empty
    if (this._users.length === 0) return null

    const user = this._users.find((user) => user.id === id)

    return user ? user : null
  }

  addUser({ id, username }) {
    // remove white space and user lowercase
    const sanitizedUsername = username.trim().toLowerCase()
    // determine if username already exists and return error is it does
    const existingUser = this._users.find((user) => user.username === sanitizedUsername)

    if (existingUser) {
      return { error: 'User already exists' }
    }
    const user = {
      id,
      username: sanitizedUsername
    }
    this._users.push(user)

    return { user }
  }

  removeUser(id) {
    const userIndex = this._users.findIndex((user) => user.id === id)
    if (userIndex !== -1) {
      return this._users.splice(userIndex, 1)[0]
    }
  }
}

module.exports = UserManager
