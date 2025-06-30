import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { assets } from '../assets/assets'
const AllProducts = () => {
  const {products,searchQuery,setSearchQuery}=useContext(AppContext);
  const [filteredProducts,setFilteredProducts]=useState([])

  useEffect(() => {
  const query = searchQuery.trim().toLowerCase();
  if (query.length > 0) {
    setFilteredProducts(
      products.filter(product =>
        product.name && product.name.toLowerCase().includes(query)
      )
    );
  } else {
    setFilteredProducts(products);
  }
}, [products, searchQuery]);

  return (
    <div className='mt-16 flex flex-col'>
      <div className="lg:hidden mb-2 flex items-center text-sm gap-2 border border-gray-300 px-3 py-2 rounded-full">
                          <input value={searchQuery} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text"
                              placeholder="Search products" onChange={(e) => setSearchQuery(e.target.value)} />
                          <img src={assets.search_icon} className='w-4 h-4' />
                      </div>
      <div className="flex flex-col items-end w-max">
        <p className='text-2xl font-medium uppercase'>All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
        {filteredProducts.filter((product)=>product.inStock).map((product,index)=>(
          <ProductCard key={index} products={product}/>
        ))}
      </div>
    </div>
  )
}

export default AllProducts
