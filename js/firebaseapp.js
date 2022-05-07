// Import the functions you need from the SDKs you need
import { initializeApp 
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import {
  getFirestore,
  collection,
  setDoc,
  getDoc,
  getDocs,
  doc,
  query, orderBy,
  where
 
  
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

import {
    getFunctions,
    httpsCallable
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-functions.js";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5jlQtwvTmak3eh6vseiXd4eSGX_o01m8",
  authDomain: "intraverse-3aa8e.firebaseapp.com",
  projectId: "intraverse-3aa8e",
  storageBucket: "intraverse-3aa8e.appspot.com",
  messagingSenderId: "1042168311165",
  appId: "1:1042168311165:web:9786308d1dfd448fed7014",
  measurementId: "G-ZE3VX2ZB8F"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const functions = getFunctions(app,'us-east1');

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const refferal = document.querySelector("#refferalText");
let pathname=window.location.pathname;



if(pathname == "/Builds/index.html")
{
  getAuth().onAuthStateChanged(user =>{
    if(!user)
    {
      window.location = '/login.html';
    }
  })
}
// login function
$("#login").click(function () {

  $(this).find('i').css('display','block');
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      $(this).find('i').css('display','none');
      // Signed in
      const user = userCredential.user;

      if (!user.emailVerified) {
        toastr.error('Email not verified', 'Error!',{timeOut:9500})
        sendEmailVerification(auth.currentUser).then(() => {});
      } else if (user.emailVerified) {
        localStorage.setItem('uid',user.uid);
        localStorage.setItem('email',email.value);
        localStorage.setItem('pass',password.value);
       window.location.href = 'dashboard.html';
      }
    })
    .catch((error) => {
      $(this).find('i').css('display','none');
      const errorCode = error.code;
      const errorMessage = error.message;
      toastr.error('Wrong Details', 'Error!',{ timeOut: 9500 })
    });
});

if(pathname == '/referal.html')
{
  if(localStorage.getItem("dynamicAccessReferral") != null)
  {
    var x =localStorage.getItem("dynamicAccessReferral") ;
    toastr.success('REFERRAL CODE ADDED FROM LINK', 'Success!',{ timeOut: 9500 })

    document.getElementById('refferalText').value =x;
  }
  else {
    console.log('no ref found')
  }
}


$("#refButton").click(async function (){

   let refCode=$('input[name=refText]').val();

   if (refCode == "") {
    toastr.error('Please enter Refferal', 'Error!',{ timeOut: 9500 })
  }
  else {

    localStorage.setItem('enteredRef',refCode);
    $(this).find('i').css('display','block');
    subscribeMailChimp();

    
  }
  
});


// create a user
$("#next_btn").click(function () {
  toastr.success('Creating User','Success',{timeOut:9500})
  let email = localStorage.getItem("email");
  let password = localStorage.getItem("password");
  $(this).find('i').css('display','block');
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      localStorage.setItem('uid',user.uid);
      storeData();

      if (!user.emailVerified) {
        
        sendEmailVerification(auth.currentUser).then(() => {
        
          
        });
      }
    })
    .catch((error) => {
      $(this).find('i').css('display','none');
      console.log('here');
      const errorCode = error.code;
      const errorMessage = error.message;
      toastr.error('UserExists!', 'Error!',{ timeOut: 9500 });
      // alert("userexists");
      // ..
    });
    

});


$("#skip").click(function () {
  subscribeMailChimp();
  
});

// logout
$("#logout").click(function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.href = "index.html";
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('uid');
      localStorage.removeItem('enteredRef');
      localStorage.removeItem('dynamicAccessReferral');
      localStorage.removeItem('GetPlayerPosition');
      localStorage.clear();
    })
    .catch((error) => {
      toastr.error('No User Signed It', 'Error!',{ timeOut: 9500 })
      // alert("no user signed it");
    });
});

async function storeData() {
  try {
    
    const docRef = await setDoc(doc(db, "users",localStorage.getItem('uid')), {
      email: localStorage.getItem("email"),
      coins: 0,
      refferalCode: Math.random().toString(36).substr(2, 7),
      userCoins:0,
      refsUsed:0,
      username:localStorage.getItem('username'),
      charChoice:0
    });
    
    window.location.href = 'referal.html';
    toastr.success('User Created','Success!',{timeOut:9500})

    
  } catch (e) {
    console.error("Error adding document: ", e);
  }
 
}


async function sortData()
{ 

  localStorage.setItem('GetPlayerPosition','True');

  var counter = 0;
 var x = [];

var coins = [];
var contestCoins = [];
var contestLeaderboard = [];
 const totalPositionCounter = 1;
 var positionCounter = 1;
  //userData();
  displayData();
  

   var totalCoinsCollected = 0;
  
  const users = collection(db,"users");
  
    const boxCollected = query(users,where("CollectedSpecialBox","==","true"));

    const snapshot = await getDocs(boxCollected);
    snapshot.forEach(doc => {
      console.log(doc.data().username + " referral code  " + doc.data().refferalCode);
      
    });
  
  
  

  
   
  
    const sortedData = query(users, orderBy("userCoins","desc"));
   
    
   

    const querySnapShot = await getDocs(sortedData);
     querySnapShot.forEach((doc) =>{
      counter = counter+1;
      x.push(doc.data());

      
      
    });
    if(x != null)
    {
      localStorage.setItem("xSnap", x);
    }
    
  
    x.forEach(element => {
      
      if(element.refferalCode == localStorage.getItem('refCode'))
      {
       
        document.getElementById("userEmail").innerHTML = element.username;
       if(!isNaN(element.contestCoins))
        {
         document.getElementById("userPoints").innerHTML = (element.userCoins + element.contestCoins);
        }
        else {
          document.getElementById("userPoints").innerHTML = element.userCoins;
        }
       localStorage.setItem('PlayerPosition',positionCounter);
     
       document.getElementById("posUser").innerHTML = positionCounter;
      document.getElementById("userReferrals").innerHTML = element.refsUsed;
      localStorage.setItem("Username",element.username);
      document.getElementById("notifyPos").innerHTML = "Your position is "+positionCounter+"/"+counter+" in the list.";
      localStorage.setItem("totalUsers",totalPositionCounter);
        

      }
      else {
        positionCounter = positionCounter +1;
        
      }
      if(!isNaN(parseFloat(element.userCoins)))
      {

        coins.push(parseFloat(element.userCoins));
       
      }
      if(!isNaN(parseFloat(element.contestCoins)))
      {
        contestCoins.push(parseFloat(element.contestCoins));
      }

    });
      console.log(contestCoins);
      for (let i = 0; i < coins.length; i++) 
        
      {

         totalCoinsCollected += coins[i];
      }
      for (let i = 0; i < contestCoins.length; i++)
      {
        totalCoinsCollected += contestCoins[i];
      }
     

       console.log(totalCoinsCollected);
      var internationalNumberFormat = new Intl.NumberFormat('en-US')

    document.getElementById("firstEmail").innerHTML = x[0].username;
    document.getElementById("firstPoints").innerHTML = x[0].userCoins;
   document.getElementById("firstReferrals").innerHTML = x[0].refsUsed;

    document.getElementById("secondEmail").innerHTML = x[1].username;
    document.getElementById("secondPoints").innerHTML = x[1].userCoins;
   document.getElementById("secondReferrals").innerHTML = x[1].refsUsed;

    document.getElementById("thirdEmail").innerHTML = x[2].username;
    document.getElementById("thirdPoints").innerHTML = x[2].userCoins;
   document.getElementById("thirdReferrals").innerHTML = x[2].refsUsed;

    document.getElementById("fourthEmail").innerHTML = x[3].username;
    document.getElementById("fourthPoints").innerHTML = x[3].userCoins;
   document.getElementById("fourthReferrals").innerHTML = x[3].refsUsed;

   document.getElementById("fifthEmail").innerHTML = x[4].username;
   document.getElementById("fifthPoints").innerHTML = x[4].userCoins;
   document.getElementById("fifthReferrals").innerHTML = x[4].refsUsed;

   document.getElementById("sixthEmail").innerHTML = x[5].username;
   document.getElementById("sixthPoints").innerHTML = x[5].userCoins;
   document.getElementById("sixthReferrals").innerHTML = x[5].refsUsed;

   document.getElementById("seventhEmail").innerHTML = x[6].username;
    document.getElementById("seventhPoints").innerHTML = x[6].userCoins;
    document.getElementById("seventhReferrals").innerHTML = x[6].refsUsed;

    document.getElementById("eighthEmail").innerHTML = x[7].username;
    document.getElementById("eighthPoints").innerHTML = x[7].userCoins;
    document.getElementById("eighthReferrals").innerHTML = x[7].refsUsed;

    document.getElementById("ninthEmail").innerHTML = x[8].username;
    document.getElementById("ninthPoints").innerHTML = x[8].userCoins;
    document.getElementById("ninthReferrals").innerHTML = x[8].refsUsed;

    document.getElementById("tenthEmail").innerHTML = x[9].username;
    document.getElementById("tenthPoints").innerHTML = x[9].userCoins;
    document.getElementById("tenthReferrals").innerHTML = x[9].refsUsed;
    
    

   document.getElementById("coinsCollected").innerHTML = "COINS COLLECTED: \n "+internationalNumberFormat.format(totalCoinsCollected)
   +"/5,000,000"
  

  
    
   


  
}




// $("#account-body").ready(function () {
//   console.log("called");
//   displayData();
// });&ch

function displayData() {
  

  
  
    getDataFromServer();
    
  
}

// call display data function when account page is open

async function getDataFromServer() {
  console.log('dataFound');

  const docRef = doc(db, "users", localStorage.getItem("uid"));
  const docSnap = await getDoc(docRef);

  

  if(docSnap.exists())
  {
    const datafromServer = docSnap.data();
    localStorage.setItem('dataFromServer',datafromServer);
    localStorage.setItem('charChoice',datafromServer.charChoice);
    localStorage.setItem('ref',datafromServer.refferalCode);
    localStorage.setItem('email',datafromServer.email);
    localStorage.setItem('coins',datafromServer.coins);
    localStorage.setItem('userCoins',datafromServer.userCoins);
    localStorage.setItem('refCode',datafromServer.refferalCode);
    localStorage.setItem('refsUsed',datafromServer.refsUsed);
    localStorage.setItem('currentCoins',datafromServer.userCoins);
    localStorage.setItem('gameFinishTime',datafromServer.gameFinishTime);
    
    if(typeof datafromServer.contestCoins === "undefined")
    {
      console.log("no exist");
      localStorage.removeItem('ContestCoins');
      
    }
    else if (typeof datafromServer.contestCoins !== 'undefined')
    {
      localStorage.setItem('ContestCoins',datafromServer.contestCoins);
    }
  }
  else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

}




if(pathname=='/account.html'){
  getAuth().onAuthStateChanged(user =>{
    if(!user)
    {
      window.location = 'login.html';
    }
  })
    var temp;
    displayData();
    if('ContestCoins' in localStorage)
    {
      console.log('exists')
      temp = localStorage.getItem('ContestCoins');
    }
    else
    {
      console.log('dont be existing')
      temp = 0;
    }

    
    
   
    
    var totalCoins = parseInt(localStorage.getItem('userCoins'));

    document.getElementById("hey").innerHTML = "Hey "+localStorage.getItem("Username") +" !";
    document.getElementById("username").innerHTML = "Username: " +localStorage.getItem("Username");
    document.getElementById("refsUsed").innerHTML = "N. Total Referrals: "+localStorage.getItem('refsUsed');
    document.getElementById("emailfront").innerHTML =
      "Email: " + localStorage.getItem('email');
    document.getElementById("coins").innerHTML =
      "Total points collected: " + localStorage.getItem('coins'); 
      document.getElementById("points").innerHTML =
      totalCoins + " INTRA";
      
 
}
else if(pathname=='/account_ita.html'){
  getAuth().onAuthStateChanged(user =>{
    if(!user)
    {
      window.location = 'login.html';
    }
  })
  displayData();
}
if(pathname == '/earn-more_ita.html')
{ 
  getAuth().onAuthStateChanged(user =>{
    if(!user.emailVerified)
    {
      window.location = 'login.html';
    }
  })
  displayData();

 
  
}
else if(pathname == '/earn-more.html')
{ 
  getAuth().onAuthStateChanged(user =>{
    if(!user)
    {
      window.location = 'login.html';
    }
  })
 
  document.getElementById("ref").innerHTML = localStorage.getItem('refCode');
 // document.getElementById("refLink").innerHTML = ''
  
  
  $('#copyText').text(localStorage.getItem('refCode'));
  $("#telegram").click(function () {
    {
      window.open('https://telegram.me/share/url?url=https://play.intraverse.io/registerpage.html&text='+'HEY! IM PLAYING **INTRAVERSE** %0a Register with my referral code and we will both get rewards  %0a Click here to register: https://play.intraverse.io/registerpage.html %0a Don’t forget the **Referral Code:** ' +localStorage.getItem('refCode'), '_blank');

    }
  })
  $("#whatsapp").click(function () {
    {
      window.open('whatsapp://send?text=HEY! IM PLAYING *INTRAVERSE* %0a Register with my referral code and we will both get rewards %0a Click here to register: https://play.intraverse.io/registerpage.html %0a Don’t forget the *Referral Code: * ' +localStorage.getItem('refCode'),'_blank');

    }
  })
  $("#copylink").click(function(){
    toastr.success("Refferal link copied.", "Success", { timeOut: 5000 });
    copyStringToClipboard('https://play.intraverse.io/referallTransfer.html?mode=refCode&oobCode='+localStorage.getItem('refCode'))
  })

  function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
 }
 
}

if(pathname == '/dashboard.html'   )
{ 
 
  getAuth().onAuthStateChanged(user =>{
    if(!user)
    {
      window.location = 'login.html';
    }
  
    
  })
  
  sortData();
 
  

  
}



if(pathname == '/login.html'  || pathname=='/registerpage.html'  || pathname =='/confirmpassword.html' )
{ 
    
    getAuth().onAuthStateChanged(user =>{
    if(user.emailVerified)
    {
      window.location = 'dashboard.html';
    }
    else if (!user)
    {
      return;
    }
    else if (!user.emailVerified)
    {
      return;
      
    }
  })
}


if(pathname == '/dashboard.html'  || pathname=='/account.html'  || pathname =='/earn-more.html')
{ 
    
    getAuth().onAuthStateChanged(user =>{
    if(!user.emailVerified)
    {
      window.location = 'login.html';
    }
    else if (!user)
    {
      return
    }
  })
}


$("#forgor").click(function () {
  toastr.success('Sending Password Recovery link', 'Success!',{ timeOut: 9500 })
  
  // alert("the link has been sent please wait");
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      toastr.success('Password reset sent', 'Success!',{ timeOut: 9500 })
      window.location.href = '/login.html'
      // alert("password reset sent");
    })
    .catch((error) => {
      console.log(error);
      toastr.error('User is not valid', 'Error!',{ timeOut: 9500 })

      // ..
    });
});


$("#enterArena").click(function(){
  checkDevice();
})


function checkDevice()
{ 
  console.log("called");
   /* Storing user's device details in a variable*/
   let details = navigator.userAgent;
    
   /* Creating a regular expression 
   containing some mobile devices keywords 
   to search it in details string*/
   let regexp = /android|iphone|kindle|ipad/i;

   /* Using test() method to search regexp in details
   it returns boolean value*/
   let isMobileDevice = regexp.test(details);

   if (isMobileDevice) {
     window.location.href='onmobile.html';
       
   } else {
     console.log("pc");
    window.location.href = '/passThrough.html';      
   }
}


function subscribeMailChimp(){
  var url = "https://us-east1-intraverse-3aa8e.cloudfunctions.net/addSubscriber";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
  console.log("called");
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      var data = JSON.parse(xhr.response);
      console.log(data.statusCode);

      if(data.statusCode != null){
        window.location.href='./check_inbox.html';
      }
   }}
   xhr.send(JSON.stringify({ "email": localStorage.getItem('email')}));
  

  
}

if(pathname == "/IGO1.html")
{
  sortData();
}


