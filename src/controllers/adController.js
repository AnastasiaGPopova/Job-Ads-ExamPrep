const Ad = require('../models/Ad.js')
const User = require('../models/User')
const adService = require('../services/adService')
const adUtility = require('../utils/adUtility')
const parser = require('../utils/parser')



exports.getAdCreationPage = (req,res) => {
    res.render('create')
}

exports.postCreatedAd = async (req, res) => {
 const {headline, location, name, description } = req.body

    try{
        if(!headline || !location || !name || !description){
            throw new Error ("All fields are requiered!")
        }
        const newHouse = await adService.createNewAd({headline, location, name, description, author: req.user._id})//encoded body-to, which we receive, will create a new cube
        //redirect
        res.redirect('/')

    } catch(error){
        const errors = parser.parseError(error)
        res.render('create', {errors})
    }

}

exports.getDetails = async (req, res) => {

    let currentAd = await adService.getOneAd(req.params.adId)//it makes a request to the DB and gives us back all accessories with all details and infos/not only the ID/
                                       .populate('usersApplied') 
                                       .populate('author')         
                                       .lean()

     if(!currentAd){
    return res.redirect('/404')
      }

let appliedBy = currentAd.usersApplied

let thereIsCandidates = true
if(appliedBy.length == 0){
    thereIsCandidates = false
}

let isLogged = false

if(req.user){
    isLogged = true
    const isOwner = adUtility.isAdOwner(req.user, currentAd)
    const isAppliedByCurrentUser= await adUtility.isApplied(req.user._id, req.params.adId)

    res.render('details', {currentAd, isOwner, isAppliedByCurrentUser, appliedBy, thereIsCandidates, isLogged})

} else {
    res.render('details', {currentAd, isLogged})
}
}

exports.apply = async (req,res) =>{
    const currentAd = await adService.getOneAd(req.params.adId)
    const isOwner = adUtility.isAdOwner(req.user, currentAd)

    if(isOwner){
        res.redirect('/')
    } else {
        currentAd.usersApplied.push(req.user._id)
    await currentAd.save()
    res.redirect(`/${req.params.adId}/details`)
    }

}


exports.getEditPage = async (req,res) => {
    const currentAd = await adService.getOneAd(req.params.adId).populate('author').lean()
    const isOwner = adUtility.isAdOwner(req.user, currentAd)

    if(!isOwner){
        res.redirect('/')
    } else {
        res.render('edit', {currentAd})
    }
}



exports.postEditedAd = async (req,res) => {
    const {headline, location, name, description } = req.body

    try{
        if(!headline || !location || !name || !description){
            throw new Error ("All fields are requiered!")
        }
        const updatedAd = await adService.update(req.params.adId,  {headline, location, name, description } )//encoded body-to, which we receive, will create a new cube

        res.redirect(`/${req.params.adId}/details`)

    } catch(error){
        const errors = parser.parseError(error)
        res.render(`edit`, {errors})
    }
}


exports.getDeleteAd= async (req, res) => {
    const ad = await adService.getOneAd(req.params.adId).populate('author').lean()
    const isOwner = adUtility.isAdOwner(req.user, ad)

    if(!isOwner){
        res.redirect('/')
    } else {
   const test = await adService.deleteAd(req.params.adId)
   res.redirect('/')
    }
}

exports.getSearchPage = async (req,res) => {

    let isSearched = false
    res.render('search', {isSearched})
}

exports.getSearchPagewithResults = async (req, res) => {
    let isSearched = true
    const {searchedItem} = req.body

    const allAds = await adService.getAllAds().populate('author').lean()
    const matches = allAds.filter(x => x.author.email == searchedItem)

    res.render('search', {matches, isSearched})
}