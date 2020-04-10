const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

//Load enviroment variables
dotenv.config({path: './config/config.env'});

//connect to DB
connectDB();


//initialize express
const app = express();

//enable cors
app.use(cors());

// Enable body-Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//enable method-overide
app.use(methodOverride('_method'));

//Express sesson middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

//flash
app.use(flash());

//Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

//routes
app.use('/mychurch', require('./routes/members')); //home route
app.use('/mychurch/member/add', require('./routes/members')); //add member route
app.use('/mychurch/member/edit/:id', require('./routes/members')); //edit member route
app.use('/mychurch/member/delete/:id', require('./routes/members')); //delete member route
app.use('/mychurch/allmembers', require('./routes/members')); //view all member route
app.use('/mychurch/about', require('./routes/members')); //About route

//users routes
app.use('/mychurch/user', require('./routes/users'));
// app.use('/mychurch/user/register', require('./routes/users'))


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`)
})


