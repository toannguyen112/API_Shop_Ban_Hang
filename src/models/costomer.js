const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcypt = require('bcrypt');

const costomerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,

    },
    phone: Number,
    address: String,
    password: {
        type: String,
        trim: true,
        minlength: 7,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true,
});


costomerSchema.methods.generateAuthCostomerToken = async function () {
    const costomer = this;
    const token = jwt.sign({ _id: costomer._id.toString() }, process.env.JWT_SECRET_COSTOMER);
    costomer.tokens = costomer.tokens.concat({ token });
    await costomer.save();
    return token;

}


costomerSchema.statics.findByCredentialsCostomer = async (email, password) => {
    const costomer = await Costomer.findOne({ email });
    if (!costomer) {
        throw new Error("Không tìm thấy tài khoản costomer");
    }
    const isMatch = await bcypt.compare(password, costomer.password);
    if (!isMatch) {
        throw new Error('Mật khẩu không hợp lệ');
    }
    return costomer;


};
costomerSchema.methods.toJSON = function () {
    const costomer = this;
    const costomerObject = costomer.toObject();
    delete costomerObject.password;
    delete costomerObject.tokens;
    return costomerObject;
};

costomerSchema.pre("save", async function (next) {
    const costomer = this;
    if (costomer.isModified('password')) {
        costomer.password = await bcypt.hash(costomer.password, 8);
    }
    next();
});



const Costomer = mongoose.model('Costomer', costomerSchema);

module.exports = Costomer;