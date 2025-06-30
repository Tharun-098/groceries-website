import React from 'react'
import { assets, features } from '../assets/assets'

const BottomImage = () => {
    return (
        <div className='mt-24 relative'>
            <img src={assets.bottom_banner_image} alt="" className='w-full hidden md:block' />
            <img src={assets.bottom_banner_image_sm} alt="" className='md:hidden w-full' />
            <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-8 md:pt-0 md:pr-16'>
                <div>
                    <h1 className='text-2xl md:text-xl font-semibold text-primary mb-6 md:mb-1'>Why We Are The Best?</h1>
                    {features.map((feature, index) => (
                        <div key={index} className='flex items-center gap-4 mt-1 md:mb-0'>
                            <img src={feature.icon} className="md:w-8 w-9" alt="" />
                            <div>
                            <h3 className='text-lg md:text-md font-semibold'>{feature.title}</h3>
                            <p className='text-gray-500/70 text-xs md:text-sm'>{feature.description}</p>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )}
export default BottomImage
