import { DAY_TYPES, show, } from '../models/Show'

export interface ShowRepository {
    insertShow(show: show): Promise<void>
    selectShowByDate(weekDay: DAY_TYPES, startTime: number, endTime: number): Promise<any>
    selectShows(weekDay: string): Promise<any>
}