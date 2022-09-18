import { CustomError } from '../errors/CustomError'
import { User } from '../models/User'
import { BaseDatabase } from './BaseDatabase'
import { UserRepository } from '../business/UserRepository'

export class UserDatabase extends BaseDatabase implements UserRepository {

    private static table_name = 'lama_users'
 
    insertUser = async (user: User): Promise<void> => {
        try {
            await UserDatabase
            .connection(UserDatabase.table_name)
            .insert(user)

        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }

    findUserEmail = async (email: string): Promise<User> => {
        try {
            const user = await UserDatabase
            .connection(UserDatabase.table_name)
            .select()
            .where({email})

            return user[0]

        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }

    selectByUser = async (id: string): Promise<User> => {
        try {
            const user = await UserDatabase
            .connection(UserDatabase.table_name)
            .select('id', 'name', 'email')
            .where({id})

            return user[0]

        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }

    selectUserById = async (id: string): Promise<User> => {
        try {
            const user = await UserDatabase
            .connection(UserDatabase.table_name)
            .select('name', 'email')
            .where({id})

            return user[0]

        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }
}