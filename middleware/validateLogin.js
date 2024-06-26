import bcrypt from 'bcryptjs'
import { PrismaClient } from "@prisma/client";

// Middleware method for authorization
export const validateLogin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await new PrismaClient().users.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}