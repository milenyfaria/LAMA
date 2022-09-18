import { v4 } from 'uuid'
import { IIdGenerator } from '../business/Ports'

class IdGenerator implements IIdGenerator {
    generateId = () => v4()
}

export default new IdGenerator()


