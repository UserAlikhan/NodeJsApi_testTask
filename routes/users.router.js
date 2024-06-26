import { Router } from "express";
import { 
    getAllUsers,
    getUserById,
    login,
    registration,
} from "../controllers/users.controller.js";
import { hashPassword } from '../middleware/hashPassword.js';
import { validateLogin } from '../middleware/validateLogin.js'
import { check } from "express-validator";

// Instance of the Class Router
const usersRouter = Router()

// Routes
usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUserById)

// The Login Route with Input Data Validation
usersRouter.post('/login', [
    check('email', "Email error").isEmail(),
    check('password', 'Password length error').isLength({ min: 8, max: 15 })
], validateLogin, login)

// The Registration Route with Input Data Validation
usersRouter.post('/registration', [
    check('email', "Email error").isEmail(),
    check('password', 'Password length error').isLength({ min: 8, max: 15 })
], hashPassword, registration)

export default usersRouter