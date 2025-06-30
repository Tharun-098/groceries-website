import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const SellerLogin = () => {
    const { seller, setSeller, navigate,axios } = useContext(AppContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSeller = async(event) => {
        try {
            event.preventDefault()
            const {data}=await axios.post('/api/seller/sellerLogin',{email,password})
            if(data.success){
                setSeller(true)
                navigate('/seller')
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (seller) {
            navigate('/seller')
        }
    }, [seller])

    return !seller && (
        <div>
            <form onSubmit={handleSeller} className='flex min-h-screen text-gray-600 text-sm items-center'>
                <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
                    <p className='text-2xl font-medium m-auto'>
                        <span className="text-primary">Seller</span> Login
                    </p>

                    <div className="w-full ">
                        <p>Email</p>
                        <input
                            type="email"
                            placeholder="enter you email"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>

                    <div className="w-full ">
                        <p>Password</p>
                        <input
                            type="password"
                            placeholder="enter your password"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                            required
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default SellerLogin
