const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const path = require('path')
const route = require('./routes')
const db = require('./config/db')
const sortMiddleware = require('./app/middlewares/sortMiddleware')

const methodOverride = require('method-override')

const helpers = require('./helpers/handlebars')

app.use(sortMiddleware)
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, './public')))
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

// custom middleware

// Connect to DB
db.connect()

// template engineF
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: helpers,
  })
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

//http logger
//  app.use(morgan('combined'))

route(app)

app.listen(port, () => console.log('Server is running on port: ', port))
