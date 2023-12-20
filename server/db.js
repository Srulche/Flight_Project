const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { PopulateDB } = require('./populate_db')

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI


mongoose.connect(MONGODB_URI).then(async() =>  {
    console.log("Database connected")
    await PopulateDB()
    console.log("Database Populated")

})