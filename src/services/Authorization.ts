
import * as jwt from 'jsonwebtoken'
import { IAuthorization } from '../business/Ports'
import { AuthenticationData } from '../models/User'

class Authorization implements IAuthorization {
    
  generateToken = (payload: AuthenticationData): string => {
    const token = jwt.sign(
      payload,
      process.env.JWT_KEY as string,
      { expiresIn: '1h' }
    )
    return token
  }
  
  getTokenData = (token: string): AuthenticationData => {
    const result = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as AuthenticationData
    
    return result
  }
}

export default new Authorization()
