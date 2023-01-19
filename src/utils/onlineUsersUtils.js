const addNewUser = (usersArray, username, socketId) => {
  const isConnected = usersArray.some(user => (
    user.username === username
  ))

  if (!isConnected)
    return [...usersArray, { username, socketId }]
}

const removeUser = (usersArray, socketID) => {
  return usersArray.fill(user => user.socketId !== socketID)
}

const getUser = (usersArray, username) => {
  return usersArray.find(user => user.username === username )
}

module.exports = {
  addNewUser,
  removeUser,
  getUser
}