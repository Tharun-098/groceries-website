import React from "react";
import { useState,useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
const ProductCard = ({products}) => {
  const {navigate,currency,addToCart,updateCartItem,removeFromCart,cart } = useContext(AppContext);
  console.log(products);
  
  
  return(
      <div onClick={()=>{navigate(`/products/${products.category.toLowerCase()}/${products._id}`);scrollTo(0,0)}} key={products._id} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white  w-full">
             <div className="group cursor-pointer flex item9s-center justify-center px-2">
                 <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={products.image[0]} alt={products.name} />
             </div>
             <div className="text-gray-500/60 text-sm">
                 <p>{products.category}</p>
                 <p className="text-gray-700 font-medium text-lg truncate w-full">{products.name}</p>
                 <div className="flex items-center gap-0.5">
                     {Array(5).fill('').map((_, i) => (
                             <img className="w-3 md:w-3.5" src={i<4?assets.star_icon:assets.star_dull_icon}/>) 
                      )}
                     <p>4</p>
                 </div>
                 <div className="flex items-end justify-between mt-3">
                     <p className="md:text-xl text-base font-medium text-indigo-500">
                        {currency}{products.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">${products.price}</span>
                     </p>
                     <div className="text-indigo-500" onClick={(e)=>e.stopPropagation()}>
                         {!cart[products._id]?(
                             <button  className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium" onClick={()=>addToCart(products._id)} >
                                 <img src={assets.cart_icon} />
                                 Add
                             </button>
                         ) : (
                             <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                                 <button onClick={() => removeFromCart(products._id)} className="cursor-pointer text-md px-2 h-full" >
                                     -
                                 </button>
                                 <span className="w-5 text-center">{cart[products._id]}</span>
                                 <button onClick={() => addToCart(products._id)} className="cursor-pointer text-md px-2 h-full" >
                                     +
                                 </button>
                             </div>
                         )}
                     </div>
                 </div>
             </div>
         </div>
     )
}

export default ProductCard

