import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets, dummyOrders, dummyProducts } from '../../assets/assets'
import toast from 'react-hot-toast'

const Order = () => {
  const {currency,axios}=useContext(AppContext)
  const[orders,setOrders]=useState([])
  const fetchOrders=async()=>{
    try {
      const {data}=await axios.get('/api/orders/sellerOrders')
      if(data.success){
        setOrders(data.orders)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchOrders();
  },[orders])
  return (
    <div className='no-scrollbar flex-1 overflow-y-scroll h-[100vh] '>
    <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
            {orders.map((order, index) => (
                <div key={index} className="flex flex-col  md:items-center md:flex-row justify-between gap-5 p-5 max-w-4xl rounded-md border border-gray-300">
                    <div className="flex gap-5 max-w-80">
                        <img className="w-12 h-12 object-cover " src={assets.box_icon} alt="boxIcon" />
                        <>
                        <div className="flex flex-col">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <p className="font-medium">
                                        {item.product.name} <span className='text-primary'>x {item.quantity}</span>
                                    </p>
                              </div>
                            ))}
                        </div>
                        </>
                    </div>

                    <div className="text-sm text-black/60 md:text-base">
                        <p className='text/black-80'>{order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.street}, {order.address.city}</p>
                        <p>{order.address.state},{order.address.zipcode}, {order.address.country}</p>
                        <p>{order.address.phone}</p>
                    </div>

                    <p className="font-medium text-base my-auto text-black/70">{currency}{order.amount}</p>

                    <div className="flex flex-col text-sm">
                        <p>Method: {order.paymentType}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Order
