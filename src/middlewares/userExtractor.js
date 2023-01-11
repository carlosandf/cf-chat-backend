const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../utils/config')

module.exports = (req, res, next) => {
  // obtener authorization headers
  const authorization = req.headers.authorization

  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    // extraer el token
    token = authorization.split(' ')[1]
  }

  // decodificar el token
  const decodedToken = jwt.verify(token, SECRET_KEY)

  // validar si existe el token
  if (!token || !decodedToken.id) {
    return res.status(404).json({error: 'token missing or invalid'})
  }

  const { id: userId } = decodedToken

  req.userId = userId

  next()
}