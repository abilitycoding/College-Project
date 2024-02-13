const router = require('express').Router()
const authMiddleware = require('../middleware/authMiddleware')
const Bus = require('../models/busModel')

//ADD Bus
router.post('/add-bus' ,authMiddleware, async(req ,res) => {
    try {
        const existingBus = await Bus.findOne({number : req.body.number})
        if(existingBus){
            res.send({
                message: "Bus already Exist",
                success : false
            })
        }
        const newBus = new Bus(req.body)
       await newBus.save();
       return res.send({
        message : "Bus added successfully",
        success : true
       })
    } catch (error) {
        res.send({
            message: error.message,
            success : false
        })
    }
})

//Get All Bus
router.post('/get-all-buses',authMiddleware,async (req,res) => {
    try {

        const {userid , ...filters} = req.body
        const buses = await Bus.find(filters);
        console.log(buses); // Log the retrieved buses
        return res.send({
          message: "Bus fetched successfully",
          success: true,
          data: buses
        });
      } catch (error) {
        console.error("Error fetching buses:", error);
        res.send({
          message: error.message,
          success: false
        });
      }
})

//Update Bus
router.post('/update-bus' ,authMiddleware ,async(req ,res) => {
    try {
        await Bus.findByIdAndUpdate(req.body._id ,req.body)
        return res.send({
            message : "Bus Updates successfully",
            success : true,
        })
    } catch (error) {
        res.send({
            message: error.message,
            success : false
        })
    }
})

//GetBus By Id
router.post('/get-bus-by-id',authMiddleware ,async (req,res) => {
    try {
        const bus = await Bus.findById({_id : req.body._id})
        return res.send({
            message : "Bus fetched successfully",
            success : true,
            data : bus
        })
    } catch (error) {
        res.send({
            message: error.message,
            success : false
        })
    }
})

//Delete Bus
router.post('/delete-bus',authMiddleware , async(req ,res) =>{
    try {
        await Bus.findByIdAndDelete(req.body._id)
        return res.send({
            message : "Bus Deleted successfully",
            success : true,
        })
    } catch (error) {
        res.send({
            message: error.message,
            success : false
        })
    }
} )
module.exports = router