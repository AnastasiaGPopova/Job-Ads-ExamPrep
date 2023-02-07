//--------Configuring the router /which gets exported at the end----------
const express = require('express')
const Router = express.Router
const router = Router()
// ----------------------------------


//----- importing the controllers----------
const adController = require('./controllers/adController')
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController.js')
const {isAuthenticated} = require('./middlewares/authMiddleware.js')

//-------------------------------------------


router.get('/', homeController.getHomePage)
router.get('/allAds', homeController.getAllAds)


//Login and Register

router.get('/login', authController.loginPage)
router.get('/register', authController.registerPage)
router.post('/register', authController.postRegisterUser)
router.post('/login', authController.postLoginUser)


// Add creation
router.get('/create', isAuthenticated, adController.getAdCreationPage )
router.post('/create', isAuthenticated, adController.postCreatedAd)

//Details Page
router.get('/:adId/details', adController.getDetails)

//apply
router.get('/:adId/apply', isAuthenticated, adController.apply)
// // router.get('/post/:postId/voteDown', isAuthenticated, postController.voteDown)

//Edit page
router.get('/:adId/edit', isAuthenticated, adController.getEditPage)
router.post('/:adId/edit', isAuthenticated, adController.postEditedAd)

//Delete ad
router.get('/:adId/delete', isAuthenticated, adController.getDeleteAd)

//search
router.get('/search', isAuthenticated, adController.getSearchPage)
router.post('/search', isAuthenticated, adController.getSearchPagewithResults)


router.get('/logout', authController.logout)
router.get('*', homeController.getErrorPage404)
router.get('/404', homeController.getErrorPage404)



module.exports = router