require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(4000, () => console.log('[SERVER]: Server running on port 4000...'))
