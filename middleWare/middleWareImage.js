const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}-${file.originalname}`)
    }
})

const fileFilter=(req,file,callback)=>{
    if(file.mimetype=='image/png' || file.mimetype=='image/jpg' || file.mimetype=='image/jpeg' || file.mimetype=='image/webp'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('only accepts png/jpg/jpeg/webp file format'))
    }
}

const uploads=multer({storage,fileFilter})
module.exports=uploads

