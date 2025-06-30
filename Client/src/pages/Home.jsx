import React from 'react'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomImage from '../components/BottomImage'
import NewsLetter from '../components/NewsLetter'
import MainBanner from '../components/MainBanner'

const Home = () => {
  
  return (
    <div className='mt-10'>
      <MainBanner/> 
      <Categories/>
      <BestSeller/>
      <BottomImage/>
      <NewsLetter/>
    </div>
  )
}

export default Home
