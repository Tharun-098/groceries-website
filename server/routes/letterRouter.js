import express from 'express'
import { subscribeEmail } from '../controllers/newsController.js'

const newsLetterRoutes=express.Router()

newsLetterRoutes.post('/',subscribeEmail)

export default newsLetterRoutes