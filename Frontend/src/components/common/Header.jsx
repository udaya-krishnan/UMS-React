import React from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { Logout } from "../../redux/userRedux/userSlice";
import Swal from 'sweetalert2';

function Header() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  function logout(){
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: "You will need to log in again to access your account.",
    
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#000',
      confirmButtonText: 'Yes, Logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logout',
          confirmButtonColor:'#000'
        }).then((result)=>{
          dispatch(Logout())
          navigate('/')
        })
      }
    })

  }
  return (
    <div className="bg-black w-full h-16 relative">
      <button onClick={logout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-8 h-8 absolute right-0 mr-5 top-1/2 transform -translate-y-1/2"
        >
          <path
            fill="#ffffff"
            d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
          />
        </svg>
      </button>
    </div>
  );
}

export default Header;
