import express, {
    Application,
    Request,
    Response,
    NextFunction,
    json,
} from 'express'
import routes from '../routes/api/index'

export default (app: Application) => {
    // Application routing
    app.use('/status', (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send('Healthy nas b').end()
    })

    routes(app)
}
