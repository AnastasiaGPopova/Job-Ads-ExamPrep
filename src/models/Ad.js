const mongoose = require('mongoose')

const adSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true,
        minLength: [4, "Too short! Headline should be at least 4 characters !"]
    }, 
    location: {
        type: String,
        required: true,
        //enum: { values:["Apartment", "Villa", "House"], message:'Type field can be only “Apartment”, “Villa” or “House” !'}
       minLength: [8, "Too short! Location should be at least 8 characters !"]
    },
    name: {
        type: String,
        required: true,
        minLength: [3, "Too short! Name should be at least 3 characters !"]
       // max: 2021
        //maxLength: [15, "Too long! Location should be 15 characters !"]
    },
    description: {
        type: String,
        required: true,
        maxLength: [40, "Too long! Description max 40 characters !"]
    
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    usersApplied:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
    
    // createdAt: {
    //     type: Date, default: Date.now
    // },
}, { timestamps: true })

const Ad = mongoose.model('Ad', adSchema)
module.exports = Ad