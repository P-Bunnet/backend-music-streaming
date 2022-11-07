import bodyParser from 'body-parser'
import cors from 'cors'
import express, { json } from 'express'

import connectDB from './config/database'
import loaders from './loaders'

function app() {
    const app = express()

    // Connect to MongoDB
    connectDB()

    // Express configuration
    app.set('port', process.env.PORT || 5000)
    app.use(json())
    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(
        bodyParser.urlencoded({
            limit: '50mb',
            extended: true,
            parameterLimit: 1000000,
        })
    )
    app.use(cors())
    loaders(app)

    const port = app.get('port')
    const server = app.listen(port, () =>
        console.log(`Server started on port ${port}`)
    )
}
app()
