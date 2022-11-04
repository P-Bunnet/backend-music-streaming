import { Application, Router } from 'express'
import cors from 'cors'
import compression from 'compression'
export default (app: Application) => {
    const route = Router()
    app.use(cors())
    app.use('/', route)
    app.use(compression())
    return app
}
