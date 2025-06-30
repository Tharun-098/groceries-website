import express from 'express'
import  register,{ login, logout, userAuth } from '../controllers/userController.js'
import authorization from '../middlewares/verifyJWT.js'

export const userRouter=express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/isAuth',authorization,userAuth)
userRouter.get('/logout',authorization,logout)