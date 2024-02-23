const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middlewares/errorMiddleWare')
const connectDB = require('./config/db')

port = process.env.PORT || 8000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));
app.use(errorHandler)

app.listen(port, () => {
    console.log(`server start running on port ${port}`)
})