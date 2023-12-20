
const fsController = require('../controllers/flightsController')
const authMiddleware = require('../middleware/authMiddaleware')
const { createResponse } = require('../utils')
const express = require('express'),
router = express.Router()



// POST /flights/book
// BODY: [BookedFlightScheme]

router.post("/book", authMiddleware, async (req, res) => {
    try {
        const bookedFlight = await fsController.bookFlight(req.user, req.body);
        res.status(201).json(createResponse("Book Flight Sucess", 201, bookedFlight))
    } catch(e) {
        console.log(e)
        res.status(500).json(createResponse(e.message, 500, null))
    }
})

// GET /flights/search
// QUERIES : [departure: string, arrival: string, date:string]
router.get("/search", authMiddleware, async (req,res) => {
    const departure = req.query.departure
    const arrival = req.query.arrival
    const date = req.query.date
  
    try {
     const results = await fsController.search({
        departure,
        arrival,
        date
     })
        res.status(200).json(createResponse("Flight results", 200, results))
    } catch(e) {
        res.status(500).json(createResponse(e.message, 500, null))
    }
})



module.exports = router