/* import axios from 'axios' */

window.onload = function () {
  captchaVerifier();
};

function captchaVerifier() {
  console.log("captchaVerifier ...");
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );
  recaptchaVerifier.render();
}/* end of captchaVerifier */

const sendButton = document.getElementById("send");
sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  const appVerifier = window.recaptchaVerifier;
  const phoneNumber = document.getElementById("phone");
  firebase.auth().signInWithPhoneNumber(phoneNumber.value, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      const verify = document.getElementById("verify");
      const verfiyCode = document.getElementsByClassName("verfiyCode")[0];
      verfiyCode.style.zIndex = "4";
      verify.addEventListener("click", async function (e) {
        e.preventDefault();
        const code = document.getElementById("code").value;
        confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log("user :", user.uid);
            //here we pass two var into header of axios
            axios.defaults.headers.common.token = user.ma;
            axios.post("/login")
            .then(res=>{if (res) {
              
              if(res){
                window.location.href="/"
              }
            }})/* end of then */
            .catch((err) => console.log(err));
            // ...
          })/* end of catch */
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            delete axios.defaults.headers.common.token
            delete axios.defaults.headers.common.uid
            /* axios.get("/")
            .then(res=>{if (res) {
              console.log(res);
            }}) */
            console.log("error :", error);
          });
      });/* end of listener to verify*/

      //window.confirmationResult = confirmationResult;
      // ...
    })
    .catch((error) => {
      // Error; SMS not sent
      // ...
      console.log(error);
    });
});/* end event listener of sendButton */
