import { Request, Response } from 'express'
import { BandBusiness } from '../business/BandBusiness'
import { CustomError, InvalidBand } from '../errors/CustomError'
import { Band, BandInputDTO } from "../models/Band"

export class BandController {
    constructor(
        private bandBusiness: BandBusiness
    ) {}

    createBandController = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
            const { name, musicGenre, responsible } = req.body

            const band: BandInputDTO = {
                name,
                musicGenre,
                responsible,
                token
            }

            await this.bandBusiness.createBandBusiness(band);
           
            res.status(201).send({ message: 'Band created successfully' })

        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    }

    bandByIdController = async (req: Request, res: Response): Promise<void> =>{
        try {
            const token = req.headers.authorization as string
            const { id } = req.params

            const band: Band = await this.bandBusiness.bandByIdBusiness(id, token)

            if(!band) {
                throw new InvalidBand()
            }

            res.status(200).send(band)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message);
        }
    }
} 