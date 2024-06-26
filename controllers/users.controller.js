import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const usersClient = new PrismaClient().users;

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await usersClient.findMany({
            include: {
                tasks: true
            }
        })

        res.status(200).json({ data: users })
    } catch (err) {
        console.log(err)
    }
}

// Get Specific User By Id
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id
        const users = await usersClient.findUnique({
            where: {
                id: userId
            },
            include: {
                tasks: true
            }
        })

        res.status(200).json({ data: users })
    } catch (err) {
        console.log(err)
    }
}

// Get Specific User By Email
export const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email
        const user = await usersClient.findUnique({
            where: {
                email: email
            },
            include: {
                tasks: true
            }
        })

        res.status(200).json({ data: user })
    } catch (err) {
        console.log(err)
    }
}

// Registrtion
export const registration = async (req, res) => {
    try {
        const userData = req.body
        const user = await usersClient.create({
            data: userData
        })

        res.status(201).json({ data: user })
    } catch (err) {
        console.log(err)
    }
}

// Login
export const login = async (req, res) => {
    try {
        const token = jwt.sign(
            { id: req.user.id, email: req.user.email },
            process.env.JWT_SECTER,
            { expiresIn: '1h' }
        )

        res.status(200).json({  
            message: 'Login successful',
            token,
            user: { id: req.user.id, username: req.user.username }
        })
    } catch (err) {
        console.log(err)
    }
}