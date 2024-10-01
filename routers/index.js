const express = require('express')
const Controller = require('../controllers/controller')
const errorHandler = require('../middleware/error')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const UserController = require('../controllers/userController')
const router = express.Router()



router.post('/login', UserController.login)



router.use(authentication)

router.use(errorHandler);

module.exports = router