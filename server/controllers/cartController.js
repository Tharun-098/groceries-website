import User from "../models/users.js"

const updateCart=async(req,res)=>{
    try{
        const {cartItems}=req.body
        const userId=req.userId
        const us=await User.findById(userId)
        await User.findByIdAndUpdate(userId,{cartItems})
        res.json({success:true,message:"updated successfully"})
    }
    catch(error){
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}

export default updateCart