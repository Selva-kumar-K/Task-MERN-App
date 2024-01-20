const express = require('express')
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const UserRouter = express.Router()

UserRouter.post('/', registerUser)

UserRouter.post('/login', loginUser)

UserRouter.get('/current', protect, getCurrentUser)

module.exports = UserRouter