const express=require('express')
const adminRouter=express.Router()
const adminController=require('../controller/adminController')

adminRouter.post('/adminlogin',adminController.adminLogin)
adminRouter.get('/fetchData',adminController.fetchData)
adminRouter.post('/editUser',adminController.editUser)
adminRouter.post('/deleteUser',adminController.deleteUser)
module.exports= adminRouter