import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { Link, NavLink, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
const SellerLayout = () => {
    const { axios,navigate } = useContext(AppContext)

    const sidebarLinks = [
        { name: "Add Products", path: "/seller", icon: assets.add_icon },
        { name: "Product Lists", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logout = async () => {
        try{
            const {data}=await axios.get('api/seller/sellerLogout')
            if(data.success){
                toast.success(data.message)
                navigate('/')
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }
    return (
        <div className="text-default min-h-screen text-gray-700 bg-white">
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to="/">
                    <img src={assets.logo} className="cursor-pointer w-34 md:w-38" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>
            <div className="flex">
                <div className="md:w-64 w-16  h-[100vh] text-base border-gray-300  flex flex-col transition-all duration-300">
                    <div className="md:w-64 w-20 border-r h-[100vh] text-base border-gray-300  flex flex-col transition-all duration-300 bg-white">
                        {sidebarLinks.map((item) => (
                            <NavLink
                                to={item.path}
                                key={item.name}
                                end={item.path === "/seller"}
                                className={({ isActive }) =>
                                    `flex items-center py-3 px-4 gap-3 transition-all duration-200 
                                       ${isActive
                                        ? "border-r-4 md:border-r-[6px] border-primary/10 border-primary text-primary bg-primary/5"
                                        : "hover:bg-gray-100/90 text-gray-700"}`
                                }
                                aria-label={`Go to ${item.name}`}
                            >
                                <img src={item.icon} alt={`${item.name} icon`} className="w-6 h-6" />
                                <span className="md:inline hidden">{item.name}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SellerLayout