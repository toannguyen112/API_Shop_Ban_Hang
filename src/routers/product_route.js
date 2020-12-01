const express = require("express");
const Product = require("../models/product");
const auth_admin = require("../middleware/auth_admin");
const auth_costomer = require("../middleware/auth_costomer");
const Cart = require("../models/cart");
const router = express.Router();

// get list products
router.get("/products", async (req, res) => {
    const products = await Product.find({}).select(
        "image name price hidden categories description status"
    );
    res.status(200).send(products);
});

// create new  products
router.post("/products", auth_admin, async (req, res) => {
    const product = new Product({ ...req.body, creator: req.admin._id });
    await product.save();
    res.status(200).send(product);
});

// xoa product
router.delete("/products/:id", auth_admin, async (req, res) => {
    const productId = req.params.id;
    try {
        const proudct = await Product.findOneAndDelete({
            _id: productId,
            creator: req.admin._id,
        });
        if (!proudct) {
            return res.status(404).send();
        }
        res.status(200).send(proudct);
    } catch (error) {
        res.status(500).send();
    }
});

router.delete("/products", auth_admin, async (req, res) => {
    await Product.deleteMany({});
    res.status(200).send();
});

// update product
router.patch("/products/:id", auth_admin, async (req, res) => {
    const updates = Object.keys(req.body);
    const alowedUpdates = [
        "name",
        "quantity",
        "price",
        "description",
        "categories",
        "image",
    ];
    const isValidOperation = updates.every((update) => {
        return alowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invaid updates" });
    }

    try {
        const product = await Product.findOne({
            _id: req.params.id,
            creator: req.admin._id,
        });
        if (!product) {
            res.status(404).send();
        }

        updates.forEach((update) => {
            product[update] = req.body[update];
        });

        await product.save();
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send();
    }
});

// get detail product

router.get("/products/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        const productItem = await Product.findOne({ _id: productId });
        if (!productItem) {
            return res.status(400).send();
        }

        res.status(200).send(productItem);
    } catch (error) {
        res.status(500).send();
    }
});

// them gio hang costomer

module.exports = router;
