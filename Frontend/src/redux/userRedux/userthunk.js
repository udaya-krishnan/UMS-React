import axios from "axios"
 const url='http://localhost:5555'

import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser=async({name,email,mobile,password,toast})=>{
    console.log(name,email,password,mobile);
    const response=await axios.post(`${url}/registerPost`,{name,email,mobile,password})
    if(response.data.status==='emailExits'){
        return toast.error('Email Aready Exists', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
    }else if(response.data.status==='sucess'){
        return true
    }
    
}

export const authLogin=createAsyncThunk(
    'user/authLogin',
    async ({email,password,toast},{rejectWithValue})=>{
        const response=await axios.post(`${url}/verifyLogin`,{email,password})
        

        if(response.data.status=='usernotfound'){
            toast.error('User Not Found', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
            return rejectWithValue('user not found')
        }else if(response.data.status==='incorrect'){
            toast.error('Incorrect Password', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
            return rejectWithValue('incorrect')
        }else{
            return response.data
        }
    }
)

export const addImage=createAsyncThunk(
    'user/addImage',
    async({image,userId})=>{
        const formData=new FormData()
        formData.append('file',image)
        formData.append('userId',userId)

        const response=await axios.post(`${url}/addImage`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        return response.data
    }
    
)

export const profileEdit=createAsyncThunk(
    'user/profileEdit',
    async({formData,userId})=>{
        console.log(formData,userId)
        const response = await axios.post(`${url}/profileEdit`, {
            ...formData,
            userId,
        });
        return response.data
    }
)

