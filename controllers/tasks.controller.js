import { PrismaClient } from "@prisma/client";

const tasksClient = new PrismaClient().tasks

// get All User`s Tasks
export const getAllTasks = async (req, res) => {
    try {
        const userCredentials = req.user

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

// get User`s Task By Id
export const getTaskById = async (req, res) => {
    try {
        const userCredentials = req.user
        const taskId = req.params.id
        
        const task = await tasksClient.findUnique({
            where: {
                id: taskId,
                user: {
                    id: userCredentials.id
                }
            }
        })

        res.status(200).json({ data: task })
    } catch (err) {
        console.log(err)
    }
}

// createTask
export const createTask = async (req, res) => {
    try {
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

// update User`s Task
export const updateTask = async (req, res) => {
    try {
        const userCredentials = req.user
        const taskId = req.params.id
        const taskData = req.body

        const task = await tasksClient.update({
            where: {
                id: taskId,
                user: {
                    id: userCredentials.id
                }
            },
            data: {
                ...taskData,
                userId: userCredentials.id
            }
        })

        res.status(201).json({ data: task })
    } catch (err) {
        console.log(err)
    }
}

// delete User`s Task
export const deleteTask = async (req, res) => {
    try {
        const userCredentials = req.user
        const taskId = req.params.id

        const task = await tasksClient.delete({
            where: {
                id: taskId,
                user: {
                    id: userCredentials.id
                }
            }
        })

        res.status(201).json({ data: task })
    } catch (err) {
        console.log(err)
    }
}