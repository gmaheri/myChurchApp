const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors')

//Load enviroment variables
dotenv.config({path: './config/config.env'})

//initialize express
const app = express();

//enable cors
app.use(cors());

//body-Parser
app.use(express.json());

//routes
app.use('/', require('./routes/members'))

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`)
})


