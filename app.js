const app = require('./server')

app.use('/', require('./src/routes/privateRoutes'))

app.use('/', require('./src/routes/storeRoutes'))
app.use('/', require('./src/routes/usersRoutes'))
app.use('/', require('./src/routes/salesRoutes'))
app.use('/', require('./src/routes/loginRoutes'))

app.use('/', require('./src/routes/loginRoutes'))
app.use('/', require('./src/routes/registerRoutes'))



module.exports = app