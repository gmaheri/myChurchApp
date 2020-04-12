const express = require('express');
const router = express.Router();
const Member = require('../models/Members');
const {ensureAuthenticated} = require('../helpers/auth')

//home route
router.get('/', (req, res) => {
  const title = 'BWM MTWAPA'
  res.render('index', {
    title: title
  })
});

//add a member
router.get('/member/add', ensureAuthenticated, (req, res) => {
  res.render('members/add')
});

//Process form for adding a member
router.post('/allmembers',(req, res) => {
 const newMember = {
   name: req.body.name,
   email: req.body.email,
   gender: req.body.gender,
   telephone: req.body.telephone,
   memberNo: req.body.memberNo, //when a users enter a string throw an error
   HFG: req.body.HFG,
   address: req.body.address,
   ministries: req.body.ministries,
   photo: req.body.photo,
   user: req.user.id
 };
 new Member(newMember)
 .save()
 .then(member => {
   req.flash('success_msg', 'Member added successfully!')
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
router.get('/allmembers', ensureAuthenticated, (req, res) => {
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

//Edit Member page
router.get('/member/edit/:id',ensureAuthenticated, (req, res) => {
  Member.findOne({_id: req.params.id}).lean()
  .then(member => {
    res.render('members/editmember', {
      member: member
    });
  })
});

//Updating a member
router.put('/member/edit/:id', ensureAuthenticated, (req, res) => {
  Member.findOne({_id: req.params.id})
  .then(member => {
    //set new values
    member.name = req.body.name;
    member.email = req.body.email;
    member.gender = req.body.gender;
    member.telephone = req.body.telephone;
    member.memberNo = req.body.memberNo;
    member.address = req.body.address;
    member.HFG = req.body.HFG;
    member.ministries = req.body.ministries;

    member.save()
    .then(member => {
      req.flash('success_msg', 'Member updated successfully!')
      res.redirect('members/allmembers')
      //implement a code where if the users (while edting the existing record) enters the same memberNo as the one exisitng in the DB, throw an error.
    })
  })
  .catch(error => {
    console.error(error);
  });
});

//Delete a Member
router.get('/member/delete/:id', ensureAuthenticated, (req, res) => {
  Member.deleteOne({_id: req.params.id})
  .then(() => {
    req.flash('success_msg', 'Member has been deleted succesfully!')
    res.redirect('members/allmembers')
  })
  .catch(error => {
    console.log(error)
  })
})

//View About page
router.get('/about', (req, res) => {
  res.render('about')
});

module.exports = router;
