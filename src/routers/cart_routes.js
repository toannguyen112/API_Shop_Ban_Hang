const express = require('express');
const auth_costomer = require('../middleware/auth_costomer');
const Cart = require('../models/cart');
const router = express.Router();

// add cart 
router.post('/cart/addtocart', auth_costomer, async (req, res) => {
    try {


        const cart = await Cart.findOne({ _id: req.body._id, owner: req.costomer._id }).exec();
        if (!cart) {
            const productCart = new Cart({ ...req.body, owner: req.costomer._id });
            await productCart.save();
            res.status(200).send(productCart);

            return;

        }
        else {
            // tang so luong san pham 
            const cartUpdateAmount = await cart.increaseAmountProduct();
            res.status(200).send({ cartUpdateAmount });

        }
    } catch (error) {
        res.status(500).send();
    }

});

router.get("/cart/costomer", auth_costomer, async (req, res) => {
    try {
        const listCartCostomer = await Cart.find({ owner: req.costomer._id });
        res.status(200).send(listCartCostomer);
    } catch (error) {
        res.status(400).send();
    }
})

// get all cart list 
router.get("/cart", auth_costomer, async (req, res) => {
    const cart = await Cart.find({});
    res.status(200).send(cart);
})

// delete cart item 
router.delete('/cart/:id', auth_costomer, async (req, res) => {
    try {
        const productId = req.params.id;
        const cart = await Cart.findByIdAndDelete({ _id: productId, owner: req.costomer._id });
        if (!cart) {
            return res.status(404).send();
        }
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
})

// delete all cart
router.delete('/cart', auth_costomer, async (req, res) => {
    try {
        const cart = await Cart.remove({});
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
})


module.exports = router;