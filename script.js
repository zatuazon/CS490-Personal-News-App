

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


/*Confirm strong password when registering*/

var pass = document.getElementById("pass");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var password = document.getElementById("password");
var match = document.getElementById("match");

/*button disable until password match*/

function disableBtn() {
	document.getElementById("regBtn").disabled = true;
	
	}
function enableBtn() {
	document.getElementById("regBtn").disabled = false;
	
	}


/*When the user clicks on the password field, show the message box */
pass.onfocus = function showMessage() {
  document.getElementById("message").style.display = "block";
}

/* When the user clicks outside of the password field, hide the message box
pass.onblur = function hideMessage() {
  document.getElementById("message").style.display = "none";
}*/

/* When the user starts to type something inside the password field */
function strength() {
  /* Validate lowercase letters */
  var lowerCaseLetters = /[a-z]/g;
  if(pass.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
    
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
    
  }
  
  /*  Validate capital letters  */
  var upperCaseLetters = /[A-Z]/g;
  if(pass.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
    
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
    
  }

  /* Validate numbers  */
  var numbers = /[0-9]/g;
  if(pass.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
    
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
    
  }
  
  /* Validate length   */
  if(pass.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
    
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
   
  }

  /*Validate Matching Password */
  if(pass.value === password.value){
    match.classList.remove("invalid");
    match.classList.add("valid");
    
  } else {
    match.classList.remove("valid");
    match.classList.add("invalid");
    
  }
if(pass.value.length >= 8){
	enableBtn();
} else {
	disableBtn();
}
}
/* not only works on pass but password ^ strength function */
pass.onkeyup = strength;
password.onkeyup = strength;


function fetchData() {

  const outputElement = document.getElementById("output");

 

  fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=4e138d817134454484b82bdb469ea905")
    .then((x) => x.json())
    .then((response) => {
      response.articles.forEach((article) => {
        const articleHtml = `
        <div style="padding-top:30px;background-color: transparent;">
          <a href="${article.url}" target="_blank">
            <img style="width: 100%;height:50%;" src="${article.urlToImage}">
          </a>

          <h1>${article.title}</h1>

          <h2>${article.source.name}</h2>

          <div>${article.description}</div>

        </div>`;
        outputElement.innerHTML += articleHtml;
      });
    });
}
fetchData();


function fetchFeatured() {

  const outputElement = document.getElementById("output2");

 

  fetch("https://newsapi.org/v2/everything?q=featured&apiKey=4e138d817134454484b82bdb469ea905")
    .then((x) => x.json())
    .then((response) => {
      response.articles.forEach((article) => {
        const articleHtml = `
        <div style="padding-top:30px;background-color: transparent;">
          <a href="${article.url}" target="_blank">
            <img style="width: 100%;height:50%;" src="${article.urlToImage}">
          </a>

          <h1>${article.title}</h1>

          <h2>${article.source.name}</h2>

          <div>${article.description}</div>

        </div>`;
        outputElement.innerHTML += articleHtml;
      });
    });
}
fetchFeatured();

function fetchBusiness() {

  const outputElement = document.getElementById("output3");

 

  fetch("https://newsapi.org/v2/everything?q=business&apiKey=4e138d817134454484b82bdb469ea905")
    .then((x) => x.json())
    .then((response) => {
      response.articles.forEach((article) => {
        const articleHtml = `
        <div style="padding-top:30px;background-color: transparent;">
          <a href="${article.url}" target="_blank">
            <img style="width: 100%;height:50%;" src="${article.urlToImage}">
          </a>

          <h1>${article.title}</h1>

          <h2>${article.source.name}</h2>

          <div>${article.description}</div>

        </div>`;
        outputElement.innerHTML += articleHtml;
      });
    });
}
fetchBusiness();

function fetchEntertainment() {

  const outputElement = document.getElementById("output4");

 

  fetch("https://newsapi.org/v2/everything?q=entertainment&apiKey=4e138d817134454484b82bdb469ea905")
    .then((x) => x.json())
    .then((response) => {
      response.articles.forEach((article) => {
        const articleHtml = `
        <div style="padding-top:30px;background-color: transparent;">
          <a href="${article.url}" target="_blank">
            <img style="width: 100%;height:50%;" src="${article.urlToImage}">
          </a>

          <h1>${article.title}</h1>

          <h2>${article.source.name}</h2>

          <div>${article.description}</div>

        </div>`;
        outputElement.innerHTML += articleHtml;
      });
    });
}
fetchEntertainment();

function fetchSports() {

  const outputElement = document.getElementById("output5");

 

  fetch("https://newsapi.org/v2/everything?q=sports&apiKey=4e138d817134454484b82bdb469ea905")
    .then((x) => x.json())
    .then((response) => {
      response.articles.forEach((article) => {
        const articleHtml = `
        <div style="padding-top:30px;background-color: transparent;">
          <a href="${article.url}" target="_blank">
            <img style="width: 100%;height:50%;" src="${article.urlToImage}">
          </a>

          <h1>${article.title}</h1>

          <h2>${article.source.name}</h2>

          <div>${article.description}</div>

        </div>`;
        outputElement.innerHTML += articleHtml;
      });
    });
}
fetchSports();


function fetchHealth() {

  const outputElement = document.getElementById("output6");

 

  fetch("https://newsapi.org/v2/everything?q=health&apiKey=4e138d817134454484b82bdb469ea905")
    .then((x) => x.json())
    .then((response) => {
      response.articles.forEach((article) => {
        const articleHtml = `
        <div style="padding-top:30px;background-color: transparent;">
          <a href="${article.url}" target="_blank">
            <img style="width: 100%;height:50%;" src="${article.urlToImage}">
          </a>

          <h1>${article.title}</h1>

          <h2>${article.source.name}</h2>

          <div>${article.description}</div>

        </div>`;
        outputElement.innerHTML += articleHtml;
      });
    });
}
fetchHealth();

function fetchScience() {

  const outputElement = document.getElementById("output7");

 

  fetch("https://newsapi.org/v2/everything?q=science&apiKey=4e138d817134454484b82bdb469ea905")
    .then((x) => x.json())
    .then((response) => {
      response.articles.forEach((article) => {
        const articleHtml = `
        <div style="padding-top:30px;background-color: transparent;">
          <a href="${article.url}" target="_blank">
            <img style="width: 100%;height:50%;" src="${article.urlToImage}">
          </a>

          <h1>${article.title}</h1>

          <h2>${article.source.name}</h2>

          <div>${article.description}</div>

        </div>`;
        outputElement.innerHTML += articleHtml;
      });
    });
}
fetchScience();

function fetchTechnology() {

  const outputElement = document.getElementById("output8");

 

  fetch("https://newsapi.org/v2/everything?q=technology&apiKey=4e138d817134454484b82bdb469ea905")
    .then((x) => x.json())
    .then((response) => {
      response.articles.forEach((article) => {
        const articleHtml = `
        <div style="padding-top:30px;background-color: transparent;">
          <a href="${article.url}" target="_blank">
            <img style="width: 100%;height:50%;" src="${article.urlToImage}">
          </a>

          <h1>${article.title}</h1>

          <h2>${article.source.name}</h2>

          <div>${article.description}</div>

        </div>`;
        outputElement.innerHTML += articleHtml;
      });
    });
}
fetchTechnology();


function fetchGeneral() {

  const outputElement = document.getElementById("output9");

 

  fetch("https://newsapi.org/v2/everything?q=general&apiKey=4e138d817134454484b82bdb469ea905")
    .then((x) => x.json())
    .then((response) => {
      response.articles.forEach((article) => {
        const articleHtml = `
        <div style="padding-top:30px;background-color: transparent;">
          <a href="${article.url}" target="_blank">
            <img style="width: 100%;height:50%;" src="${article.urlToImage}">
          </a>

          <h1>${article.title}</h1>

          <h2>${article.source.name}</h2>

          <div>${article.description}</div>

        </div>`;
        outputElement.innerHTML += articleHtml;
      });
    });
}
fetchGeneral();



var firebaseConfig = {
  apiKey: "AIzaSyBNkNnah4kA9niJfanPzRZMrY3uu-BvJAA",
  authDomain: "news-5d9b2.firebaseapp.com",
  projectId: "news-5d9b2",
  storageBucket: "news-5d9b2.appspot.com",
  messagingSenderId: "78196957863",
  appId: "1:78196957863:web:659715e1766b63b85c3182"
};
// initialize firebase
firebase.initializeApp(firebaseConfig);
// variables
const auth = firebase.auth()
const database = firebase.database()

// register function
function register () {
// Get inputs from index html
email = document.getElementById('email').value
password = document.getElementById('password').value
first_name = document.getElementById('first_name').value
last_name = document.getElementById('last_name').value
user_name = document.getElementById('user_name').value

// Make sure user has correct email and password
if (validate_email(email) == false) {
  alert('Current email is not correct!')
  return
  // Don't continue running the code
}
if (validate_field(first_name) == false || validate_field(last_name) == false || validate_field(user_name) == false) {
  alert('Please enter information in all the fields!')
  return
}


auth.createUserWithEmailAndPassword(email, password)
.then(function() {
  //variable
  var user = auth.currentUser

  // add to firebase database
  var database_ref = database.ref()

  // create user
  var user_data = {
    email : email,
    first_name : first_name,
    last_name : last_name,
    user_name : user_name,
    last_login : Date.now()
  }

  // sends to firebase database
  database_ref.child('users/' + user.uid).set(user_data)

  alert('Successfully Registered')
})
.catch(function(error) {
  // firebase error message
  var error_message = error.message

  alert(error_message)
})
}

//function login
function login () {
// html input id's
email = document.getElementById('email').value
password = document.getElementById('password').value

// Validate input fields
if (validate_email(email) == false) {
  alert('Please enter the email and password correctly to login')
  return
}

auth.signInWithEmailAndPassword(email, password)
.then(function() {
  //variable
  var user = auth.currentUser

  // add to firebase database
  var database_ref = database.ref()

  //create user
  var user_data = {
    last_login : Date.now()
  }

  // send data under category of users
  database_ref.child('users/' + user.uid).update(user_data)


  alert('Successfully Logged in')

})
.catch(function(error) {
  // firebase error message
  var error_message = error.message

  alert(error_message)
})
}




// validate email
function validate_email(email) 
{
expression = /^[^@]+@\w+(\.\w+)+\w$/
if (expression.test(email) == true) 
{
  // email works for us
  return true
} 
else 
{
  // email doesnt work for us
  return false
}
}
//validate firstname lastname username
function validate_field(field) 
{
if (field == null) 
{
  return false
}
if (field.length <= 0) 
{
  return false
} 
else 
{
  return true
}
}
