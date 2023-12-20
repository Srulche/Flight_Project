const BookedFlight = require("./models/BookedFlight");
const User = require("./models/User");

async function PopulateDB() {

    await User.deleteMany({})
    await BookedFlight.deleteMany({})

   await User.create({
        email: "ron@gmail.com",
        password: "123456Aa$",
        fullName: "Ron Rona",
        address: "Makamin 6 moddin",
        dateOfBirth: new Date()
    })
}
module.exports = {
    PopulateDB
}