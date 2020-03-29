const express = require('express');
const router = express.Router();
const Member = require('../models/Members')

//home route
router.get('/', (req, res) => {
  const title = 'BWM MTWAPA'
  res.render('index', {
    title: title
  })
});

//add a member
router.get('/member/add',(req, res) => {
  res.render('members/add')
});

//Process form for adding a member
router.post('/allmembers',(req, res) => {
 const newMember = {
   name: req.body.name,
   email: req.body.email,
   gender: req.body.gender,
   telephone: req.body.telephone,
   memberNo: req.body.memberNo,
   HFG: req.body.HFG,
   address: req.body.address,
   ministries: req.body.ministries,
   photo: req.body.photo
 };
 new Member(newMember)
 .save()
 .then(member => {
    res.redirect('/mychurch/allmembers')
 })
 .catch(error => {
   console.error(error);
   let errors = [];
   if(error.code === 11000){
     errors.push({text: 'Membership Number already exists.'})
   };
   if(errors.length > 0){                       //a bug that displays --> /allmembers instead of  --> /member/add
     res.render('members/add', {
        errors:errors,
     });
   }
 })
});

//view all members
router.get('/allmembers', (req, res) => {
  Member.find({}).lean()
  .sort({date:'desc'})
  .then(members => {
    res.render('members/allmembers', {
      members: members
    });
  })
  .catch(error => {
    console.error(error)
  });
});

//View About page
router.get('/about', (req, res) => {
  res.render('about')
});

module.exports = router;
