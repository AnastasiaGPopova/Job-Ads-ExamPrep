//const Post = require('../models/Post.js')
const User = require('../models/User')
const { all } = require('../routes')
const adService = require('../services/adService')


exports.getHomePage = async (req, res) => {
        const sortedJobs = await adService.getfirstAdded().populate('usersApplied').lean()
        const first3jobs = sortedJobs.slice(0,3)
        res.render('home', {first3jobs})
}


exports.getAllAds = async (req, res) => {
        const allAds = await adService.getAllAds().lean()
        res.render('all-ads', {allAds})
}
// exports.getProfilePage = async (req,res) => {
//     const currentUser = await User.findById(req.user._id).lean()
//     const bookedHotels = await Hotel.find({bookedByUsers: req.user._id}).lean()
//     const hotels = bookedHotels.map(h => h.name)

//     res.render('auth/profile', { currentUser, hotels })

// }

// exports.getAboutPage = (req,res) => {
//     res.render('about')
// }

exports.getErrorPage404 = (req, res) => {
    res.render('404')
}