import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { LoginInputDTO, SignupInputDTO } from '../models/User'

export class UserController {
    constructor(
      private userBusiness: UserBusiness
    ) {}
  
    signup = async (req: Request, res: Response): Promise<void>=> {
      try {
        const { name, email, password, role } = req.body
  
        const input: SignupInputDTO = {
          name,
          email,
          password,
          role
        }
  
        const token = await this.userBusiness.createUser(input)
  
        res.status(201).send({ message: 'Created user', token })

      } catch (error: any) {
        res.status(400).send(error.message)
      }
    }
  
    login = async (req: Request, res: Response): Promise<void>=> {
      try {
        const { email, password } = req.body
  
        const input: LoginInputDTO = {
          email,
          password,
        }
  
        const token = await this.userBusiness.login(input)
  
        res.status(200).send({ message: 'Logged in user', token })

      } catch (error: any) {
        res.status(400).send(error.message)
      }
    }
  
    getUser = async (req: Request, res: Response): Promise<void> => {
      try {
        const token = req.headers.authorization as string
  
        const user = await this.userBusiness.getUser(token)
  
        res.status(200).send(user)

      } catch (error: any) {
        res.status(400).send(error.message)
      }
    }
  
    getUserById = async (req: Request, res: Response): Promise<void> => {
      try {
        const token = req.headers.authorization as string
        const { id } = req.params
  
        const user = await this.userBusiness.getUserById(id, token)
  
        res.status(200).send(user)

      } catch (error: any) {
        res.status(400).send(error.message)
      }
    }
  }