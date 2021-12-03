//api for firebase
const firebaseConfig = {
    apiKey: "AIzaSyCSQXSf0quje5JxYFKBRRbLG2SCp7ymFYM",
    authDomain: "news-9646a.firebaseapp.com",
    projectId: "news-9646a",
    storageBucket: "news-9646a.appspot.com",
    messagingSenderId: "798864065224",
    appId: "1:798864065224:web:7bfe4c8df0751c0950dbfd"
  };

  firebase.initializeApp(firebaseConfig);
  // init variables
  const auth = firebase.auth()
  const database = firebase.database()
  //global user
  let user = null

  auth.onAuthStateChanged((u) => {
    user = u
    
  })
  
  // register function
  function register () {
	// input fields
	email = document.getElementById('email').value
	password = document.getElementById('password').value
	first_name = document.getElementById('first_name').value
	last_name = document.getElementById('last_name').value
	username = document.getElementById('username').value
  
	// validate input fields
	if (validate_email(email) == false || validate_password(password) == false) {
	  alert('Incorrect Email or password!')
	  return
	  // don't continue running the code
	}
	if (validate_field(first_name) == false || validate_field(last_name) == false || validate_field(username) == false) {
	  alert('First/Last/Username is incorrect!')
	  return
	}
   
	//auth
	auth.createUserWithEmailAndPassword(email, password)
	.then(function() {
	  // user variable
	  var user = auth.currentUser
  
	  // adding user
	  var database_ref = database.ref()
  
	  // create user data
	  var user_data = {
		email : email,
		first_name : first_name,
		last_name : last_name,
		username : username,
		last_login : Date.now()
	  }
  
	  // Push to Firebase Database
	  database_ref.child('users/' + user.uid).set(user_data)
  
	  
	  alert('User Created!')
	})
	.catch(function(error) {
	  // Firebase will use this to alert of its errors
	  var error_code = error.code
	  var error_message = error.message
  
	  alert(error_message)
	})
  }
  
  // login function
  function login () {
	// input fields
	email = document.getElementById('email').value
	password = document.getElementById('password').value
  
	// validate input fields
	if (validate_email(email) == false || validate_password(password) == false) {
	  alert('Email or Password is Incorrect!')
	  return
	  // don't continue running the code
	}
  
	auth.signInWithEmailAndPassword(email, password)
	.then(function() {
	  
	  var user = auth.currentUser
  
	  // Add this user to Firebase Database
	  var database_ref = database.ref()
    
	  // create User data
	  var user_data = {
		last_login : Date.now()
	  }
  
	  // push to Firebase Database
	  //database_ref.child('users/' + user.uid).update(user_data)
    database_ref.child('users/' + user.uid+"/last_login").set(Date.now())
	
    
	  alert('Welcome '+ email)
    // redirect to index.html
    window.location = 'index.html';
  
	})
	.catch(function(error) {
	  // Firebase will use this to alert of its errors
	  var error_code = error.code
	  var error_message = error.message
  
	  alert(error_message)
	})
  }

  
  function signOut(){
    auth.signOut();
    alert('Signed Out ');
    window.location = 'login.html';
  }
 
 
  // validate functions
  function validate_email(email) {
	expression = /^[^@]+@\w+(\.\w+)+\w$/
	if (expression.test(email) == true) {
	  // Email ok
	  return true
	} else {
	  // Email not ok
	  return false
	}
  }
  
  function validate_password(password) {
	// Firebase only accepts lengths greater than 6
	if (password < 6) {
	  return false
	} else {
	  return true
	}
  }
  
  function validate_field(field) {
	if (field == null) {
	  return false
	}
  
	if (field.length <= 0) {
	  return false
	} else {
	  return true
	}
  }



const btnHam = document.querySelector('.ham-btn');
const btnTimes = document.querySelector('.times-btn');
const navBar = document.getElementById('nav-bar');

//this is for the drop down menu//
btnHam.addEventListener ('click', function(){
    if(btnHam.className !==""){
        btnHam.style.display = "none";
        btnTimes.style.display = "block";
        navBar.classList.add("show-nav");
    }
})

btnTimes.addEventListener('click', function(){
    if(btnHam.className !==""){
        this.style.display="none";
        btnHam.style.display="block";
        navBar.classList.remove("show-nav");
    }
})

/* signin/register box pops into page*/
var x=document.getElementById('login');
var y=document.getElementById('register');
var z=document.getElementById('btn');
function register1()
{
    x.style.left='-400px';
    y.style.left='50px';
    z.style.left='110px';
}
function login1()
{
    x.style.left='50px';
    y.style.left='450px';
    z.style.left='0px';
}

/*makes signin/register window disappear if you click outside of box*/
var modal = document.getElementById('login-form');
window.onclick = function(event) 
{
    if (event.target == modal) 
    {
        modal.style.display = "none";
    }
}
/*Button sends message to confirm email has been sent*/
function reset() {
  message("Email has been sent!");
}

