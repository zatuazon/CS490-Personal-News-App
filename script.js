

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
function register()
{
    x.style.left='-400px';
    y.style.left='50px';
    z.style.left='110px';
}
function login()
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

var myInput = document.getElementById("pass");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

/*When the user clicks on the password field, show the message box */
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

/* When the user clicks outside of the password field, hide the message box*/
/*myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}*/

/* When the user starts to type something inside the password field */
myInput.onkeyup = function() {
  /* Validate lowercase letters */
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  /*  Validate capital letters  */
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  /* Validate numbers  */
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  /* Validate length   */
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}
