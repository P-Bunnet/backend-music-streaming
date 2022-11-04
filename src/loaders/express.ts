import { Application, Request, Response, NextFunction, json } from 'express'
import routes from '../api/index'
import cors from 'cors'

export default (app: Application) => {
    // Application routing
    app.use('/status', (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send('Healthy nas bro').end()
    })
    routes(app)
}
