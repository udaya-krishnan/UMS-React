const User=require('../models/User')
const {generateToken}=require('../config')

const adminLogin=async(req,res)=>{
    try {
        const {Email,password}=req.body
        console.log(Email,password);

        const adminEmail=process.env.ADMIN_EMAIL
        const adminPass=process.env.ADMIN_PASS

        if(adminEmail===Email){
            if(adminPass===password){
                const token =await generateToken({email:Email})
                const userData=await User.find({})
                res.json({token:token,userData:userData})
            }else{
                res.json({status:'pass'})
            }
        }else{
            res.json({status:'email'})
        }

    } catch (error) {
        console.log(error.message)
    }
}

const fetchData=async(req,res)=>{
    try {
        const data=await User.find({})
        res.json({data:data})
    } catch (error) {
        console.log(error.message)
    }
}

const editUser=async(req,res)=>{
    try {
        const name=req.body.name
        const id=req.body.userId
        const updateUser=await User.updateOne({_id:id},{ name: name })
            console.log(updateUser);
            res.json(updateUser)
    } catch (error) {
       console.log(error) 
    }
}

const deleteUser=async(req,res)=>{
    try {
        const id=req.body.userId
        const removeUser=await User.deleteOne({_id:id})
        res.json(removeUser)
    } catch (error) {
        
    }
}

module.exports={
    adminLogin,
    fetchData,
    editUser,
    deleteUser
}