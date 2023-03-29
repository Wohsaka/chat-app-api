const db = require('../database/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

async function createUser(req: any, res: any) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    })
  }

  try {
    const { username, email, password } = req.body
    const hashedPass = await bcrypt.hash(password, 10)
    await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPass]
    )
    const token: string = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
    res.status(201).json({ success: true, data: { accessToken: token } })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

async function loginUser(req: any, res: any) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.satatus(400).json({ success: false, message: errors.array() })
  }

  try {
    const { email, password } = req.body
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email])
    if (user.rows.length <= 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect email or password!' })
    }
    const match = await bcrypt.compare(password, user.rows[0].password)
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect email or password!' })
    }

    const token: string = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)

    res.status(200).json({
      success: true,
      message: `User ${user.rows[0].username} loged!`,
      data: {
        accessToken: token,
      },
    })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  createUser,
  loginUser,
}
