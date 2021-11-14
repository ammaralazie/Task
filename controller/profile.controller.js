const model=require('../models')
const moment=require('moment')
const fs=require('fs')
async function yourProfile(req,res){
    let update=''
    const profile=await model.Profile.findOne({where:{id:req.params.id}})
    .catch(err=>{console.log(err)})
    if(!!profile){
        if(req.session.info.user.user_id == profile.userId){
            profile.date=moment(profile.createdAt, "YYYYMMDD").fromNow()
            res.locals.update=req.flash('update')
            res.locals.user=profile
            res.render('profile/yourProfile',{profile:profile})
        }else{
            res.render('profile/yourProfile',{profile:profile})
        } /* end of if for check user */
        
    }//end of if
}//yourProfile

async function editProfile(req,res){
    const profile=await model.Profile.findOne({where:{id:req.params.id}})
    .catch(err=>{console.log(err)})
    if(!!profile){
        if(req.session.info.user.user_id == profile.userId){
            res.render('profile/editProfile',{profile:profile})
        }else{
            res.redirect('/')
        }/* end of check user */
    }//end of if
}//yourProfile

async function updateProfile(req,res){

    const profile= await model.Profile.findOne(
        {where:{id:req.params.id}})/* end of get user */
        if(req.session.info.user.user_id == profile.userId) {
            
               let newProfile={}
               console.log('profile :',profile)
               if(req.file){
                   console.log('req.file :',req.file)
                if(profile.img_url){
                    fs.unlink('public/media/img/'+profile.img_url,err=>{console.log(err)})
                   }/* end of if */
                newProfile= await model.Profile.update(
                    {
                        first_name:req.body.first_name,
                        last_name:req.body.last_name,
                        pio:req.body.pio,
                        img_url:req.file.filename 
                    },
                    {where:{id:req.params.id}})
                    .catch(err=>console.log(err))/* end of newProfile */
               }else{
                    newProfile= await model.Profile.update(
                    {
                        first_name:req.body.first_name,
                        last_name:req.body.last_name,
                        pio:req.body.pio
                    },
                    {where:{id:req.params.id}})
                    .catch(err=>console.log(err))/* end of newProfile */
               }
               /* enf of if filename */
            
                if(newProfile){
                    req.flash('update','your profile updated successfly')
                    res.redirect('/'+req.params.id)
                }/* end of if */
        }else{
            res.redirect('/login')
        }/* end of check user */

}/* end of updateProfile */

async function socket(req,res){
    const profile =await model.Profile.findOne({where:{id:1}})
    console.log("sokit function is work")
    res.render('chat/socket',{profile:profile})
}/* /socket */


module.exports={
    yourProfile:yourProfile,
    editProfile:editProfile,
    updateProfile:updateProfile,
    socket:socket
}