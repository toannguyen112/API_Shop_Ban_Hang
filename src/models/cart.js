const mongoose = require('mongoose');
const cartShema = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String, required: true
    },
    amount: {
        type: Number,
        required: true
    },
    owner: mongoose.Schema.Types.ObjectId

}, {
    timestamps: true
}, {
    _id: false
});

cartShema.methods.increaseAmountProduct = async function () {
    const cart = this;
    cart.amount++;
    cart.save();
    return cart;
};

const Cart = mongoose.model('Cart', cartShema);
module.exports = Cart;