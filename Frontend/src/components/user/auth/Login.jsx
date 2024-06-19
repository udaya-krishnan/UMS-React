import React, { useEffect, useState } from "react";
import {useNavigate ,Link} from 'react-router-dom'
import { ToastContainer,toast } from "react-toastify";
import { authLogin } from "../../../redux/userRedux/userthunk";
import { useDispatch ,useSelector} from "react-redux";


function Login() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userData=useSelector((store)=>store.user.data)

    useEffect(()=>{
      if(userData){
        navigate('/home')
      }
    },[userData])

    async function handleSubmit(e){
        e.preventDefault();
        if(email==''||password==''){
            return toast.error('Enter Email and Password', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
        }else {
             dispatch(authLogin({email,password,toast}))
        }
    }

  return (
    <div className="flex items-center justify-center w-full h-svh bg-white">
        <ToastContainer/>
      <div className="bg-white w-3/5 h-5/6 mt-10 border-0 rounded-2xl ">
        <div>
          <h2 className="font-sans mt-10 mb-7 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Login Your Account
          </h2>
        </div>
        <div className="mt-10">
          <form
            action=""
            className="flex items-center justify-center flex-col space-y-6"
          >
            <div className="mt-10">
              <label
                htmlFor="name"
                className="font-sans block text-sm font-medium mb-2 text-black"
              >
                Email Address:
              </label>
              <input
                type="email"
                className="border-b-2 w-80 h-8 focus:outline-none  focus:border-b-black placeholder:font-sans placeholder:font-light "
                placeholder="Email Address"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="mt-1 mb-5">
              <label
                htmlFor="name"
                className="font-sans block text-sm font-medium mb-2 text-black"
              >
                Password:
              </label>
              <input
                type="password"
                className="border-b-2 w-80 h-8 focus:outline-none  focus:border-b-black placeholder:font-sans placeholder:font-light "
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div>
              <button className="bg-white text-black w-28 ml-28 font-sans h-10 font-medium hover:bg-black hover:text-white" onClick={handleSubmit}>
                Sign in
              </button>
              <div className="mt-5"> 
             <span>Don't have an account?  <Link to={'/register'} className="text-blue-800 underline">Sign up and get started!</Link> </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
