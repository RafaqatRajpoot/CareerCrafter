const mongoose = require('mongoose')

const employeeSchema = (
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        category: {
            type: String,
            required: [true, 'Please add a category']
        },
        salary: {
            type: Number,
            default: 100
        },
        address:
        {
            type: String,
            required: [true, 'please add an address'],
        }
    }
)
module.exports = mongoose.model('Employee', employeeSchema)