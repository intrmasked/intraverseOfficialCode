import {
  getAuth,
  checkActionCode, applyActionCode, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

import {
  getFirestore,
  collection,
  setDoc,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";


import { initializeApp 
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";

import {
  getFunctions,
  httpsCallable
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-functions.js";


export function getParameterByName(name, url) {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const config = {
  apiKey: "AIzaSyC5jlQtwvTmak3eh6vseiXd4eSGX_o01m8",
  authDomain: "intraverse-3aa8e.firebaseapp.com",
  projectId: "intraverse-3aa8e",
  storageBucket: "intraverse-3aa8e.appspot.com",
  messagingSenderId: "1042168311165",
  appId: "1:1042168311165:web:9786308d1dfd448fed7014",
  measurementId: "G-ZE3VX2ZB8F"
                          // snippet found in the Firebase console.
};
const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore();
const functions = getFunctions(app,'us-east1');

document.addEventListener('DOMContentLoaded', () => {



  // TODO: Implement getParameterByName()

  // Get the action to complete.
  const mode = getParameterByName('mode');
  // Get the one-time code from the query parameter.
  const actionCode = getParameterByName('oobCode');
  // (Optional) Get the continue URL from the query parameter if available.
  const continueUrl = getParameterByName('continueUrl');
  // (Optional) Get the language code if available.
  const lang = getParameterByName('lang') || 'en';

  const charChosen = getParameterByName('charCode');
  // Configure the Firebase SDK.
  // This is the minimum configuration required for the API to be used.
  

  // Handle the user management action.
  switch (mode) {
    case 'resetPassword':
      // Display reset password handler and UI.
      handleResetPassword(auth, actionCode, continueUrl, lang);
      break;
    case 'recoverEmail':
      // Display email recovery handler and UI.
      handleRecoverEmail(auth, actionCode, lang);
      break;
    case 'verifyEmail':
      // Display email verification handler and UI.
      handleVerifyEmail(auth, actionCode, continueUrl, lang);
      break;
    case 'saveData':
      saveUserData(auth,actionCode,charChosen);
      break;
    case 'saveDataContest':
      saveContestData(auth,actionCode);
    default:
      // Error: invalid mode.
  }
}, false);


export function handleVerifyEmail(auth, actionCode, continueUrl, lang) {

  document.getElementById("tag").innerHTML = "Verifying Email...";  // Verify the password reset code is valid.

  // Localize the UI to the selected language as determined by the lang
  // parameter.
  // Try to apply the email verification code.
  applyActionCode(auth, actionCode).then((resp) => {
  document.getElementById("tag").innerHTML = "Email Verified..";  // Verify the password reset code is valid.

    location.href='login.html';
  }).catch((error) => {

  document.getElementById("tag").innerHTML = "Link Expired";  // Verify the password reset code is valid.

    // Code is invalid or expired. Ask the user to verify their email address
    // again.
  });
}

export function handleResetPassword(auth, actionCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  document.getElementById("tag").innerHTML = "Resetting Password...";  // Verify the password reset code is valid.
  verifyPasswordResetCode(auth, actionCode).then((email) => {
  document.getElementById("tag").innerHTML = "Password Reset.";  // Verify the password reset code is valid.

    const accountEmail = email;
    localStorage.setItem('actionCode',actionCode);
    location.href='changePassword.html';
    localStorage.setItem('auth',auth);
    // TODO: Show the reset screen with the user's email and ask the user for
    // the new password.
    const newPassword = "...";

    // Save the new password.
    
  }).catch((error) =>{
  document.getElementById("tag").innerHTML = "Link Expired";  // Verify the password reset code is valid.

  });
}








$('#next_btn').click(function(){
  

  $(this).find('i').css({"display":" -moz-grid-line"});
  console.log("pressed")
  confirmPasswordReset(auth, localStorage.getItem('actionCode'), localStorage.getItem('passwordRecovery')).then(async (resp) => {
    $(this).find('i').css('display','none');
    location.href='login.html';

  }).catch((error) => {
    toastr.error('The user doesnot exists', 'Error!',{timeOut:9500})
    
  });
  
  //  alert(password);
  //  alert(localStorage.getItem('email'))
});