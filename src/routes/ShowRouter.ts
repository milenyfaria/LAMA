import express from 'express'
import { ShowBusiness } from '../business/ShowBusiness'
import { ShowController } from '../controller/ShowController'
import { ShowDatabase } from '../data/ShowDatabase'
import Authorization from '../services/Authorization'
import IdGenerator from '../services/IdGenerator'

export const showRouter = express.Router()

const showDatabase = new ShowDatabase()
const showBusiness = new ShowBusiness(showDatabase, Authorization, IdGenerator)
const showController = new ShowController(showBusiness)

showRouter.get('/', (req, res) => showController.getShows(req, res))
showRouter.post('/register', (req, res) => showController.registerShow(req, res))
