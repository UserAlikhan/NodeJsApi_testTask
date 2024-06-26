import { Router } from "express";
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/tasks.controller.js'
import { validateToken } from '../middleware/validateToken.js'

const tasksRouter = Router()

tasksRouter.get('/', validateToken, getAllTasks)
tasksRouter.get('/:id', validateToken, getTaskById)
tasksRouter.post('/', validateToken, createTask)
tasksRouter.put('/:id', validateToken, updateTask)
tasksRouter.delete('/:id', validateToken, deleteTask)

export default tasksRouter