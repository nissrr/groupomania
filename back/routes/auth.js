const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const userValidators = require('../middleware/userValidators')

router.post('/signup', userValidators, userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router
