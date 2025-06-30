import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
const Login = () => {
    const {setShowUserLogin,setUser,axios,navigate}=useContext(AppContext);
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [type,setType]=useState(true)
    const handleLogin=async(event)=>{
        try {
            event.preventDefault();
            const {data}=await axios.post(`/api/users/${state}`,{name,email,password})
            if(data.success){
                setUser(data.user)
                setShowUserLogin(false)
                navigate('/')
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div onClick={()=>{setShowUserLogin(false)}} className="fixed top-0 bottom-0 left-0 right-0 flex items-center z-30 text-sm text-gray-600 bg-black/10">
      <form onSubmit={handleLogin} onClick={(e)=>{e.stopPropagation()}} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <div className="relative">
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type={type?"password":"text"} required />
                <img src={type?assets.eye-open:assets.eye-close} className="absolute w-5 h-5 top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"  onClick={() => setType(!type)} />
                </div>
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    </div>
  )
}

export default Login
