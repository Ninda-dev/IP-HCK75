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

router

//CRUD Product
router.use(authentication)
router.get('/products', ProductController.getProduct)
router.post('/products', ProductController.createProduct)
router.put('/products/:id', ProductController.updateProduct)
router.delete('/products/:id', ProductController.deleteProduct)


router.use(errorHandler);

module.exports = router