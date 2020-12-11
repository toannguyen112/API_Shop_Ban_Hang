const mongoose = require("mongoose");
const cartShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        product_image: {
            type: String,
            require: true,
        },
        price: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        owner: mongoose.Schema.Types.ObjectId,
    },
    {
        timestamps: true,
    },

);

cartShema.methods.increaseAmountProduct = async function () {
    const cart = this;
    cart.amount++;
    cart.save();
    return cart;
};

const Cart = mongoose.model("Cart", cartShema);
module.exports = Cart;
