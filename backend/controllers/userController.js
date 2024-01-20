const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async(req,res)=> {
    const {name, email , password} = req.body

    if (!name || !email || !password){
        res.status(400)
        throw new Error('All fields are mandatory')
    }

    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error('User Exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })

    if (user){
        const token = await jwt.sign({id : user.id}, process.env.JWT_SECRET, {expiresIn: '5d'})
        res.status(201).json({_id : user.id, name: user.name, email : user.email, token: token})
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

const loginUser = asyncHandler(async(req,res)=> {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        const token = await jwt.sign({id : user.id}, process.env.JWT_SECRET, {expiresIn: '5d'})
        res.status(200).json({_id: user.id, name: user.name, email : user.email, token : token})
    }else{
        res.status(400)
        throw new Error('Invalid Data')
    }
})


const getCurrentUser = asyncHandler(async(req,res)=> {
    const {id, name, email} = await User.findById(req.user.id)

    res.status(200).json({_id: id, name, email})
})


module.exports = {registerUser, loginUser, getCurrentUser}