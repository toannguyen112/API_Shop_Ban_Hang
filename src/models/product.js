const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    price: {
        type: String
        , required: true
    },
    description: {
        type: String
        , required: true
    },
    categories: {
        type: String,
        required: true
    },
    rate: {
        type: String,

    },
    status: {
        type: "String",
        required: true
    },
    hidden: Boolean,
    discount: String,
    image: {
        type: Buffer,
        required: true
    },
    image_producst_detail: [{
        type: String
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Admin"
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;