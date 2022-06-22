import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

import {logger} from '../utils/log'

import occRoute from './occ'

const log = logger('ROUTES')
const app = express()

// https://helmetjs.github.io
app.use(helmet())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Endpoint donde recibimos las peticiones de scrap de OCC
app.use(occRoute)

// Root de la aplicacion
app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.status(200).json({
      status: 'ok'
    })
  } catch (err) {
    next(err)
  }
})

app.use(async function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  log.error(err)
  res.status(500).send('Internal error')
})

export default app
