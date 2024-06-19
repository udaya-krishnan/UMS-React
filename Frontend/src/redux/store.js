import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userRedux/userSlice";
import adminSlice from "./adminRedux/adminSlice";

const configStore=configureStore({
    reducer:{
        user:userSlice,
        admin:adminSlice
    }
    
})

export default configStore