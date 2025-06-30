import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
    const {products,searchQuery}=useContext(AppContext);
    const {category}=useParams();
    const query=searchQuery.trim().toLowerCase();
    const searchCategory=categories.find((item)=>item.path.toLowerCase()==category);
    console.log(searchCategory);
    const filteredProducts=products.filter((item)=>item.category.toLowerCase()==category).filter((item)=>item.name.toLowerCase().includes(query));
  return (
    <div className='mt-16'>
        {searchCategory && (
            <>
            <div className='flex flex-col items-start w-max'>
                <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
                {filteredProducts.length>0?(
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 '>
                            {filteredProducts.map((product,index)=>(
                                <ProductCard key={index} products={product}/>
                            ))}
                        </div>
                    ):(
                        <div className='flex items-center justify-center h-[60vh'>
                            <p>No Products Found</p>
                        </div>
                )}
            </>
        )}
    </div>
  )
}

export default ProductCategory
