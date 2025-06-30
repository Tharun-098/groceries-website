import Address from "../models/address.js"

export const addAddress=async(req,res)=>{
    try{
        const {address}=req.body
        const userId=req.userId
        await Address.create({...address,userId})
        res.json({success:true,message:"Added successfully"})
    }
    catch(error){
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
} 

export const getAddress=async(req,res)=>{
    try{
        const userId=req.userId
        let address=await Address.find({userId})
        res.json({success:true,address})
    }
    catch(error){
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}