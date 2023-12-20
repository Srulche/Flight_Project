

const User = require('../models/User')
const { createToken } = require('../utils')



// create a new user with the user object
// throws email already exists exception
async function signUp(user) {
    const existing = await User.findOne({email: user.email})
    if(existing) {
        throw new Error("User already exists with this email")
    }
    const newUser = await User.create(user)
    return newUser
}


async function signIn(user) {
    const existingUser = await User.findOne({email: user.email})
    if(!existingUser) {
        throw new Error(`No such user with email ${user.email}`)
    }
    if(!existingUser.comparePassword(user.password)) {
        throw new Error("Passwords do not match")
    }
    // create token
    const token = createToken({
        id: existingUser._id,
    })

    return token
}


async function me(userPartial) {
    const user = await User.findById(userPartial.id)
    .populate("bookedFlights")
    return user
}


module.exports = {
    signUp,
    signIn,
    me
}