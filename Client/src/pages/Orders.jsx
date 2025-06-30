import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
const Orders = () => {
    const [orders,setOrders]=useState([])
    const {currency,axios,user}=useContext(AppContext)

    const fetchOrders=async()=>{
        try {
            const {data}=await axios.get('api/orders/userOrders')
            if(data.success){
                setOrders(data.orders)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(user){
        fetchOrders();
        }
    },[user])
  return (
    <div className='mt-16 pb-8'>
    <div className='flex flex-col mb-8  items-start w-max'>
        <p className='text-2xl uppercase font-meduim'>My Orders</p> 
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
    </div>
        {orders.map((order,index)=>(
            <div key={index} className="border border-gray-300 rounded-lg mb-10 py-5 max-w-4xl p-4 ">
            <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                <span>OrderId:{order._id}</span>
                <span>Payment:{order.paymentType}</span>
                <span>Total Amount:{currency}{order.amount}</span>
            </p>
            {order.items.map((item,index)=>(
                <div key={index} className={`relative bg-white text-gray-500/70 ${
  order.items.length !== index + 1 && "border-b"
} border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>
                    <div className='flex items-center mb-4 md:mb-0'>
                        <div className='bg-primary/10 rounded-lg p-4'>
                            <img src={item.product.image[0]} className='w-16 h-16' alt="" />
                        </div>
                        <div className='ml-4'>
                            <h2 className='text-xl font-medium text-gray'>{item.product.name}</h2>
                            <p>Category:{item.product.category}</p>
                        </div>
                    </div>
                    <div className='flex flex-col text-primary font-medium text-lg'>
                        <p>Quantity:{item.quantity || 1}</p>
                        <p>status:{order.status}</p>
                        <p>Date:{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className='text-primary font-medium text-lg'>Amount:{currency}{item.product.offerPrice*item.quantity}</p>
                </div>
            ))}
            </div>
        ))}
    </div>
  )
}

export default Orders

