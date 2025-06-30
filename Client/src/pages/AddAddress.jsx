import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
const InputField=({type,placeholder,name,address,handleChange})=>(
    <input type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    className='w-full px-2 py-3.5 border rounded border-gray-500/30 outline-none text-gray-500 focus-border-primary transition'/>
)
const AddAddress = () => {
    const [address,setAddress]=useState({
        firstName:'',
        lastname:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        phone:''
    });
    const {user,axios,navigate}=useContext(AppContext)
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setAddress((prevAdd)=>({
            ...prevAdd,
            [name]:value
        }))
    }
    const handleSubmit=async(e)=>{
        try {
            e.preventDefault();
            const {data}=await axios.post('/api/userAddress/postAddress',{address})
            if(data.success){
                toast.success(data.success)
                navigate('/cart')
            }
            else{
                toast.error(data.success)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        if(!user){
            navigate('/cart')
        }
    })
    return (
    <div className='mt-16 pb-16'>
        <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className='flex-1 max-w-md'>
                <form className='mt-6 space-y-3 text-sm' onSubmit={handleSubmit}>
                    <div className="grid-cols-2 gap-4 grid">
                    <InputField type="text" placeholder="First Name" address={address} name="firstName" handleChange={handleChange}/>                    
                    <InputField type="text" placeholder="Last Name" address={address} name="lastName" handleChange={handleChange}/>                    
                    </div>
                    <InputField type="email" placeholder="Email Address" address={address} name="email" handleChange={handleChange}/>                    
                    <InputField type="text" placeholder="Street" address={address} name="street" handleChange={handleChange}/>                    
                    <div className="grid-cols-2 gap-4 grid">
                    <InputField type="text" placeholder="City" address={address} name="city" handleChange={handleChange}/>                    
                    <InputField type="text" placeholder="State" address={address} name="state" handleChange={handleChange}/>                    
                    </div>
                    <div className="grid-cols-2 gap-4 grid">
                    <InputField type="number" placeholder="Zipcode" address={address} name="zipcode" handleChange={handleChange}/>                    
                    <InputField type="text" placeholder="Country" address={address} name="country" handleChange={handleChange}/>                    
                    </div>
                    <InputField type="text" placeholder="Phone Number" address={address} name="phone" handleChange={handleChange}/>                    
                    <button className='w-full bg-primary mt-6 text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save Address</button>
                </form>
            </div>
            <img src={assets.add_address_iamge} className='mb-16 md:mr-16 mt-0'/>
        </div>
      
    </div>
  )
}
export default AddAddress
