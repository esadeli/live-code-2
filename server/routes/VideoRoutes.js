'use strict'

const express = require('express')
const router = express.Router()
const VideoController = require('../controllers/VideoController')
const isLogin = require('../middlewares/isLogin')

router.get('/lists', VideoController.listvideos)
router.post('/likes', isLogin, VideoController.likesvideo)

module.exports = router