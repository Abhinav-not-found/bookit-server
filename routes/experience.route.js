import express from 'express'
import {
  getExp,
  getExpDetails,
  createBooking,
  validatePromo,
} from '../controllers/experience.controller.js'

const router = express.Router()

router.get('/experiences', getExp)
router.get('/experiences/:id', getExpDetails)
router.post('/bookings', createBooking)
router.post('/promo/validate', validatePromo)

export default router
