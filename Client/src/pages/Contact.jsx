import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext';
import emailjs from 'emailjs-com'
import toast from 'react-hot-toast';
const Contact = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [message,setMessage]=useState("")
    const {navigate}=useContext(AppContext)
    const form=useRef()
    const handleSubmit=async(e)=>{
            e.preventDefault()
            emailjs.sendForm("service_jjie8ww", "template_avgebxl", form.current, "0TNuLGTv7dWmelpLp")
      .then(
        () => {
          toast.success("Successfully sent")
          setEmail("")
          setMessage("")
          setName("")
          navigate('/')
        },
        (error) => {
          toast.error(error.text);
          //toast.error('FAILED...', error.text);
        },
      );
    }
    return (
    <div className='mt-16 pb-16'>
        <p className='text-2xl md:text-3xl text-gray-500'>Contact Form</p>
        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className='flex-1 w-50'>
                <form ref={form} className='mt-6 space-y-3 text-sm' onSubmit={handleSubmit}>     
                    <input type="text" placeholder='Enter the Name' value={name} onChange={(e)=>setName(e.target.value)} name='name' className='w-full px-2 py-3.5 border rounded border-gray-500/30 outline-none text-gray-500 focus-border-primary transition'/>                                  
                    <input type="email" placeholder='Enter the Email' value={email} onChange={(e)=>setEmail(e.target.value)} name='email' className='w-full px-2 py-3.5 border rounded border-gray-500/30 outline-none text-gray-500 focus-border-primary transition'/>
                    <textarea name='message' id="message"  rows="10" value={message} onChange={(e)=>setMessage(e.target.value)} className='w-full px-2 py-3.5 border rounded border-gray-500/30 outline-none text-gray-500 focus-border-primary transition' placeholder='Enter the message'></textarea>
                    <div className='text-center'>
                    <button className='w-30 bg-primary mt-6 text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Sent</button>
                    </div>                                  
                </form>
            </div>
        </div>
        </div>
      
  )
}
export default Contact
