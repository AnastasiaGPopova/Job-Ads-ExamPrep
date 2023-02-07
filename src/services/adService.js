const Ad = require('../models/Ad')

exports.getOneAd = (adId) => Ad.findById(adId)
exports.getAllAds = () => Ad.find()
exports.getfirstAdded = () => Ad.find({}).sort({createdAt: 1})
exports.update = (adId, data) => Ad.findByIdAndUpdate(adId, data, {runValidators: true})
exports.deleteAd = (adId) => Ad.findByIdAndDelete(adId, {runValidators: true})
exports.getSearchedbyType = (item) => Ad.find({}).where(author.email).equals(`${item}`)
exports.createNewAd = (data) => Ad.create(data)
