const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const exphbs  = require('express-handlebars');
const connectDB = require('./config/db')

//Load enviroment variables
dotenv.config({path: './config/config.env'});

//connect to DB
connectDB();


//initialize express
const app = express();

//enable cors
app.use(cors());

//body-Parser
app.use(express.json());

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//routes
app.use('/mychurch', require('./routes/members'));
app.use('/mychurch/member/add', require('./routes/members'));
app.use('/mychurch/about', require('./routes/members'));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`)
})


