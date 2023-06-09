const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: String,
    description : String,
    category : String,
    image: String,
    postedAt:Date,
    location:String,
    price : Number
})

const ShoppingModel=mongoose.model('shopping',Schema);

module.exports={ShoppingModel}