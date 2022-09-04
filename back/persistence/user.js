const userModel = require('../models/User')

exports.saveUserInDB = async (email, password) => {
  return userModel
    .create({ email: email, password: password })
    .then((savedUser) => savedUser)
    .catch((error) => {
      return { error: error.message }
    })
}

exports.findUserByMailInDB = async (email) => {
  return userModel
    .findOne({ where: { email: email } })
    .then((user) => user)
    .catch((error) => {
      return { error }
    })
}

exports.findUserByIdInDB = async (userId) => {
  return userModel
    .findOne({ where: { id: userId }, attributes: { exclude: ['password'] } })
    .then((userInDB) => {
      return userInDB
    })
    .catch((error) => {
      return { error }
    })
}

exports.updateUser = async (user) => {
  return userModel
    .update({ ...user }, { where: { id: user.id } })
    .then((user) => user)
    .catch((error) => {
      return { error }
    })
}
