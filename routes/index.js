const app = require('../app')
const usersRouter = require('./users.router')
const indexRouter = require('./index.router')


function routesApi(app){
    app.use('/', indexRouter)
    app.use('/users', usersRouter)
}

module.exports = routesApi