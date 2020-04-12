const mongoose = require('mongoose');

const MembersSchema = new mongoose.Schema({
  name:{
    type: String,
    trim: true,
    required:true
  },
  email:{
    type: String,
    required: true
  },
  gender: {
    type: String,
    required:true
  },
  telephone: {
    type: Number,
    required:true,
  },
  memberNo: {
    type: Number,
    required:true,
    unique: true
  },
  HFG: {
    type: String,
    required:true
  },
  address: {
    type: String,
  },
  ministries:{
    type:[String],
    trim: true
  },
  user: {
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Member', MembersSchema);
