
import { CustomError, InvalidEmail, InvalidPassword, Unauthorized, UserNotFound } from '../errors/CustomError'
import { AuthenticationData, LoginInputDTO, SignupInputDTO, User, userProfile} from '../models/User'
import { UserRepository } from './UserRepository'
import HashManager from '../services/HashManager'
import IdGenerator from '../services/IdGenerator'
import Authorization from '../services/Authorization'

export class UserBusiness {
  constructor(
    private userDatabase: UserRepository
  ) {}

  createUser = async (input: SignupInputDTO): Promise<string> => {
    const { name, email, password, role } = input

    if (!name || !email || !password || !role) {
      throw new CustomError(400, 'Fill in the name, email and password fields')
    }

    if (role !== 'NORMAL' && role !== 'ADMIN') {
      role: 'NORMAL'
    } 

    if (!email.includes('@')) {
      throw new InvalidEmail()
    }

    if (password.length < 6) {
      throw new InvalidPassword()
    }

    const id: string = IdGenerator.generateId()
    const hashPassword = await HashManager.generateHash(password)

    const user: User = {
      id,
      name,
      email,
      password: hashPassword,
      role 
    }

    await this.userDatabase.insertUser(user)
    const token = Authorization.generateToken({ id, role })
    
    return token
  }

  login = async (input: LoginInputDTO): Promise<string> => {
    
    const { email, password } = input

    if (!email || !password) {
      throw new CustomError(400, 'Fill in the email and password fields')
    }

    if(!email.includes('@')) {
      throw new InvalidEmail()
    }

    const user = await this.userDatabase.findUserEmail(email)

    if (!user) {
      throw new UserNotFound()
    }
    
    const hashCompare = await HashManager.compareHash(password,user.password)

    if (!hashCompare) {
      throw new InvalidPassword()
    }
    
    const payload: AuthenticationData = {
      id: user.id,
      role: user.role
    }

    const token = Authorization.generateToken(payload)

    return token
  }
  
  getUser = async (token: string): Promise<userProfile> => {
  
      if (!token) {
        throw new CustomError(400, 'Fill in the token fields')
      }

      const { id } = Authorization.getTokenData(token)

      const user = await this.userDatabase.selectByUser(id)

      return user
  }

  getUserById = async (id: string, token: string): Promise<userProfile> => {
      
    if (!id || !token) {
      throw new CustomError(400, 'Fill in the id and token fields')
    }

    const data = Authorization.getTokenData(token)

    if (!data.id) {
      throw new Unauthorized()
    }

    const user = await this.userDatabase.selectUserById(id)

    return user
  }
}