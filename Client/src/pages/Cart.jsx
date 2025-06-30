import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
const Cart = () => {
    const { axios, user, products, currency, cart, setCart, updateCartItem, removeFromCart, cartAmount, cartCount, navigate } = useContext(AppContext);
    const [showAddress, setShowAddress] = useState(false)
    const [cartArray, setCartArray] = useState([])
    const [Address, setAddress] = useState([])
    const [paymentOption, setPaymentOption] = useState("COD")
    const [selectedAddress, setSelectedAddress] = useState(null)
    console.log("Cart page rendered");

    const getCart = () => {
        let cartTemp = []
        for (const key in cart) {
            const product = products.find(product => product._id == key)
            product.quantity = cart[key]
            cartTemp.push(product)
        }
        setCartArray(cartTemp)
    }

    useEffect(() => {
        if (products.length > 0 && cart) {
            getCart();
        }
    }, [products, cart])

    const placeOrder = async () => {
        try {
            if (!selectedAddress) {
                toast.error("Please select an address.");
            }
            if(paymentOption==="COD"){
                const { data } = await axios.post("/api/orders/postOrder",{
                    items: cartArray.map((item) => ({product: item._id,quantity: item.quantity,})),
                    address: selectedAddress._id,
                });

            if (data.success) {
                toast.success(data.message);
                setCart({})
                navigate("/orders"); 
            } else {
                toast.error(data.message);
            }
        }
        else{
            const { data } = await axios.post("/api/orders/stripe",{
                    items: cartArray.map((item) => ({product: item._id,quantity: item.quantity,})),
                    address: selectedAddress._id,
                });

            if (data.success) {
                window.location.replace(data.url)
            } else {
                toast.error(data.message);
            }
        }
        } catch (error) {
            toast.error(error.message);
        }
    };


    const getAddresses = async () => {
        try {
            const { data } = await axios.get('/api/userAddress/allAddresses')
            if (data.success) {
                setAddress(data.address)
                if (data.address.length > 0) {
                    setSelectedAddress(data.address[0])
                }
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user) {
            getAddresses()
        }
    }, [user])
    return products.length > 0 && cart ? (
        <div className="flex flex-col md:flex-row mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">{cartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select onChange={(e) => { updateCartItem(product._id, Number(e.target.value)) }} value={cart[product._id]} className='outline-none'>
                                            {Array(cart[product._id] > 9 ? cart[product._id] > 9 : 9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button className="cursor-pointer mx-auto">
                            <img onClick={() => removeFromCart(product._id)} src={assets.remove_icon} alt="" className="inline-block w-6 h-6" />
                        </button>
                    </div>)
                )}

                <button onClick={() => { navigate('/products'); scrollTo(0, 0); }} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                    <img src={assets.arrow_right_icon_colored} className="group-hover:-transition-x-1 transition" alt="" />
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}` : "No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {Address.map(address => (
                                    <p onClick={() => { setSelectedAddress(address); setShowAddress(false) }} className="text-gray-500 p-2 hover:bg-gray-100">
                                        {address.street},{address.city},{address.state},{address.country}
                                    </p>))}
                                <p onClick={() => { setShowAddress(false); navigate("/Address") }} className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={(e) => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency} {cartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency} {cartAmount() * 2 / 100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency} {cartAmount() + cartAmount() * 2 / 100}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                    {paymentOption == "COD" ? "Place Order" : "Proceed to checkout"}
                </button>
            </div>
        </div>
    ) : null
}

export default Cart