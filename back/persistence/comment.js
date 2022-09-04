const { commentModel, commentLikeModel } = require('../models/Post')
const userModel = require('../models/User')

exports.saveCommentInDb = async (comment) => {
  return commentModel
    .create({ ...comment })
    .then((comment) => comment)
    .catch((error) => {
      return { error }
    })
}

exports.findAllComments = async (postId) => {
  const options = {
    where: { postId: postId },
    include: [
      {
        model: userModel,
        attributes: { exclude: ['id', 'role', 'password'] },
      },
      {
        model: commentLikeModel,
        attributes: ['userId'],
        // include: {
        //   model: userModel,
        //   attributes: { exclude: ['id', 'role', 'password'] },
        // },
      },
    ],
  }
  return commentModel
    .findAll(options)
    .then((comments) => comments)
    .catch((error) => {
      return { error }
    })
}

exports.findOneComment = async (commentId) => {
  return commentModel
    .findOne({ where: { id: commentId } })
    .then((comment) => comment)
    .catch((error) => {
      return { error }
    })
}

exports.deleteComment = async (commentId) => {
  return commentModel
    .destroy({ where: { id: commentId } })
    .then((deleteResult) => deleteResult)
    .catch((error) => {
      return { error }
    })
}

exports.modifyComment = async (comment) => {
  return commentModel
    .update({ ...comment }, { where: { id: comment.id } })
    .then((comment) => comment)
    .catch((error) => {
      return { error }
    })
}

exports.findLikesOfThisComment = async (commentId) => {
  return commentLikeModel
    .findAll({ where: { commentId: commentId } })
    .then((commentLikes) => commentLikes)
    .catch((error) => {
      return { error }
    })
}

exports.saveCommentLikeInDB = async (userId, commentId) => {
  return commentLikeModel
    .create({ userId: userId, commentId: commentId })
    .then((commentLike) => commentLike)
    .catch((error) => {
      return { error }
    })
}

exports.deleteCommentLike = async (userId, commentId) => {
  return commentLikeModel
    .destroy({ where: { userId: userId, commentId: commentId } })
    .then((deleteLike) => deleteLike)
    .catch((error) => {
      return { error }
    })
}
