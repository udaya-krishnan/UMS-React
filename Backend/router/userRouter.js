const express=require('express')
const userRouter=express.Router()
const userCotroller=require('../controller/userController')
const upload=require('../utils/multer')





userRouter.post('/registerPost',userCotroller.registerUser)
            .post('/verifyLogin',userCotroller.verifyUser)
            .post('/addImage',upload.single('file'),userCotroller.addImage)
            .post('/profileEdit',userCotroller.profileEdit)


 module.exports= userRouter