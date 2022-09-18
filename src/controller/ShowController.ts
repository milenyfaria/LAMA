import { Request, Response } from 'express'
import { ShowBusiness } from '../business/ShowBusiness'
import { RegisterShowDTO } from '../models/Show'

export class ShowController {  
    constructor(
        private showBusiness: ShowBusiness
    ) {}

    registerShow = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: RegisterShowDTO = {
                weekDay: req.body.weekDay,
                startTime: Number(req.body.startTime),
                endTime: Number(req.body.endTime),
                bandId: req.body.bandId,
                token: req.headers.authorization as string
            }
            
            await this.showBusiness.registerShow(input)

            res.status(201).send({message: 'Show registered successfully'})

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }

    getShows = async (req: Request, res: Response): Promise<void> => {
        try {
            const weekDay: string = req.query.weekDay as string

            const shows = await this.showBusiness.getShows(weekDay)

            res.status(201).send(shows)
            
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }
}