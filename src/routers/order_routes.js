const express = require("express");
const auth_admin = require("../middleware/auth_admin");
const Order = require("../models/order");
const Cart = require("../models/cart");
const auth_costomer = require("../middleware/auth_costomer");

const router = express.Router();

// add order
router.post("/order", auth_costomer, async (req, res) => {
    const reqOrder = req.body;
    try {
        const cart = await Cart.find({});
        if (!cart.length) {
            return res.status(404).send("No Products In Cart");
        }
        const order = new Order({
            ...reqOrder,
            list_product: cart,
            owner: req.costomer._id,
        });
        await order.save();
        await Cart.deleteMany({});
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send();
    }
});

// get order costomer
router.get("/order/costomer", auth_costomer, async (req, res) => {
    const listOrderCostomer = await Order.find({});
    res.status(200).send(listOrderCostomer);
});

// get all list order
router.get("/order", auth_admin, async (req, res) => {
    const orderList = await Order.find({});
    res.status(200).send(orderList);
});

// delete all order

router.delete("/order", auth_admin, async (req, res) => {
    await Order.remove({});
    res.status(200).send("Delete Orders Success");
});

// delete  order item
router.delete("/order/:id", auth_admin, async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send();
    }
});

// update active

router.put("/order/:id", auth_admin, async (req, res) => {
    const activeOrder = req.body.active;
    const orderId = req.params.id;
    console.log(activeOrder);
    console.log(orderId);

    const order = await Order.findByIdAndUpdate(
        { _id: orderId },
        { active: activeOrder }
    );
    order.save();
    res.status(200).send(order);
});

module.exports = router;
