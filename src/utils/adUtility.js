const Ad = require('../models/Ad.js')
exports.isAdOwner = (user, ad) => {
    let isOwner = false
    if(user){
        if(user._id == ad.author._id){
            isOwner = true
        }
    }
   return isOwner
}



exports.isApplied = async (userId, adId) => {
    let isApplied = false
    const ad = await Ad.findById(adId)
    //TO DO
    const applied = ad.usersApplied.find(x=> x == userId )

    if(applied){
        isApplied = true
    }
    return isApplied
}