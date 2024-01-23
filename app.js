var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const expressJWT = require('express-jwt')

const { JWT_SECRET } = require('./config')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const userRouter = require('./router/users.route')
const addrRouter = require('./router/addr.route')
const cartRouter = require('./router/cart.route')
const goodsRouter = require('./router/goods.route')
const orderRouter = require('./router/order.route')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(
  cors({
    origin: '*',
  })
)
// content-type：application/json
// app.use(bodyParser.json())

// content-type：application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  expressJWT({
    secret: JWT_SECRET,
  }).unless({ path: [/^\/users\//] })
)

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/users', userRouter)
app.use('/address', addrRouter)
app.use('/carts', cartRouter)
app.use('/goods', goodsRouter)
app.use('/orders', orderRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Not Found'))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
