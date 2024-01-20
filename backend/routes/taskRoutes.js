const express  = require('express')
const { getTasks, setTask, updateTask, deleteTask } = require('../controllers/taskControllers')

const taskRouter = express.Router()

taskRouter.get('/', getTasks)

taskRouter.post('/', setTask)

taskRouter.put('/:id', updateTask)

taskRouter.delete('/:id', deleteTask)


module.exports = taskRouter