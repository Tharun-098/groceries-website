import express from 'express'
import updateCart from '../controllers/cartController.js'
import authorization from '../middlewares/verifyJWT.js'

const cartRoutes=express.Router()

cartRoutes.post('/cart',authorization,updateCart)

export default cartRoutes