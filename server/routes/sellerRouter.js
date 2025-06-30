import express from "express"
import sellerLogin, { sellerAuth, sellerlogout } from "../controllers/sellerController.js"
import authorizationSeller from "../middlewares/authSeller.js"

const sellerRouter=express.Router()

sellerRouter.post('/sellerLogin',sellerLogin)
sellerRouter.get('/sellerAuth',authorizationSeller,sellerAuth)
sellerRouter.get('/sellerLogout',sellerlogout)

export default sellerRouter