import { User } from '../models/User'

export interface UserRepository {
    insertUser(signup: User): Promise<void>
    findUserEmail(email: string): Promise<User>
    selectByUser(id:string): Promise<User>
    selectUserById(id: string): Promise<User>
}