const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    image:{
        type:String,
        required:true,
    },
    quantity:{
        type :Number ,
        default :1
    }
});

const CartItem = mongoose.model('CartItem', cartSchema); // Change model name to CartItem

module.exports = CartItem;
