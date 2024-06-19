const multer=require('multer')
const path=require('path')


const storage=multer.diskStorage({
    
    destination:function(req,file,cb){
        console.log('inside function');
        cb(null,path.join(__dirname,'../../Frontend/public/userImage'))
    },
    filename:function(req,file,cb){
        const name= Date.now()+'-'+file.originalname;
        cb(null,name)
    }
})

const upload = multer({ storage: storage });

module.exports=upload