const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const postsCtrl = require('../controllers/posts')
const multer = require('../middleware/multer-config')

router.get('/', auth, postsCtrl.getAllPosts)
router.post('/', auth, multer, postsCtrl.createPost)
router.get('/:id', auth, postsCtrl.getOnePost)
router.put('/:id', auth, multer, postsCtrl.modifyPost)
router.delete('/:id', auth, postsCtrl.deletePost)
router.post('/:id/like', auth, postsCtrl.likePost)
router.get('/:id/comment', auth, postsCtrl.getAllCommentsOfAPost)
router.post('/:id/comment', auth, multer, postsCtrl.createComment)
router.put('/:id/comment/:commentId', auth, multer, postsCtrl.modifyComment)
router.delete('/:id/comment/:commentId', auth, postsCtrl.deleteComment)
router.post('/:id/comment/:commentId/like', auth, postsCtrl.likeComment)

module.exports = router
