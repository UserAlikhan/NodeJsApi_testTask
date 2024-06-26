import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// Instance of the Class PrismaClient
const usersClient = new PrismaClient().users;

// The logic of Get All Users Endpoint
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

// The logic of Get Specific User By Id Endpoint
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

// The logic of Get Specific User By Email Endpoint
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

// The logic of Registration Endpoint
export const registration = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json(errors)
        }

        const userData = req.body
        const user = await usersClient.create({
            data: userData
        })

        res.status(201).json({ data: user })
    } catch (err) {
        console.log(err)
    }
}

// The logic of Login Endpoint
export const login = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json(errors)
        }

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