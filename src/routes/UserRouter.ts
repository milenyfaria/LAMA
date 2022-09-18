import express from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { UserController } from '../controller/UserController'
import { UserDatabase } from '../data/UserDatabase'

export const userRouter = express.Router()

const userDataBase = new UserDatabase()
const userBusiness = new UserBusiness(userDataBase)
const userController = new UserController(userBusiness)

userRouter.get('/users', (req, res) => userController.getUser(req, res))
userRouter.get('/users/:id', (req, res) => userController.getUserById(req, res))
userRouter.post('/signup', (req, res) => userController.signup(req, res))
userRouter.post('/login', (req, res) => userController.login(req, res))