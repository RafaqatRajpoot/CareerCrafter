const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
;
// Register an Admin
// Route : /api/admins
// Request : POST
const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields')
    }
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
        res.status(400);
        throw new Error('Admin Already Exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({
        name, email,
        password: hashedPassword,
    })

    if (admin) {
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
        })
    }
    res.status(400)
    throw new Error('Invalid Admin Data');
})

// Athunticate an Admin
// Route : /api/admins/login  
// Request : POST
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please enter email and password')
    }
    const admin = await Admin.findOne({ email });
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (admin && isPasswordMatch) {
        res.status(200).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            taken: generateToken(admin._id)
        })
    }

    res.status(400)
    throw new Error('Invalid Admin Credintals');
})


// GET Admin
// Route : /api/admins/me  
// Request : GET
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await Admin.findById(req.admin.id);
    res.status(200).json({
        id: _id, name, email
    })
})


// Generate Json Web Token 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d', })
}


module.exports =
{
    registerAdmin,
    loginAdmin, getMe
}