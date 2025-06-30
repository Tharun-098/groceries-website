import express from 'express'
import authorization from '../middlewares/verifyJWT.js'
import { addAddress, getAddress } from '../controllers/addressController.js'

const addressRoutes=express.Router()

addressRoutes.get('/allAddresses',authorization,getAddress)
addressRoutes.post('/postAddress',authorization,addAddress)

export default addressRoutes