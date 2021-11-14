const express=require('express')
const route=express.Router()


//here import your controller and use it 
const homeController=require('../controller/home.controller')
const profileController=require('../controller/profile.controller')
const authMiddleware=require('../middleware/authFirebase')
const authSession=require('../middleware/authsessionMiddleware')
const uploadImg=require('../helper/imgMiddleware');
const chatController=require('../controller/chat.controller')

/* 
*route.get('/',yourController.obj)
*/
route.get('/login',homeController.login)
route.post('/login',authMiddleware.authFirebase,homeController.postLogin)
route.get('/logout',authSession.authSession,homeController.logout)
route.get('/',authSession.authSession,homeController.index)

//chat section
route.post('/chat',authSession.authSession,chatController.getMessages)

//profile routes
route.get('/test',authSession.authSession,profileController.socket)
route.get('/:id',authSession.authSession,profileController.yourProfile)
route.get('/edit/:id',authSession.authSession,profileController.editProfile)
route.post('/edit/:id',authSession.authSession,uploadImg.upload.single('img_url'),profileController.updateProfile)




module.exports=route