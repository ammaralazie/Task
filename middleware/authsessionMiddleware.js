const admin = require("../fairebase/firebase-connect");


async function authSession(req, res, next) {

  try {
    if (req.session.info) {
      const decodedValue = await admin
        .auth()
        .verifyIdToken(req.session.info.token);
        if(decodedValue){
          next();
        }else{
          req.session.info = {};
          req.flash("time_out", "your account expired plase login and try agine");
          res.redirect("/login");
        }
    } else {
      req.session.info = {};
      req.flash("time_out", "your account expired plase login and try agine");
      res.redirect("/login");
    }
    /* end of if */
  } catch (e) {
    req.session.info = {};
    req.flash("time_out", "your account expired plase login and try agine");
    res.redirect("/login");
  }//end of try catch
} //end of authSession

module.exports = { authSession: authSession };
