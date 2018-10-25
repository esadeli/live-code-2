'use strict'

const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const isLogin = require('../middlewares/isLogin')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/userbasicinfo', isLogin, UserController.getBasicInfo)

module.exports = router