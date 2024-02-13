const router = require('express').Router()
const User = require('../models/usersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/authMiddleware')
//Register
router.post('/register' , async(req ,res) => {
    try {
        const existingUser = await User.findOne({email : req.body.email})
        if (existingUser){
            return res.send({
                message : "User already exist",
                success : false,
                data : null
            })
        }
        const hashPassword = await bcrypt.hash(req.body.password ,10)
        req.body.password = hashPassword

        const newUser = new User(req.body)
        await newUser.save()
        res.send({
            message : "User successfully added",
            success : true,
            data : null
        })
    } catch (error) {
        return res.send({
            message : error.message,
            success : false,
            
        })
    }
})
//Login
router.post('/login' , async (req,res) => {
    try {
        const userExist = await User.findOne({email : req.body.email})
        if (!userExist){
          return  res.send({
            message : "User doesnot Exist",
            success : false,
            data : null
          })
        }
        const passwordMatch = await bcrypt.compare(
            req.body.password,
            userExist.password
        )
        if(!passwordMatch){
            return  res.send({
                message : "Incorrect Password",
                success : false,
                data : null
              })
        }
        const token = jwt.sign({userid : userExist._id} , process.env.jwt_secret , {expiresIn: '1d'})
        res.send({
            message : "Login Successfull",
            success : true,
            data : token
          })
    } catch (error) {
        return res.send({
            message : error.message,
            success : false,
            
        })
    }
}) 
//get user by id
router.post("/get-user-by-id" , authMiddleware ,async(req,res) => {
    try {
        const user = await User.findById(req.body.userid)
        res.send({
            message:"User Fetched Successfully",
            success : true,
            data : user
        })
    } catch (error) {
        return res.send({
            message : error.message,
            success : false,
            
        })
    }
})
router.post("/get-single-user" , authMiddleware ,async(req,res) => {
    try {
        
        const user = await User.findById(req.body.userid)
        
        res.send({
            message:"User Fetched Successfully",
            success : true,
            data : user
        })
    } catch (error) {
        return res.send({
            message : error.message,
            success : false,
            
        })
    }
})

//Get all Users
router.post('/get-all-users', authMiddleware , async(req,res) => {
    try {
        const users = await User.find()
        res.send({
            message: "Users Fetched Successfully",
            success : true,
            data : users
        })
    } catch (error) {
        res.send({
            message: "Users Fetcheing Unsuccessfull",
            success : false,
        })
    }

})

//Update user permissions
router.post('/update-user-permission', authMiddleware , async(req,res) => {
    try {
        const users = await User.findByIdAndUpdate(req.body._id , req.body)
        res.send({
            message: "Users Permission Updated  Successfully",
            success : true,
            data :users
        })
    } catch (error) {
        res.send({
            message: "Users Fetcheing Unsuccessfull",
            success : false,
        })
    }

})
module.exports = router