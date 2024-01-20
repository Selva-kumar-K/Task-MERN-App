const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')
const getTasks = asyncHandler(async(req,res) => {

    const tasks = await Task.find()
    res.status(200).json(tasks)
})

const setTask = asyncHandler(async(req,res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please enter the task')
    }

    const task = await Task.create({text : req.body.text})
    res.status(201).json(task)
})

const updateTask = asyncHandler(async(req,res) => {
    const {id} = req.params
    const findId = await Task.findById(id)
    if (!findId){
        res.status(400)
        throw new Error('Task not found')
    }

    const task = await Task.findByIdAndUpdate(id, {text : req.body.text}, {new : true})
    res.status(200).json(task)
})

const deleteTask = asyncHandler(async(req,res) => {

    const findId = await Task.findById(req.params.id)
    if(!findId) {
        res.status(400)
        throw new Error('Task not found')
    }
    await Task.findByIdAndDelete(req.params.id)
    res.status(200).json({id : `${req.params.id} is deleted`})
})



module.exports = {getTasks, setTask, updateTask, deleteTask}