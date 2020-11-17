require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')
const methodOverride = require('method-override')

//  setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//setup method override
app.use(methodOverride('_method'))

// body parser middleware (this makes req.body work)
app.use(express.urlencoded({extended: false}))

// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware
app.use(flash())

// CUSTOM MIDDLEWARE
app.use((req, res, next)=>{
    // before every route, attach the flash messsages and current user to res.locals
    // this will give us access to these values in all our ejs pages
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() // move on to the next piece of middleware
})

// use controllers
app.use('/auth', require('./controllers/auth.js'))
app.use('/favorites', require('./controllers/favorites'))
app.use('/comments', require('./controllers/comments'))

// use for styling
app.use(express.static(__dirname + '/public'))
app.use(express.static('public'))

app.get('/', isLoggedIn, (req, res) => {
    const jokeUrl = 'https://official-joke-api.appspot.com/random_joke'
    axios.get(jokeUrl)
        .then(response => {
            const joke = response.data
            res.render('home', {joke: joke})
        console.log('ccccccccccc', response.data)
    })
})

app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

app.listen(process.env.PORT, ()=>{
    console.log(`you're listening to the spooky sounds of port ${process.env.PORT}`)
})