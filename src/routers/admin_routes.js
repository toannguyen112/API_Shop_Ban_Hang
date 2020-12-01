const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const auth_admin = require('../middleware/auth_admin');

// dang ky admin
router.post('/admin/dangky', async (req, res) => {
    const admin = new Admin(req.body);
    try {
        await admin.save();
        // create token for admin
        const token = await admin.generateAuthAdminToken();
        res.status(200).send({ admin, token });
    } catch (error) {
        res.status(400).send(error);
    }
})


// dang nhap 
router.post('/admin/dangnhap', async (req, res) => {

    try {

        const admin = await Admin.findByCredentialsAdmin(req.body.email, req.body.password);
        const token = await admin.generateAuthAdminToken();
        res.status(200).send({ admin, token });
    } catch (error) {
        res.status(400).send(error);
    }

})

// xoa admin 
router.delete('/admin', async (req, res) => {
    await req.admin.remove();
    res.send(req.admin);
})
// dang xuat 
router.post('/admin/dangxuat', auth_admin, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.admin.save();
        res.send(" admin logout success");
    } catch (error) {
        res.status(500).send();
    }
})

// lay danh sach admin 
router.get('/admin', auth_admin, async (req, res) => {
    try {
        const admin = await Admin.find({});
        res.status(200).send(admin);
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router;