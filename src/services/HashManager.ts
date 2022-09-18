import * as bcrypt from 'bcryptjs'

class HashManager {
    
    generateHash = async (text: string): Promise<string> => {
        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(rounds)
        const result = await bcrypt.hash(text, salt)
        return result
    }

    compareHash = async (text: string, hash: string): Promise<boolean> => {
        const result = await bcrypt.compare(text, hash)
        return result
    }
}

export default new HashManager()