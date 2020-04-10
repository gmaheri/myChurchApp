const express = require('express');
const router = express.Router();

//User login
router.get('/login', (req, res) => {
  res.send('login')
});

router.get('/register', (req, res) => {
  res.send('register')
})


module.exports = router;
