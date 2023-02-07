const Ad = require('../models/Ad')

exports.getOneHouse = (adId) => Ad.findById(adId)
exports.getAllHouses = () => Ad.find()
exports.getLastAdded = () => Ad.find({}).sort({createdAt: -1})
exports.update = (adId, data) => Ad.findByIdAndUpdate(adId, data, {runValidators: true})
exports.deleteHouse = (houseId) => Ad.findByIdAndDelete(adId, {runValidators: true})
exports.getSearchedbyType = (adId) => Ad.find({}).where('type').equals(`${item}`)
exports.createNewHouse = (data) => Ad.create(data)
