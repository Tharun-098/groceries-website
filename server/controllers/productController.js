import { v2 as cloudinary } from "cloudinary"
import products from "../models/products.js"
export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData)
        const images = req.files
        let imgUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' })
                return result.secure_url
            })
        )
        await products.create({ ...productData, image: imgUrl })
        return res.json({ success: true, message: "product added" })
    }
    catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}

export const getProducts = async (req, res) => {
    try{
        const allProducts=await products.find({})
        return res.json({success:true,allProducts})
    }
    catch(error){
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}

export const getSingleProduct = async (req, res) => {
    try{
        const {id}=req.params
        const productById=await products.findById(id)
        return res.json({success:true,productById})
    }
    catch(error){
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}

export const productStockChange = async (req, res) => {
    try{
        const {id,inStock}=req.body
        const productStock=await products.findByIdAndUpdate(id,{inStock})
        return res.json({success:true,productStock,message:"changed Successfully"})
    }
    catch(error){
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}