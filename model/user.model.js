const mongoose = require('mongoose')

const User = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    authority: {type: String, required: true},
    mobileNo: {type: String, required: true},
    emailID: {type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model(`User`, User)