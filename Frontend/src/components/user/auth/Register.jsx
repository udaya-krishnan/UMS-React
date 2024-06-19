import React, { useState ,useEffect} from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { registerUser } from "../../../redux/userRedux/userthunk";
import registerValidation from "../../../validation/registerValidation";
import { useNavigate ,Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

function Register() {

  const navigate=useNavigate()

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confrim, setConfrim] = useState("");
  const userData=useSelector((store)=>store.user.data)

  const toggle = () => {
    setOpen(!open);
  };
  const toggle2 = () => {
    setOpen2(!open2);
  };

  

    useEffect(()=>{
      if(userData){
        navigate('/home')
      }
    },[userData])



 async function handleSubmit(e) {
    e.preventDefault();
    
    const validationsucess=await registerValidation({name,email,mobile,password,confrim,toast})
    if(validationsucess===true){
      const response=await registerUser({name,email,mobile,password,toast})
      if(response===true){
        navigate('/');
      }
    }
    
    
  }

  return (
    <div className="flex items-center justify-center w-full h-svh bg-white">
      <ToastContainer/>
      <div className="bg-white w-3/5 h-5/6  border-0 rounded-2xl ">
        <div>
          <h2 className="font-sans mt-2 mb-7 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Create Your Account
          </h2>
        </div>
        <div className="mt-2">
          <form className="flex items-center justify-center flex-col space-y-6">
            
            <div className="mt-5">
              <label
                htmlFor="name"
                className="font-sans block text-sm font-medium mb-2 text-black"
              >
                Name:
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="border-b-2 w-80 h-8 focus:outline-none  focus:border-b-black placeholder:font-sans placeholder:font-light "
                placeholder=" Name"
              />
              
            </div>
            <div className="mt-5">
              <label
                htmlFor="name"
                className="font-sans block text-sm font-medium mb-2 text-black"
              >
                Email Address:
              </label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="border-b-2 w-80 h-8 focus:outline-none  focus:border-b-black placeholder:font-sans placeholder:font-light "
                placeholder="Email Address"
               
              />
              
            </div>
            <div className="mt-5">
              <label
                htmlFor="name"
                className="font-sans block text-sm font-medium mb-2 text-black"
              >
                Mobile:
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                
                className="border-b-2 w-80 h-8 focus:outline-none  focus:border-b-black placeholder:font-sans placeholder:font-light "
                placeholder="Mobile Number"
              />
              
            </div>
            <div className="mt-5 relative">
              <label
                htmlFor="name"
                className="font-sans block text-sm font-medium mb-2 text-black"
              >
                Password:
              </label>
              <input
                type={open === false ? "password" : "text"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="border-b-2 w-80 h-8 focus:outline-none  focus:border-b-black placeholder:font-sans placeholder:font-light  "
                placeholder="Password"
              />
             
              <div className="absolute top-1 right-1 mt-5 ">
                {open === false ? (
                  <IoIosEyeOff onClick={toggle} className="h-6 w-6" />
                ) : (
                  <IoIosEye onClick={toggle} className="h-6 w-6" />
                )}
              </div>
            </div>
            <div className="mt-5 relative">
              <label
                htmlFor="name"
                className="font-sans block text-sm font-medium mb-2 text-black"
              >
                Confirm Password:
              </label>
              <input
                type={open2 === false ? "password" : "text"}
                onChange={(e) => {
                  setConfrim(e.target.value);
                }}
                className="border-b-2 w-80 h-8 focus:outline-none  focus:border-b-black placeholder:font-sans placeholder:font-light  "
                placeholder="Confirm Password"
              />
             
              <div className="absolute top-1 right-1 mt-5 ">
                {open2 === false ? (
                  <IoIosEyeOff onClick={toggle2} className="h-6 w-6" />
                ) : (
                  <IoIosEye onClick={toggle2} className="h-6 w-6" />
                )}
              </div>
            </div>

            <div>
              <button
                className="bg-white text-black w-28  ml-16 font-sans h-10 font-medium hover:bg-black hover:text-white "
                onClick={handleSubmit}
              >
                Sign up
              </button>
              <div>
                <Link to={'/'} className="text-blue-800 underline">Already have an account? Sign In</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
