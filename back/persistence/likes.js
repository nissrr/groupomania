const { likesModel } = require('../models/Post')

exports.findLikesOfThisPost = async (postId) => {
  return likesModel
    .findAll({ where: { post_id: postId } })
    .then((likes) => likes)
    .catch((error) => {
      return { error }
    })
}

exports.saveLikeInDB = async (userId, postId) => {
  return likesModel
    .create({ user_id: userId, post_id: postId })
    .then((like) => like)
    .catch((error) => {
      return { error }
    })
}

exports.deleteLike = async (userId, postId) => {
  return likesModel
    .destroy({ where: { user_id: userId, post_id: postId } })
    .then((deleteResult) => deleteResult)
    .catch((error) => {
      return { error }
    })
}
