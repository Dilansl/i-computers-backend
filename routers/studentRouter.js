import express from 'express'
import { createStudent, getAllstudent } from '../contraller/studentController.js'

const studentRouter = express.Router()

studentRouter.get("/",getAllstudent)

studentRouter.post("/" , createStudent)

export default studentRouter
