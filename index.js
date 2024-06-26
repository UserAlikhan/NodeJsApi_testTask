import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import usersRouter from "./routes/users.router.js"
import tasksRouter from "./routes/tasks.router.js"

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())       

app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))