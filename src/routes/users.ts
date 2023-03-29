const express = require('express')
const { body } = require('express-validator')
const usersController = require('../controllers/users')

const router = express.Router()

router.post(
  '/',
  body('email').isEmail(),
  body('password').isLength(8).isAlphanumeric(),
  usersController.createUser
)

router.post(
  '/login',
  body('email').isLength(1).isEmail(),
  usersController.loginUser
)

module.exports = router
