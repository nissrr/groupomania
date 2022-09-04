const User = require('../domain/User')

exports.signup = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password)
  const response = await user.saveUser()
  return res.status(response.code).json(response.message)
}

exports.login = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password)
  const response = await user.findUser()
  return res.status(response.code).json(response.message)
}

exports.getDataOfAUser = async (req, res, next) => {
  const response = await new User().findDataOfThisUser(req.params.id)
  return res.status(response.code).json(response.message)
}

exports.updateDataOfAUser = async (req, res, next) => {
  const user = { id: parseInt(req.params.id), ...req.body }
  const userWhoAskUpdate = { id: req.auth.userId, role: req.auth.role }
  const response = await new User().updateDataOfThisUser(user, userWhoAskUpdate)
  return res.status(response.code).json(response.message)
}

exports.getPostsOfAUser = async (req, res, next) => {
  const response = await new User().findPostsOfThisUser(req.params.id)
  return res.status(response.code).json(response.message)
}
