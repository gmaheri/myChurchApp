const express = require('express');
const router = express.Router();

//User login
router.get('/login', (req, res) => {
  res.render('users/login')
});

router.get('/register', (req, res) => {
  res.render('users/register')
})


module.exports = router;
