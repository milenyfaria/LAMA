import { Band } from '../models/Band'

export interface BandRepository {
    createBand(band: Band): Promise<void>
    selectBandById(id: string): Promise<Band>
}

