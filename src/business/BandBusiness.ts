import { CustomError, InvalidBand, Unauthorized } from '../errors/CustomError'
import { Band, BandInputDTO } from '../models/Band'
import Authorization from '../services/Authorization'
import Authenticator from '../services/Authorization'
import IdGenerator from '../services/IdGenerator'
import { BandRepository } from './BandRepository'


export class BandBusiness {
    constructor(
        private bandDatabase: BandRepository
    ) {}

    createBandBusiness = async (input:BandInputDTO): Promise<void> => {
        try {
            const { name, musicGenre, responsible, token } = input

            if (!name || !musicGenre || !responsible) {
                throw new CustomError(400, 'Fill in the name, email and password fields')
            }

            const authorization = Authorization.getTokenData(token)

            if (!authorization.id) {
                throw new Unauthorized()
            }

            const id = IdGenerator.generateId()
           
            const band: Band = {
                id,
                name,
                musicGenre,
                responsible
            }

            await this.bandDatabase.createBand(band)
            
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    }

    bandByIdBusiness = async (id: string, token: string): Promise<Band> => {
        try {
            if (!token) {
                throw new CustomError(400, 'Fill in the token fields')
            }

            const authorization = Authorization.getTokenData(token)

            if (!authorization.id) {
                throw new Unauthorized()
            }

            const band = await this.bandDatabase.selectBandById(id)

            if (!band) {
                throw new InvalidBand()
            }

            return band

        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    }
}