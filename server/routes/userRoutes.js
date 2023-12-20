
const express = require('express'), router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/authMiddaleware')
const { createResponse } = require('../utils')


router.post("/sign-up", async (req, res) => {
    try {
        const newUser = await userController.signUp(req.body)
        return res.status(201).json(createResponse("Sign up success", 201, newUser))
    } catch(e) {
        return res.status(400).json(createResponse(e.message, 400, e))
    }
})

router.post("/sign-in", async (req, res) => {
    try {
        const access_token = await userController.signIn(req.body)

        return res.status(200).json(createResponse("Sign In Success", 200, { access_token }))
    } catch(e) {
        return res.status(400).json(createResponse(e?.message, 400, e))
    }
})


router.get("/me", auth, 
/** @param {{user: {id: string, is_admin: boolean}}} req  */
async (req, res) => {
    try {
        const user = await userController.me(req.user)
        return res.status(200).json(createResponse("Me", 200, {user}))
    } catch(e) {
        return res.status(400).json(createResponse(e?.message, 400, e))
    }
})

module.exports = router