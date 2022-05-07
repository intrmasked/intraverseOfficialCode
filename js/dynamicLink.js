import {
    getAuth,
    
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
  
  import {
    getFirestore,
  collection,
  setDoc,
  getDoc,
  getDocs,
  doc,
  query, orderBy, limit,
  where
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
  
  
  import { initializeApp 
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
  
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
  
  document.addEventListener('DOMContentLoaded', () => {
  
  
  
    // TODO: Implement getParameterByName()
  
    // Get the action to complete.
    const mode = getParameterByName('mode');
    // Get the one-time code from the query parameter.
    const actionCode = getParameterByName('oobCode');
    // (Optional) Get the continue URL from the query parameter if available.
    
    // Configure the Firebase SDK.
    // This is the minimum configuration required for the API to be used.
    
  
    // Handle the user management action.
    switch (mode) {
      case 'refCode':
        // Display reset password handler and UI.
        checkAndRedirect(auth, actionCode);
        break;
      
        // Error: invalid mode.
    }
  }, false);
  


  export async function checkAndRedirect(auth,actionCode)
  {
      document.getElementById("tag").innerHTML = "Checking if Refferal Exists";

      localStorage.setItem('dynamicAccessReferral',actionCode);
      window.location.href = '/registerpage.html'
    


  }
