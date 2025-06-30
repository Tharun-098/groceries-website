import React, { useContext } from 'react'
import NavBar from './components/NavBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { AppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import Orders from './pages/Orders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Order from './pages/seller/Order'
import Loader from './components/Loader'

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, seller} = useContext(AppContext);
  
  return (
    <div>
      {isSellerPath ? null : <NavBar />}
      {showUserLogin ? <Login /> : ""}
      <Toaster />
      <div className={`${isSellerPath ? " " : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} /> 
          <Route path='/products/:category' element={<ProductCategory />}/>
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/Address' element={<AddAddress />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/loader' element={<Loader />} />
          <Route path="/seller" element={seller?<SellerLayout/>:<SellerLogin/>}>
            <Route index element={seller?<AddProduct />:null} />
            <Route path='/seller/product-list' element={<ProductList />} />
            <Route path='/seller/orders' element={<Order />} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App
