const mongoose = require('mongoose');

const MembersSchema = new mongoose.Schema({
  name:{
    type: String,
    trim: true,
    required:[true, 'Please enter members names']
  },
  gender: {
    type: String,
    required:[true, 'Gender field cannot be empty']
  },
  memberNo: {
    type: Number,
    required:[true, 'please eneter member no'],
    unique: true,
  },
  telephone: {
    type: Number,
    required:[true, 'please enter phone number']
  },
  ministries:{
    type:[String],
    trim: true
  },
  dateJoined:{
    type: Date,
    default: Date.now
  },
  email:{
    type: String,
    required: true
  },
  maritalStatus:{
    type: String,
  },
  address: {
    type: String,
  },
  familyMembers:{
    type:[String]
  },
  HFG: {
    type: String
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Member', MembersSchema);
