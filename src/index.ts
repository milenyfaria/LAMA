import { app } from './app'
import { userRouter } from './routes/UserRouter'
import { bandRouter } from './routes/BandRouter'
import { showRouter } from './routes/ShowRouter'


app.use('/user/', userRouter)
app.use('/band/', bandRouter)
app.use('/show/', showRouter)