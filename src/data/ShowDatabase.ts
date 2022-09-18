import { BaseDatabase } from './BaseDatabase'
import { DAY_TYPES, show } from '../models/Show'
import { CustomError } from '../errors/CustomError'
import { ShowRepository } from '../business/ShowRepository'

export class ShowDatabase extends BaseDatabase implements ShowRepository {
    private static table_name = 'lama_shows'

    insertShow = async (show: show): Promise<void> => {
        try {
            await ShowDatabase
            .connection(ShowDatabase.table_name)
            .insert({
                id: show.id,
                week_day: show.weekDay,
                start_time: show.startTime,
                end_time: show.endTime,
                band_id: show.bandId
            })
            
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }

    selectShowByDate = async (weekDay: DAY_TYPES, startTime: number, endTime: number): Promise<any> => {
        const show = await ShowDatabase
        .connection.raw(
            `SELECT * FROM ${ShowDatabase.table_name} WHERE week_day = "${weekDay}" AND start_time BETWEEN ${startTime} AND ${endTime}`
        )

        return show[0]
    }   

    selectShows = async (weekDay: string): Promise<any> => {
        const show = await ShowDatabase
        .connection
        .select('lama_bands.name', 'lama_bands.music_genre', 'lama_shows.start_time')
        .join('lama_shows', 'lama_bands.id', 'lama_shows.band_id')
        .where('lama_shows.week_day', 'like', weekDay)
        .orderBy('start_time', 'ASC')
        .into('lama_bands')

        return show
    }
}