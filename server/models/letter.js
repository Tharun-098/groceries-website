import mongoose from "mongoose"

const newsLetterSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    subscribedAt: {type: Date,default:Date.now}
})

const Letter=mongoose.models.letter||mongoose.model('letter',newsLetterSchema)

export default Letter

