const express = require('express')
const router = express.Router()

const { getEmployees, setEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController')
const { protect } = require('../middlewares/authMiddleWare')

router.route('/').get(protect, getEmployees).post(protect, setEmployee)

router.route('/:id').put(protect, updateEmployee).delete(protect, deleteEmployee)

module.exports = router