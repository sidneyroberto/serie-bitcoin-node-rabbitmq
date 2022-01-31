import { Router } from 'express'
import CandleController from '../controllers/CandleController'

export const candleRouter = Router()
const candleCtrl = new CandleController()

candleRouter.get('/:quantity', async (req, res) => {
    const quantity = parseInt(req.params.quantity)
    const lastCandles = await candleCtrl.findLastCandles(quantity)
    return res.json(lastCandles)
})
