import express from 'express'
import { upload } from '../config/multer.js'
import authorizationSeller from '../middlewares/authSeller.js'
import { addProduct, getProducts, getSingleProduct, productStockChange } from '../controllers/productController.js'

const productRoutes=express.Router()

productRoutes.post('/add',upload.array("images"),authorizationSeller,addProduct)
productRoutes.post('/stock',authorizationSeller,productStockChange)
productRoutes.get('/lists',getProducts)
productRoutes.get('/:id',getSingleProduct)

export default productRoutes