import jwt from "jsonwebtoken"

function createToken(data) {
    const token = jwt.sign(
        data,
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 * 7 }
    )
    return token
}

function verifyToken(token) {
    const stringifyToken = JSON.stringify(token)
    
    if (stringifyToken) {
        const data = jwt.verify(token, process.env.SECRET)
        return data
    }
    const error = new Error("bad auth token")
    error.statusCode = 401
    throw error
}

export { createToken, verifyToken }