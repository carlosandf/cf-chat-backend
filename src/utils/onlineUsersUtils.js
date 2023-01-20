const addNewUser = (usersArray, userId, socketId) => {
  const isConnected = usersArray.some(user => (
    user.userId === userId
  ))

  if(isConnected) return [...usersArray]

  return [...usersArray, { userId, socketId }]
}

const removeUser = (usersArray, socketID) => {
  return usersArray.filter(user => user.socketId !== socketID)
}

const getUser = (usersArray, userId) => {
  return usersArray.find(user => user.userId === userId )
}

module.exports = {
  addNewUser,
  removeUser,
  getUser
}