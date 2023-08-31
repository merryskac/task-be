import  Express  from "express";
import { createTask, deleteTask, filterTask, getAllTask, getTaskNotification, updateTask } from "../controller/task.controller.js";
import verifyToken from "../middleware/verifyToken.js";
const taskRouter = Express.Router()

taskRouter.get('/task', verifyToken, getAllTask)
taskRouter.post('/task', verifyToken,createTask)
taskRouter.put('/task/:id', verifyToken,updateTask)
taskRouter.delete('/task/:id/delete', verifyToken,deleteTask)
taskRouter.get('/task/notification', verifyToken,getTaskNotification)
taskRouter.get('/task/filter', verifyToken,filterTask)

export default taskRouter