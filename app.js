require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000

// Database
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('💰 MongoDB is open for business!'))
  .catch(err => console.log('MongoDB is closed...', err))

// Cors
app.use(cors({ credentials: true, origin: ['http://localhost:8080'] }))

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routers
const authRouter = require('./routers/auth')
const jobRouter = require('./routers/jobs')
app.use('/', authRouter)
app.use('/', jobRouter)

// 404
app.get('*', (_, res) => res.send('page not found'))

app.listen(PORT, console.log(`😀 server is listening on port ${PORT}`))

module.exports = app
