import { data } from "autoprefixer"

const registerValidation=({name,email,mobile,password,confrim,toast})=>{
    const trimName=name.trim()
    const trimEmail=email.trim()
    const trimMobile=mobile.trim()
    const trimPass=password.trim()
    const trimConfirm=confrim.trim()
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const mobileRegex = /^\+?[1-9]\d{1,14}$/;
    const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (trimConfirm === '' || trimEmail === '' || trimName === '' || trimMobile === '' || trimPass === '') {
        return toast.error('All Fields Are Required', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
    } else if (trimConfirm !== trimPass) {
        return toast.error('Confirm Password Not Valid', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
    } else if (!emailRegex.test(trimEmail)) {
        return toast.error('Invalid Email', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
    } else if (!mobileRegex.test(trimMobile)) {
        return toast.error('Invalid Mobile', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
    } else if (!passRegex.test(trimPass)) {
        return toast.error('Password must be strong', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
    } else {
        return true;
    }
    

}

export default registerValidation