require('dotenv').config()
const express = require('express')
const cors = require('cors')

const usersRoute = require('./routes/users')

const app = express()
app.use(cors())
app.use(express.json())

//routes
app.use('/api/users', usersRoute)

app.listen(4000, () => console.log('[SERVER]: Server running on port 4000...'))
