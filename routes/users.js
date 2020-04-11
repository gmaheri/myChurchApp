const express = require('express');
const router = express.Router();
const User =require('../models/Users');
const bcrypt = require('bcryptjs');
//const passport = require('passport')

//User login
router.get('/login', (req, res) => {
  res.render('users/login')
});

//USer Register
router.get('/register', (req, res) => {
  res.render('users/register')
});

//User Registration Form POST
router.post('/register', (req, res) => {
  let errors = [];

  if(req.body.password != req.body.password2){
    errors.push({text: 'Passwords provided do not match.'})
  };

  if(req.body.password.length < 6){
    errors.push({text: 'Password must be alteast 6 characters.'})
  };

  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    })
  } else{
    User.findOne({email: req.body.email})
    .then(user => {
      if(user){
        req.flash('error_msg', 'Email address already registered.');
        res.redirect('/mychurch/user/register');
      } else{
        const newUser = new User ({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => {
              req.flash('success_msg', `Dear ${user.name}, you are now registered. Please log in.`);
              res.redirect('/mychurch/user/login')
            })
            .catch(error => {
              console.log(error);
              return;
            });
          });
        });
      }
    })
  }
});

module.exports = router;
