const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
        //minLength: [3, "First name should be at least 3 characters long!"]
    },
    password : {
        type: String,
        required: true,
        minLength: [4, 'Password too short!']
    },
    skills : {
        type: String,
        required: true,
        maxLength: [40, 'Password too long! Description of skills should be max 40 characters!']
    },
    myAds:[{
        type: mongoose.Types.ObjectId,
        ref: 'Ad'
    }]
 })

 userSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
           .then(hash => {
            this.password = hash
            next()
           })
 })

 userSchema.method('validatePassword', function(password){
    return bcrypt.compare(password, this.password) //this.password is the encrypted password. Password is the password that the user is giving
    
})

 const User = mongoose.model('User', userSchema)
 module.exports = User