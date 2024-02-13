const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)

const db = mongoose.connection;

db.on("connected" , () => {
    console.log("MongoDB SuccessFully connected")
})

db.on("error" , () => {
    console.log("MongoDB not connected")
})