const jwt = require('jsonwebtoken');
const Costomer = require('../models/costomer');
const auth_costomer = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", ''); // token req

        const decoded = jwt.verify(token, process.env.JWT_SECRET_COSTOMER);
        const costomer = await Costomer.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!costomer) {
            throw new Error("Not found  Costomer");
        }
        req.token = token;
        req.costomer = costomer;

        next();
    } catch (error) {
        res.status(401).send({ err: "Please authenticate costomer" });
    }


}

module.exports = auth_costomer;
