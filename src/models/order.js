const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    list_product: [

    ],

    address: {
        type: String,
        required: true
    },
    name_costomer_order: {
        type: String,
        required: true,
        trim: true,

    }
    , phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    payment: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    owner: {
        type: String,
        required: true,
        ref: "Costomer"
    }
},
    {
        timestamps: true
    });
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;