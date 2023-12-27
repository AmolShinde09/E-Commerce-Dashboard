const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    company:String,
    userId:String    // find which user added this product
});

module.exports = mongoose.model('products',productSchema);