import express from 'express'
import authorization from '../middlewares/verifyJWT.js'
import { addOrder, addOrderStripe, getSellerOrders, getUserOrders } from '../controllers/orderController.js'
import authorizationSeller from '../middlewares/authSeller.js'

const orderRoutes=express.Router()

orderRoutes.post('/postOrder',authorization,addOrder)
orderRoutes.post('/stripe',authorization,addOrderStripe)
orderRoutes.get('/userOrders',authorization,getUserOrders)
orderRoutes.get('/sellerOrders',authorizationSeller,getSellerOrders)

export default orderRoutes
