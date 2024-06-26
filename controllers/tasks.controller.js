import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";

const tasksClient = new PrismaClient().tasks

// The logic of get All User`s Tasks Endpoint
export const getAllTasks = async (req, res) => {
    try {
        const userCredentials = req.user

        // All Tasks That the User has
        const allTasks = await tasksClient.findMany({
            where: {
                user: {
                    id: userCredentials.id
                }
            }
        })

        res.status(200).json({ data: allTasks })
    } catch (err) {
        console.log(err)
    }
}

// The logic of get User`s Task By Id Endpoint
export const getTaskById = async (req, res) => {
    try {
        const userCredentials = req.user
        const taskId = parseInt(req.params.id)
        
        const task = await tasksClient.findUnique({
            where: {
                id: taskId,
                user: {
                    id: parseInt(userCredentials.id)
                }
            }
        })

        res.status(200).json({ data: task })
    } catch (err) {
        console.log(err)
    }
}

// The logic of createTask Endpoint
export const createTask = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json(errors)
        }

        const userCredentials = req.user
        const taskData = req.body

        const task = await tasksClient.create({
            data: {
                ...taskData,
                created_at: new Date(taskData.created_at).toISOString(),
                updated_at: new Date(taskData.updated_at).toISOString(),
                userId: userCredentials.id
            }
        })

        res.status(201).json({ data: task })
    } catch (err) {
        console.log(err)
    }
}

// The logic of update User`s Task Endpoint
export const updateTask = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json(errors)
        }
        
        const userCredentials = req.user
        const taskId = parseInt(req.params.id)
        const taskData = req.body

        const task = await tasksClient.update({
            where: {
                id: taskId,
                user: {
                    id: parseInt(userCredentials.id)
                }
            },
            data: {
                ...taskData,
                created_at: new Date(taskData.created_at).toISOString(),
                updated_at: new Date(taskData.updated_at).toISOString(),
                userId: parseInt(userCredentials.id)
            }
        })

        res.status(201).json({ data: task })
    } catch (err) {
        console.log(err)
    }
}

// The logic of delete User`s Task Endpoint
export const deleteTask = async (req, res) => {
    try {
        const userCredentials = req.user
        const taskId = parseInt(req.params.id)

        const task = await tasksClient.delete({
            where: {
                id: taskId,
                user: {
                    id: parseInt(userCredentials.id)
                }
            }
        })

        res.status(201).json({ data: task })
    } catch (err) {
        console.log(err)
    }
}