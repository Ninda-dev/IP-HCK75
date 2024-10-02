const express = require('express')
const errorHandler = require('../middleware/error')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const UserController = require('../controllers/userController')
const ProductController = require('../controllers/productController')
const router = express.Router()


//Register Login
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//CRUD Product
router.post('/product', ProductController.createProduct)

// router.use(authentication)

router.use(errorHandler);

module.exports = router