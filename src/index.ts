import express from 'express'
import loaders from './loaders/index'

// eslint-disable-next-line require-jsdoc
function app() {
    const port = 3000
    const app = express()
    loaders(app)
    app.listen(port, () => console.log(`Server is listening on port ${port}!`))
}
app()
