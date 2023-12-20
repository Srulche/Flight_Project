

const mongoose = require('mongoose')


const BookedFlightSchema = new mongoose.Schema({
    destination: {type:String, required:true},
    flightName: {type:String, required:true},
    departure: {type:String, required:true},
    totalPrice: {type:Number, required:true},
    flightDate: {type:Date, required:true},
    estimatedDurationInHours: {type:Number, required:true},
    numberOfPeople: {type:Number, required:true},
    people:{  adults: {type:Number}, babies: {type:Number} },
    luggage: { count: {type:Number},averageWeight:{type:Number} },
    //luggage: { count: {type:Number} },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users"  }
})

const BookedFlight = mongoose.model("bookedFlights", BookedFlightSchema)

module.exports = BookedFlight

