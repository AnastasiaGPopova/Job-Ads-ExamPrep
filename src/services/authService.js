const User = require('../models/User.js')
const jwt = require('../lib/jsonwebtoken.js')
const config = require('../configurations/configPorts')


exports.getUserByEmail =  (email) => User.findOne({email})

exports.register = async (email, password, skills) => {
   const newUser = await User.create({email, password, skills})
   const payLoad = {_id: newUser._id, email: newUser.email, skills: newUser.skills}
   const token = await jwt.sign(payLoad, config.SECRET, {expiresIn: '2h'})

   return token

} 

exports.login = async (existingUser, password) => {
   const isValid = await existingUser.validatePassword(password)

   if(!isValid){
      throw new Error("Invalid email or password!")
   }
  
   const payLoad = {_id: existingUser._id, email: existingUser.email, skills: existingUser.skills}
   const token = await jwt.sign(payLoad, config.SECRET, {expiresIn: '2h'})

   return token
}
