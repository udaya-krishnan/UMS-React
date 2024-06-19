import React, { useEffect } from 'react'
import AdminHome from '../../components/admin/AdminHome'
import AdminHeader from '../../components/common/AdminHeader'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Admin() {
  // const token=useSelector((store)=>store.admin.token)
  // const navigate=useNavigate()
 
  // useEffect(()=>{
 
  //   if(!token){
  //     navigate('/admin')
  //   }
  // },[])

  return (
    <div>
    <AdminHeader/>
    <AdminHome/>
    </div>
  )
}

export default Admin