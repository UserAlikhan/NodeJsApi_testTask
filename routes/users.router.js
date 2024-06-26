import { Router } from "express";
import { 
    getAllUsers,
    getUserById,
    // getUserByEmail,
    login,
    registration,
    // updateUser,
    // deleteUser,
} from "../controllers/users.controller.js";
import { hashPassword } from '../middleware/hashPassword.js';
import { validateLogin } from '../middleware/validateLogin.js'

const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUserById)
// usersRouter.get('/:email', getUserByEmail)
usersRouter.post('/login', validateLogin, login)
usersRouter.post('/registration', hashPassword, registration)
// usersRouter.put('/:id', updateUser)
// usersRouter.delete('/:id', deleteUser)

export default usersRouter