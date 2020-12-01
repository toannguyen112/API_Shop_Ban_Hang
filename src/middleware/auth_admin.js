const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const auth_admin = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", ''); // token req
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!admin) {
            throw new Error();
        }
        req.token = token;
        req.admin = admin;

        next();
    } catch (error) {
        res.status(401).send({ err: "Please authenticate admin" });
    }


}

module.exports = auth_admin;
