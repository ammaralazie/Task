const model=require('../models')
const op = require("sequelize").Op;
const moment=require('moment')




function room(req,res){
    res.render('chat/chatRoom')
}/* end of room */

async function getProfile(profile_id){
    if(profile_id){
        const profile=await model.Profile.findOne({where:{id:profile_id}}).catch(err=>console.log(err))
       return profile
    }//end of if
}/* end of getProfile */

//this function to get all messages between send and racive user
async function getMessages(req,res){

    const send_id=await model.Profile.findOne({where:{userId:req.session.info.user.user_id}}).catch(err=>console.log(err))
    const raciver=await model.Profile.findOne({where:{id:req.body.racive_user}}).catch(err=>console.log(err))
    
    const messages=await model.Message
    .findAll({
        where:{sendId:{[op.or]:[send_id.id,req.body.racive_user]},raciveId:{[op.or]:[send_id.id,req.body.racive_user]}},
        order:[['createdAt', 'DESC']],
        include:{model:model.Profile,as:'SProfiles'}
    }).catch(err=>console.log(err))
    
    let count=0
    messages.forEach(msg=>{
        msg.date=moment(msg.createdAt, "YYYYMMDD").fromNow()
        count+=1
    })
    

    //this section for right side of chatRaom
    const getProfiles=await model.Message
    .findAll({
        where:{sendId:send_id.id},
        limit:1,
        include:{model:model.Profile,as:'RProfiles'}
    }).catch(err=>console.log(err))


    return res.render('chat/chatRoom',{
        messages:messages,
        user:send_id,
        count:count,
        raciver:raciver,
        getProfiles:getProfiles
    })
}// end of getMessages

async function createMsg(msg){
    if(msg.content){
        const nweMsg=await model.Message.create({
            sendId:msg.sndId,
            raciveId:msg.rcvId,
            content:msg.content
        }).catch(err=>console.log(err))/* end of create */
        nweMsg.date=moment(msg.createdAt, "YYYYMMDD").fromNow()
        return nweMsg
    }else{
        return {content:false,typing:false}
    }
    

}/* /createMsg */

module.exports={
    room:room,
    getProfile:getProfile,
    getMessages:getMessages,
    createMsg:createMsg
}