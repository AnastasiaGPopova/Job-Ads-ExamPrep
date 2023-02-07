const authService = require('../services/authService.js')
const parser = require('../utils/parser.js')

exports.loginPage = (req,res) => {
    res.render('auth/login')
}

exports.registerPage = (req,res) => {
    res.render('auth/register')
}

exports.postRegisterUser = async (req, res) => {
    const {email, password, rePassword, skills} = req.body

    const existingUser = await authService.getUserByEmail(email)
    try{
        if(password !== rePassword) {
            throw new Error ("Passwords do not match!")
        }

        if(password == "" || rePassword == "" || !email || !skills){
            throw new Error ("All fields are requiered!")
        }

        if(existingUser){
            throw new Error("Email is already taken!")
        }

        const token = await authService.register(email, password, skills)
        res.cookie('auth', token, {httpOnly: true})
        res.redirect('/')

    } catch(error){
        const errors = parser.parseError(error)
        res.render('auth/register', {errors})
    }

}

exports.postLoginUser = async (req, res) => {
    const {email, password} = req.body

    const existingUser = await authService.getUserByEmail(email)

    try{
        if(email =="" || password ==""){
            throw new Error ("All fields are requiered!")
        }

        if(!existingUser){ //we call the modell method
            throw new Error ("Invalid email or password!")
         }

        const token = await authService.login(existingUser, password)
        res.cookie('auth', token, {httpOnly: true})
        res.redirect('/')
   
    } catch(error){
        const errors = parser.parseError(error)
        res.render('auth/login', {errors})
    }
}

exports.logout = (req, res) => {
    res.clearCookie("auth");
    res.redirect('/')
}