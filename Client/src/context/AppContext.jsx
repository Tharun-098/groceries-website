import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from 'react-hot-toast';
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(false)
    const [seller, setSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [searchQuery, setSearchQuery] = useState("")
    const fetchItem = async () => {
        try {
            const {data}=await axios.get('/api/products/lists')
            if(data.success){
                setProducts(data.allProducts)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('api/seller/sellerAuth')
            if (data.success) {
                setSeller(true)
            }
            else {
                setSeller(false)
            }
        }
        catch (error) {
            setSeller(false)
        }
    }
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('api/users/isAuth')
            if (data.success) {
                setUser(true)
                setCart(data.user.cartItems)
            }
            else {
                setUser(false)
            }
        }
        catch (error) {
            setUser(false)
        }
    }
    useEffect(() => {
        fetchItem();
        fetchUser();
        fetchSeller();
    }, []);
   useEffect(()=>{
       const updateCart=async()=>{
           try {
               const {data}=await axios.post('/api/user/cart',{cartItems:cart})
               if(!data.success){
                   toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        if(user){
            updateCart()
        }
    },[cart])

    useEffect(() => {
        console.log("Products updated:", products);
    }, [products]); // runs whenever products changes


    const addToCart = (ItemId) => {
        let cartData = structuredClone(cart);
        if (cartData[ItemId]) {
            cartData[ItemId] += 1;
        } else {
            cartData[ItemId] = 1;
        }
        setCart(cartData);
        toast.success("Add To Cart");
    }

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cart);
        cartData[itemId] = quantity;
        setCart(cartData);
        toast.success("Cart Updated");
    };


    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cart);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart");
        setCart(cartData);
    };

    const cartCount = () => {
        let count = 0;
        for (const item in cart) {
            count = count + cart[item]
        }
        return count;
    }

    const cartAmount = () => {
        let amt = 0;
        for (const item in cart) {
            let itemInfo = products.find((items) => items._id == item);
            console.log(itemInfo)
            if (cart[item] > 0) {
                amt = amt + itemInfo.offerPrice * cart[item];
            }
        }
        return Math.floor(amt * 100) / 100;
    }

    return (
        <AppContext.Provider value={{
            navigate, user, setUser, seller, setSeller, showUserLogin, setShowUserLogin, products, currency, cart,
            setCart , axios, addToCart, updateCartItem, removeFromCart, searchQuery, setSearchQuery, cartAmount, cartCount,fetchItem
        }}>
            {children}
        </AppContext.Provider>
    )
}