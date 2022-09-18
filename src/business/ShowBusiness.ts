import { CustomError, InvalidDay, InvalidShow, InvalidTime, Unauthorized } from '../errors/CustomError'
import { RegisterShowDTO, show, shows } from '../models/Show'
import { IAuthorization, IIdGenerator } from './Ports'
import { ShowRepository } from './ShowRepository'

export class ShowBusiness {
    constructor(
        private showDatabase: ShowRepository,
        private authorization: IAuthorization,
        private idGenerator: IIdGenerator
    ) {}

    registerShow = async (input: RegisterShowDTO): Promise<void> => {
        const { weekDay, startTime, endTime, bandId, token } = input

        if (weekDay !== "SEXTA" && weekDay !== "SABADO" && weekDay !== "DOMINGO") {
            throw new InvalidDay()
        }
        
        if (!startTime || !endTime || !bandId || !token) {
            throw new CustomError(400, 'Body information is missing')
        }

        if (startTime < 8 || endTime > 23) {
            throw new InvalidTime()
        }

        const tokenData = this.authorization.getTokenData(token)
        if(tokenData.role !== 'ADMIN') {
            throw new Unauthorized()
        }

        const showTimes = await this.showDatabase.selectShowByDate(
            weekDay,
            startTime,
            endTime
        )

        if (showTimes.length > 0) {
            throw new InvalidShow()
        }

        const id: string = this.idGenerator.generateId()

        const show: show = {
            id,
            weekDay,
            startTime,
            endTime,
            bandId
        }

        await this.showDatabase.insertShow(show)
    }

    getShows = async (input: string): Promise<shows> => {
        const weekDay: string = input

        if (!weekDay) {
            throw new InvalidDay()
        }

        const getShows = await this.showDatabase.selectShows(weekDay)

        return getShows
    }
}