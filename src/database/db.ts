const { Pool } = require('pg')

//Connecting to database
const pool = new Pool({
  host: process.env.DATABASE_URL ? process.env.DATABASE_URL : 'localhost',
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: process.env.DATABASE_URL ? true : false,
})
pool.on('error', (error: object) => console.log(error))
pool.on('connect', () => console.log('Client connected to database!!'))

pool.query(`CREATE TABLE IF NOT EXISTS users(
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(40) NOT NULL
  );`)

module.exports = pool
