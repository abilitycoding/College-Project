const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const Booking = require('../models/bookingsModel')
const Bus = require('../models/busModel')
const stripe = require('stripe')(process.env.secret_key)
const { v4: uuidv4 } = require('uuid');
//Add Booking
router.post('/book-now',authMiddleware ,async(req, res) => {
    try {
        const newBooking = new Booking({
            ...req.body,
            user : req.body.userid
        })
        await newBooking.save();

        const bus  = await Bus.findById(req.body.bus)
        bus.seatsBooked = [...bus.seatsBooked,...req.body.seats]
        await bus.save();
        
        res.send({
            message : "Booking Successfull",
            success: true,
            data : newBooking
        })
        
    } catch (error) {
        res.send({
            message : error.message,
            success : false
        })
    }
})

//Make Payment
router.post('/make-payment' ,authMiddleware ,async(req,res) =>{
    try {
        const {token ,amount}  = req.body;
        console.log(token)
        const customer = await stripe.customers.create({
            email : token.email,
            source : token.id
        });
        const payment = await stripe.paymentIntents.create({
            amount : amount,
            currency : "inr",
            customer : customer.source,
            receipt_email : token.email
        },{
            idempotencyKey : uuidv4()
        })
        if(payment){
            res.send({
                message : "Payment Successful",
                data : {
                    transactionId : token.id
                },
                success : true
            })
        }
        else{
            res.send({
                message : "Payment Failed",
                success : false,
                
            })
        }
    } catch (error) {
        res.send({
            message : "Payment Failed",
            success : false,
            data : error.message
        })
    }
})

router.post('/get-bookings-by-userid' , authMiddleware , async(req ,res) => {
    try {
        const bookings = await Booking.find()
        .populate("user")
        .populate("bus")
        res.send({
            message : "Booking Fetched successfully",
            success : true,
            data : bookings,
            id : req.body.userid
        })
    } catch (error) {
        res.send({
            message : "Booking Fetched Failed",
            success : false,
            data: error
           
        })
    }
})

module.exports = router