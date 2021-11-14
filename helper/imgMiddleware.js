const multer=require('multer')

//this section is responsble for place save image and rename file 
const storage=multer.diskStorage({
    //this section responsble on the place save image
    destination:function(req,file,cb){
        //this null to error message 
        cb(null,'public/media/img')
    },/* end of distination */

    //this section responsble on rename filename to uniqeName
    filename:function(req,file,cb){
        const uniqeName=Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,file.fieldname+uniqeName)
    }/* end of filename */
})/* end of diskStorage */

const filterImg= (req, file, cb)=> {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
        cb(null,true)
    }else{
        cb(new Error("unsupproted files"),false)
    }/* end of if */
}/* /filterImg */

const upload = multer({ 
    storage: storage ,
    limits:{
        fileSize:1024*1024*15 /* this limit to detrmain file size and real size here 15mb */
    },
    fileFilter:filterImg 
})/* end of upload */

module.exports={upload:upload}