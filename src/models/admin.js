const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    email: {
        type: String, required: true, trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 2,


    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],

},
    {
        timestamps: true,
    });



// tim kiem admin 
adminSchema.statics.findByCredentialsAdmin = async (email, password) => {
    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new Error("Không tìm thấy tài khoản");
    }
    const isMatch = await bcypt.compare(password, admin.password);
    if (!isMatch) {
        throw new Error('Mật khẩu không hợp lệ');
    }
    console.log(admin);
    return admin;


};


// khong hien thi pass va tokens 
adminSchema.methods.toJSON = function () {
    const admin = this;
    const adminObject = admin.toObject();
    delete adminObject.password;
    delete adminObject.tokens;
    return adminObject;
};

// hash password trc khi save 
adminSchema.pre("save", async function (next) {
    const admin = this;
    if (admin.isModified('password')) {
        admin.password = await bcypt.hash(admin.password, 8);
    }
    next();
});


// tao token admin 
adminSchema.methods.generateAuthAdminToken = async function () {
    const admin = this;
    const token = jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET_ADMIN);
    admin.tokens = admin.tokens.concat({ token });
    await admin.save();
    return token;
}
const Admin = mongoose.model('Admin', adminSchema);


module.exports = Admin;