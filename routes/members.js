const express = require('express');
const router = express.Router();
const Member = require('../models/Members')

router.get('/', (req, res) => {
  const title = 'BWM MTWAPA'
  res.render('index', {
    title: title
  })
});

//add member
router.get('/member/add',(req, res) => {
  res.render('members/add')
})

router.get('/about', (req, res) => {
  res.render('about')
})
module.exports = router;
