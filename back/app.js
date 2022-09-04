const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const path = require('path')
const dotenv = require('dotenv')
const database = require('./persistence/database')

const postsRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

const app = express()
dotenv.config()

database.sync()

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(express.json())

//Limit each IP to 1000 requests per 15 minutes
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
  })
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', authRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/users', userRoutes)

module.exports = app
