import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

// Middleware Method that verifies the token and grant permission 
// only if the token is valid
export const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ message: 'Missing authorization header' })
        }

        const token = authHeader.split(' ')[1]
        const decode = jwt.decode(token, process.env.JWT_SECTER)

        const user = await new PrismaClient().users.findUnique({
            where: {
                id: decode.id
            }
        })

        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        req.user = user
        next()
    } catch (err) {
        res.status(401).json({ message: 'Invalid token', error: err.message })
    }
}