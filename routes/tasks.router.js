import { Router } from "express";
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/tasks.controller.js'
import { validateToken } from '../middleware/validateToken.js'
import { check } from "express-validator";

// Instance of the Class Router
const tasksRouter = Router()

// Routes
tasksRouter.get('/', validateToken, getAllTasks)
tasksRouter.get('/:id', validateToken, getTaskById)

// A Route for task creating with Input Data Validation
tasksRouter.post('/', [
    check('title', "Title Error").isLength({ min: 3, max: 255 }),
    check('description', "Description Error").isLength({ min: 3, max: 255 }),
    check('status', 'Status Error').isBoolean(),
    check('created_at', 'created_at Error').isDate(),
    check('updated_at', 'created_at Error').isDate()
], validateToken, createTask)

// A Route for task updating with Input Data Validation
tasksRouter.put('/:id', [
    check('title', "Title Error").isLength({ min: 3, max: 255 }),
    check('description', "Description Error").isLength({ min: 3, max: 255 }),
    check('status', 'Status Error').isBoolean(),
    check('created_at', 'created_at Error').isDate(),
    check('updated_at', 'created_at Error').isDate()
], validateToken, updateTask)
tasksRouter.delete('/:id', validateToken, deleteTask)

export default tasksRouter