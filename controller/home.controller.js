const model=require('../models')
const op = require('sequelize').Op;
//here place your function 

async function index(req,res){
    /*   console.log(req.session.info.user) */
    //get all profiles
    const allProfile=await model.Profile.findAll({
        where:{userId:{[op.ne]:req.session.info.user.user_id}}
    }).catch(err=>console.log(err))


    model.Profile.findOne({
        where:{userId:req.session.info.user.user_id}
    })
    .then(reslt=>{
        if(!reslt){
            
            model.Profile.create({
            first_name:'user',
            last_name:'',
            phone:req.session.info.user.phone_number,
            userId:req.session.info.user.user_id
        })
        .then(reslt=>{if(reslt){res.render('index',{profile:reslt,allProfile:allProfile})}})
        .catch(err=>{console.log(err)})/* end of create profile */

    }else{

        model.Profile.findOne({
            where:{userId:req.session.info.user.user_id}
        }).then(reslt=>{ res.render('index',{profile:reslt,allProfile:allProfile})})/* end of if */
        .catch(err=>{console.log(err)})/* end of catch */

    }//end of if
    })/* end of then */
    .catch(err=>{req.flash('catchErr',err)})/* end of catch */

  }/* end of index */


function login(req,res){
    /* console.log('login ... :',req.session.info) */
    res.render('login')
}/* end of login */

//this function only for save user auth in session
function postLogin(req,res){
    res.status(200).json('success')
}/* end of postLogin */

function logout(req,res){
    //you can make expire token and
    //check in middlware this token is expire or no
    req.session.info={}
    res.redirect('/login')
}/* end of logout */





module.exports={
    //here export your function as object key and value
    login:login,
    postLogin:postLogin,
    index:index,
    logout:logout
}