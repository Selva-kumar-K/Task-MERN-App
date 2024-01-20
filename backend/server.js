const express = require('express')
const taskRouter = require('./routes/taskRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./connect/database')
const UserRouter = require('./routes/userRoutes')
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
// app.use(express.urlencoded({extended: false}))

app.use('/api/tasks', taskRouter)
app.use('/api/users', UserRouter)

app.use(errorHandler)


app.listen(PORT, async() => {
    await connectDB()
    console.log(`Server is listening on the port no ${PORT}`)
})

