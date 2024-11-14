const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    FirstName : {
        type: String,
        required:true
    },
    LastName : {
        type: String,
        required:true
    },
    EmailAddress : {
        type: String,
        required:true,
        unique:true
    },
    Password : {
        type: String,
        required:true
    },
    PhoneNumber : {
        type: String,
        required:true
    }
})

const users = mongoose.model("users", userSchema)

module.exports = users