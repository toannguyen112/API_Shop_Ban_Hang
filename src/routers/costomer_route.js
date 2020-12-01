const express = require('express');
const auth_admin = require('../middleware/auth_admin');
const auth_costomer = require('../middleware/auth_costomer');
const router = express.Router();
const Costomer = require('../models/costomer');


// dang ky costomer 

router.post('/costomer/dangky', async (req, res) => {
    console.log(req.body);
    const costomer = new Costomer(req.body);
    try {
        await costomer.save();
        const token = await costomer.generateAuthCostomerToken();
        res.status(200).send({ costomer, token });
    } catch (error) {
        res.status(400).send();
    }
});
// dang nhap
router.post('/costomer/dangnhap', async (req, res) => {
    try {
        const costomer = await Costomer.findByCredentialsCostomer(req.body.email, req.body.password);
        const token = await costomer.generateAuthCostomerToken();
        res.status(200).send({ costomer, token });
    } catch (error) {
        res.status(400).send();
    }
})

// dang xuat 
router.post('/costomer/dangxuat', auth_costomer, async (req, res) => {
    try {
        req.costomer.tokens = req.costomer.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.costomer.save();
        res.send(" costomer logout success");

    } catch (error) {
        res.status(500).send();
    }
})


// get all list costomer 
router.get("/costomer", auth_admin, async (req, res) => {
    const listCostomer = await Costomer.find({});
    res.status(200).send(listCostomer);
})

module.exports = router;
