const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')

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
app.use(methodOverride('_method'))

//routes
app.use('/mychurch', require('./routes/members')); //home route
app.use('/mychurch/member/add', require('./routes/members')); //add member route
app.use('/mychurch/member/edit/:id', require('./routes/members')); //edit member route
app.use('/mychurch/member/delete/:id', require('./routes/members')); //delete member route
app.use('/mychurch/allmembers', require('./routes/members')); //view all member route
app.use('/mychurch/about', require('./routes/members')); //About route

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`)
})


