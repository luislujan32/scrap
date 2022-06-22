import { Router } from 'express'
import { logger } from '../utils/log'
import { getToken } from '../facade/occ/occ'

const log = logger('ROUTES:OCC')

const router = Router()

router.post('/occ/token', async(req, res, next) => {
  try {
    const { email, password } = req.body
    log.info(`Peticion de token: ${req.body} - Body:`, req.body)

    const result = await getToken(email, password)

    log.info('Token: ', result)

    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
})

export default router
