
require('express-async-errors')
const express = require('express');
const routes = require('./routes')
const AppError = require('./utils/AppError')


const app = express();

app.use(express.json())
app.use(routes)


app.use((error, request, response, next) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }
  
    console.error(error)
  
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
})

app.listen('3000',()=> console.log('Aplicação rodando na porta 3000'))
