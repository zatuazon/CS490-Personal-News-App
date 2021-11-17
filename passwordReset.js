// password reset function
function sendPasswordResetEmail(){
    // variable calls input email
    const email = document.getElementById("resetEmail").value
  // if email is valid in database
    const status = document.getElementById("status")
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          status.innerText = "Email Sent."
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
  
          status.innerText =`${errorCode} - ${errorMessage}`
        });
  }
  