import { Application, Router } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import auth from '../../routes/api/auth'
import user from '../user'
import profile from '../../routes/api/profile'
import song from '../songs/index'
export default (app: Application) => {
    const route = Router()
    app.use(cors())
    app.use(cookieParser())
    app.use('/auth', auth)
    app.use('/profile', profile)
    app.use('/user', user)
    app.use('/', route)
    app.use('/song', song)
    return app
}
