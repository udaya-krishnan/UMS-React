import { data } from "autoprefixer"

const adminValidation=({email,pass,toast})=>{

    const trimEmail=email.trim()
    const trimPass=pass.trim()
   
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
   
 
    
    if (trimEmail === '' ||  trimPass === '') {
        return toast.error('All Fields Are Required', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
    }  else if (!emailRegex.test(trimEmail)) {
        return toast.error('Invalid Email', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
    }else {
        return true;
    }
    

}

export default adminValidation