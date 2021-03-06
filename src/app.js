require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const recipeRouter = require('./Recipes/Recipes-Router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')

const app = express()
const jsonBodyParser = express.json()

const morganOption = (NODE_ENV === 'production')
  ? 'common' //switch this to common from tiny 
  : 'dev'; //switched this from common to dev

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

// app.get(`/`, (req, res) => {
//   res.status(200).res.send('Success!')
// })

app.use(`/api/recipes`, recipeRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
    }
   res.status(500).json(response)
   })

module.exports = app