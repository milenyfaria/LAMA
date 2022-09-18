import { BandRepository } from '../business/BandRepository'
import { CustomError } from '../errors/CustomError'
import { Band } from '../models/Band'
import { BaseDatabase } from './BaseDatabase'

export class BandDatabase extends BaseDatabase implements BandRepository {

    private static table_name = 'lama_bands'

    createBand = async (band: Band): Promise<void> => {
        try {
            await BandDatabase
            .connection(BandDatabase.table_name)
            .insert({
                    id: band.id,
                    name: band.name,
                    music_genre: band.musicGenre,
                    responsible: band.responsible
            })

        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }

    selectBandById = async (id: string): Promise<Band> => {
        try {
            const [band] = await BandDatabase
            .connection(BandDatabase.table_name)
            .select('id', 'name', 'music_genre', 'responsible')
            .where({id})

            return band

        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }
}