const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.signToken = (userId, role) => {
  return jwt.sign({ userId: userId, role: role }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.TOKEN_EXPIRED,
  })
}

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_TOKEN)
  } catch (error) {
    return { error }
  }
}
