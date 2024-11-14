const express = require('express')
const { registerController, loginController, allRegisteredUsersController, userDetailsController } = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = new express.Router()  

// register : http://localhost:3003/register
router.post('/register', registerController)

//login : http://localhost:3003/login
router.post('/login', loginController)

//all-registered-users : http://localhost:3003/all-registered-users
router.get('/all-registered-users', jwtMiddleware, allRegisteredUsersController)

//user-Details : http://localhost:3003/user-details
router.get('/userDetails/:id', jwtMiddleware, userDetailsController)

module.exports = router  