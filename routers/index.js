const express = require('express')
const errorHandler = require('../middleware/error')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const UserController = require('../controllers/userController')
const router = express.Router()



router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.

router.use(authentication)

router.use(errorHandler);

module.exports = router