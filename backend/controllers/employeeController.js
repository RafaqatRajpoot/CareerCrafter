const asyncHandler = require('express-async-handler')
const Employee = require('../models/employeeModel')


// Route : /api/employees  
// Request : GET
// get all employees
const getEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find()
    res.status(200).json(employees)
})

// Route : /api/employees
// Request : POST
// add employee
const setEmployee = asyncHandler(async (req, res) => {
    if (!req.body.name && !req.body.email && !req.body.address && !req.body.category) {
        res.status(400)
        throw new Error('Invalid Employee Details')
    }
    const employee = await Employee.create({
        name: req.body.name,
        email: req.body.email,
        category: req.body.category,
        salary: parseInt(req.body.salary),
        address: req.body.address
    })

    res.status(200).json(employee)
})


// Route : /api/employees/id
// Request : PUT
// Edit Employee
const updateEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id)
    if (!employee) {
        res.status(400)
        throw new Erroe('Employee not Found')
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedEmployee)
})

// Route : /api/employees/id  
// Request : DELETE
// delete Employee
const deleteEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id)
    if (!employee) {
        res.status(400)
        throw new Erroe('Employee not Found')
    }

    await Employee.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getEmployees, setEmployee, updateEmployee, deleteEmployee
}