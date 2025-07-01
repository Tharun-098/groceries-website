import { useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext'
const NavBar = () => {
    const [open, setOpen] = React.useState(false)
    const { axios,searchQuery, setSearchQuery, user, setUser,cartCount, setShowUserLogin, navigate } = useContext(AppContext)
    const logout = async () => {
        try{
            const {data}=await axios.get('api/users/logout')
            if(data.success){
                toast.success(data.message)
                navigate('/')
                setUser(null)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }
       useEffect(() => {
         if (searchQuery.trim().length > 0) {
           navigate("/products");
         }
    }, [searchQuery]);

    // const location = useLocation();
    // useEffect(() => {
    //     if (searchQuery.trim().length > 0 && !location.pathname.startsWith('/products/')) {
    //         navigate('/products');
    //     }
    // }, [searchQuery, location.pathname, navigate]);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to="/" onClick={() => setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/contact">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input value={searchQuery} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text"
                        placeholder="Search products" onChange={(e) => setSearchQuery(e.target.value)} />
                    <img src={assets.search_icon} className='w-4 h-4' />
                </div>
                
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} className='h-4 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{cartCount()}</button>
                </div>
                {!user ? (
                    <button className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full" onClick={() => setShowUserLogin(true)}>
                        Login
                    </button>
                ) :
                    (
                        <div className='relative group'>
                            <img src={assets.profile_icon} className='w-10' />
                            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow-border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                                <li onClick={() => navigate("orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                                <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                            </ul>
                        </div>
                    )}
            </div>
            <div className='flex items-center gap-6 sm:hidden'>
            <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                <img src={assets.nav_cart_icon} className='h-4 opacity-80' />
                <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{cartCount()}</button>
            </div>
            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" >
                <img src={assets.menu_icon} />
            </button>
            </div>
            {open &&
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-100`}>
                    <NavLink to="/" className="block" onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/products" className="block" onClick={() => setOpen(false)}>Products</NavLink>
                    {user &&
                        <NavLink to="/orders" className="block" onClick={() => setOpen(false)}>All Orders</NavLink>
                    }
                    <NavLink to="/products" className="block" onClick={() => setOpen(false)}>Contacts</NavLink>
                    {!user ? (
                        <button onClick={() => {
                            setOpen(false)
                            setShowUserLogin(true)
                        }
                        } className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Login
                        </button>
                    ) : (
                        <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Logout
                        </button>
                    )}
                </div>}
        </nav>
    )
}

export default NavBar

