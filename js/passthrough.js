var playerPosition = localStorage.getItem("PlayerPosition");
let pathname=window.location.pathname;

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
  

$(document).ready(function(){

    var timeLastPlayed = localStorage.getItem('gameFinishTime');

    

// add 1 day to today
var currentTime = new Date();
var timeInSeconds = currentTime.getTime()/1000;
var timeDiffrence = timeInSeconds - timeLastPlayed;
var timeInHours = timeDiffrence * 0.000277778;
var hoursRemain = 24 - timeInHours;
var clicked = false;
var calledOnce = false;
var notEnoughCoins = true;
console.log("time you have to wait is " + Math.round(hoursRemain) +"hrs")
   if(calledOnce == false)
{
   /*    if(23 < 24)
    {
document.getElementById('time').innerHTML='Time Remaining to FREE ACCESS IS '+Math.round(hoursRemain) +" hrs";

        document.getElementById('enterGame').innerHTML = "CONTINUE FOR 20 INTRA";
        $("#enterGame").click(async function (){
          if(clicked == false)
          { 
            console.log("called once")
            clicked = true
             const docRef = doc(db,"users",localStorage.getItem("uid"));
             const otherWallet = doc(db,"users",'g2PKf5MM4nOpDR1aQgI5O1OhJzg2');
             const burnWallet = await getDoc(otherWallet);
         const docSnap = await getDoc(docRef);
  
            
        const docData = docSnap.data();
        const otherWalletData = burnWallet.data();
        var currentCoins =docData.userCoins;
        var burnCoins = otherWalletData.userCoins;
            
        if(currentCoins >= 20)
       { 
         var newCoins = currentCoins -  20;
        var burnAdder = burnCoins + 20;
        
        
        await updateDoc(docRef,{

          userCoins:newCoins, 
          

      });
      await updateDoc(otherWallet,{
        userCoins:burnAdder,
      });

     window.location.href = '/IGO1/index.html';

      }
    else {
      openPopUp(clicked);
    }
      }
        });
    }
    else 
    { */
        console.log('freeAccess is enabled');
        document.getElementById('time').innerHTML='You Have Free Access!!';

        document.getElementById('enterGame').innerHTML = "CONTINUE";
        $("#enterGame").click(function(){
          if(clicked == false)
          {
            clicked = true;
            console.log("clicked once ");
        
         window.location.href = '/IGO1/index.html';
      }
  
        });

    
    calledOnce = true;
  }
    console.log(playerPosition);
     if(playerPosition<= 10000000000000000)
     {
         console.log("accessGive");
         
         localStorage.setItem("accessAllowed","True");

         document.getElementById('tag').innerHTML = "Launch Game";
       

     }
});


function openPopUp(click)
{
  console.log("called");

  $("#warning").css('display','block');
  $("#discordHolder").css('display','block');
  document.getElementById('enterGame').innerHTML = "CONTINUE TO DASHBOARD";
  $("#enterGame").click(function(){
    window.location.href = '/dashboard.html';
  })


}
$("#discordButton").click(function()
{
 window.location.href = 'https://discord.gg/tkkq7jznpP';
})