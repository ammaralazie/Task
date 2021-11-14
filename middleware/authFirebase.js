const admin=require('../fairebase/firebase-connect')

async function authFirebase(req,res,next){
    try{
        if (req.headers.token){
            const token=req.headers.token
            const decodedValue=await admin.auth().verifyIdToken(token)
            if(decodedValue){
                req.session.info={'token':token,'user':decodedValue}
                next()
            }
        }else{
            req.session.info={}
            res.redirect('/login')
        }/* end of if */
    }catch(e){
        res.redirect('/login')
    }/* end of catch */
}/* end of authFirebase */

module.exports={
    authFirebase:authFirebase
}

