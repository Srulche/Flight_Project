const { decodeToken, createResponse } = require("../utils")


function authMiddleware(req, res, next) {

    try {
        const auth_header = req.headers['Authorization'] || req.headers['authorization'] 
        const token = auth_header.split("Bearer ")[1]

        /** @type {{id: string, is_admin:boolean} | null}  */
        const decoded = decodeToken(token)
        req.user = decoded
        next()
    } catch(e) {
        return res.status(401).json(createResponse(null, 401, e))
    }
}

module.exports = authMiddleware