const ApiErrors = require('./ApiErrors')
const Success = require('./Success')
const Post = require('./Post')

const commentInDB = require('../persistence/comment')
const postInDB = require('../persistence/post')

class Comment {
  constructor() {}
  createComment = async (comment, postId, userId) => {
    if (!comment.text && (comment.imageUrl === null || comment.imageUrl === ''))
      return new ApiErrors().emptyComment()

    const post = await postInDB.findOnePost(postId)
    if (!post) return new ApiErrors().postNotFound()
    if (post.error) return new ApiErrors(post.error).serverError()

    const commentToSave = {
      ...comment,
      userId: userId,
      postId: postId,
      date: Date.now(),
    }
    const savedComment = await commentInDB.saveCommentInDb(commentToSave)
    if (savedComment.error)
      return new ApiErrors(savedComment.error).serverError()

    post.commentsNumber++
    const savedPost = await new Post().updatePost(post.dataValues)
    if (savedPost.error) return new ApiErrors(savedPost.error).serverError()

    return new Success().commentCreated()
  }
  findAllComments = async (postId) => {
    const comments = await commentInDB.findAllComments(postId)
    if (comments.error) return new ApiErrors(comments.error).serverError()
    return new Success().requestFound(comments)
  }
  deleteComment = async (commentId, userWhoAskDelete) => {
    const comment = await commentInDB.findOneComment(commentId)
    if (!comment) return new ApiErrors().commentNotFound()
    if (comment.error) return new ApiErrors(comment.error).serverError()

    const post = await postInDB.findOnePost(comment.postId)
    if (!post) return new ApiErrors().postNotFound()
    if (post.error) return new ApiErrors(post.error).serverError()

    if (
      comment.userId !== userWhoAskDelete.userId &&
      userWhoAskDelete !== 'admin'
    )
      return new ApiErrors().unauthorizedRequest()

    if (comment.imageUrl !== null) new Post().deleteImage(comment)
    const deleteComment = await commentInDB.deleteComment(commentId)
    if (!deleteComment) return new ApiErrors().commentNotFound()
    if (deleteComment.error)
      return new ApiErrors(deleteComment.error).serverError()

    post.commentsNumber > 0 ? post.commentsNumber-- : (post.commentsNumber = 0)
    const savedPost = await new Post().updatePost(post.dataValues)
    if (savedPost.error) return new ApiErrors(savedPost.error).serverError()

    return new Success().commentDeleted()
  }

  updateComment = async (comment) => {
    return await commentInDB.modifyComment(comment)
  }

  modifyComment = async (modifiedComment, userWhoAskModify) => {
    const originComment = await commentInDB.findOneComment(modifiedComment.id)
    if (!originComment) return new ApiErrors().commentNotFound()
    if (originComment.error)
      return new ApiErrors(originComment.error).serverError()
    if (
      originComment.userId !== userWhoAskModify.userId &&
      userWhoAskModify.role !== 'admin'
    )
      return new ApiErrors().unauthorizedRequest()

    if (
      !modifiedComment.text &&
      (modifiedComment.imageUrl === null || modifiedComment.imageUrl === '')
    )
      return this.deleteComment(modifiedComment.id, userWhoAskModify)

    if (
      originComment.imageUrl !== null &&
      modifiedComment.imageUrl !== originComment.imageUrl
    )
      new Post().deleteImage(originComment)

    modifiedComment.modified = true
    const updateComment = await this.updateComment(modifiedComment)
    if (updateComment.error)
      return new ApiErrors(updateComment.error).serverError()
    return new Success().postModified()
  }

  unlikeComment = async (userId, comment) => {
    const deletedLike = commentInDB.deleteCommentLike(userId, comment.id)
    if (!deletedLike) return new ApiErrors().commentNotFound()
    if (deletedLike.error) return new ApiErrors(deletedLike.error).serverError()

    comment.likes--
    const unlikeComment = await this.updateComment(comment.dataValues)
    if (unlikeComment.error)
      return new ApiErrors(unlikeComment.error).serverError()
    return new Success().unlikeRecord()
  }

  likeComment = async (userId, like, commentId) => {
    const comment = await commentInDB.findOneComment(commentId)
    if (!comment) return new ApiErrors().commentNotFound()
    if (comment.error) return new ApiErrors(comment.error).serverError()

    const likes = await commentInDB.findLikesOfThisComment(commentId)
    if (likes.error) return new ApiErrors(likes.error).serverError()
    const hasAlreadyVote = likes.some((like) => like.userId === userId)

    if (like === 0 && hasAlreadyVote)
      return await this.unlikeComment(userId, comment)
    if (like === 0 && !hasAlreadyVote)
      return new ApiErrors("L'utilisateur-rice n'a pas voté").badRequest()
    if (hasAlreadyVote)
      return new ApiErrors("L'utilisateur-rice a déjà voté").badRequest()
    if (like === 1) {
      const addedLike = await commentInDB.saveCommentLikeInDB(userId, parseInt(commentId))
      if (addedLike.error) return new ApiErrors(addedLike.error).serverError()

      comment.likes++
      const likecomment = await this.updateComment(comment.dataValues)
      if (likecomment.error)
        return new ApiErrors(likecomment.error).serverError()
      return new Success().likeRecord()
    }
    return new ApiErrors("Ceci n'est pas un vote convenable").badRequest()
  }
}

module.exports = Comment
