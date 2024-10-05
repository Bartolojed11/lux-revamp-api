const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const AppError = require('./handlers/AppError')
const ErrorHandler = require('./handlers/ErrorHandler')

const app = express()

// Global middlewares
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      // Pass to next layer of middleware
      next();
  })
  
// Set security HTTP headers
app.use(helmet())

// morgan > Will log the endpoint on console or terminal and how long a response is sent back
// NODE_ENV is accessible here because it's on server.js and it only needs to run once
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 10000,
    message: 'Too many requests for this IP, please try again in an hour'
})

app.use('/api', limiter)

// it stands between middle of request and response
// express.json() middle ware, adds body to the request containing the request data
app.use(express.json())

app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use((req, res, next) => {
    req.requestTimeout = new Date().toISOString()
    // requestTimout can be accessed using req on any route after this middleware
    next()
    // next() is used here so that it will process the next middlewares
})


// Homepage
app.get('/api/v1', (req, res) => {
    res.status(200).send({
        message: "Hello from the home page",
        app: "API"
    })
})

/**
 * routes => mounting routes
 */
// public
const userRouter = require('./routes/v1/public/userRoutes')
const orderRouter = require('./routes/v1/public/orderRoutes')
const cartRouter = require('./routes/v1/public/cartRoutes')
const productRouter = require('./routes/v1/public/productRoutes')
const locationRouter = require('./routes/v1/public/locationRoutes')
const categoryRouter = require('./routes/v1/public/categoryRoutes')

app.use('/api/v1/users', userRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/locations', locationRouter)
app.use('/api/v1/categories', categoryRouter)

// admin
const adminProductRouter = require('./routes/v1/admin/productRoutes')
const adminCategoryRouter = require('./routes/v1/admin/categoryRoutes')
const adminOrderRouter = require('./routes/v1/admin/orderRoutes')
const LocationAdminRouter = require('./routes/v1/admin/locationRoutes')
const userAdminRouter = require('./routes/v1/userRoutes')

app.use('/api/v1/admin/products', adminProductRouter)
app.use('/api/v1/admin/categories', adminCategoryRouter)
app.use('/api/v1/admin/orders', adminOrderRouter)
app.use('/api/v1/admin/location', LocationAdminRouter)
app.use('/api/v1/admin/users', userAdminRouter)


// Shared
const userAuthRouter = require('./routes/v1/userRoutes')
app.use('/api/v1/auth', userAuthRouter)

/**
 * Specify unhandle routes
 * .all() means all http methods
 * * means all http verbs
 */
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find route ${req.url} on the server`, 404));
})

app.use(ErrorHandler)

module.exports = app
