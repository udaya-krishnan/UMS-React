import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer,toast } from 'react-toastify'
import { adminLogin } from '../../redux/adminRedux/adminthunk'
import { useNavigate } from 'react-router-dom'
import adminValidation from '../../validation/adminValidation'

function AdminLogin() {
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
    const navigate=useNavigate()
    const userData=useSelector((store)=>store.admin.userData)

    useEffect(()=>{
        if(userData.length>0){
          console.log('render');
            navigate('/admin/home')
        }
    },[userData])

    const dispatch=useDispatch()

  function handleSubmit(e){
    e.preventDefault()
    const res=adminValidation({email,pass,toast})
    if(res===true){
      dispatch(adminLogin({email,pass,toast}))
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
                onChange={(e)=>setPass(e.target.value)}
              />
            </div>
            <div>
              <button className="bg-white text-black w-28  font-sans h-10 font-medium hover:bg-black hover:text-white" onClick={handleSubmit}>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin