import React from "react"
import { AppContext } from "../context/AppContext"
import { useContext } from "react"
import { useState } from "react"
import toast from "react-hot-toast"
const NewsLetter = () => {
    const {axios}=useContext(AppContext)
    const [email,setEmail]=useState("")
    const subscribeEmail=async(event)=>{
        event.preventDefault()
        try {
            const {data}=await axios.post('/newsLetter',{email})
            if(data.success){
                toast.success(data.message)
                setEmail("")
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2 pt-24 mb-14">
            <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</h1>
            <p className="md:text-lg text-gray-500/70 pb-8">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input
                    className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                    type="text"
                    placeholder="Enter your email id"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none" onClick={subscribeEmail}>
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default NewsLetter