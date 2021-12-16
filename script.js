//api for firebase

const firebaseConfig = {
  apiKey: "AIzaSyCSQXSf0quje5JxYFKBRRbLG2SCp7ymFYM",
  authDomain: "news-9646a.firebaseapp.com",
  projectId: "news-9646a",
  storageBucket: "news-9646a.appspot.com",
  messagingSenderId: "798864065224",
  appId: "1:798864065224:web:7bfe4c8df0751c0950dbfd",
};

firebase.initializeApp(firebaseConfig);
// init variables
var auth = firebase.auth();
var database = firebase.database();
//global user
let user = null;

auth.onAuthStateChanged((u) => {
  user = u;
});

// register function
function register() {
  // input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  first_name = document.getElementById("first_name").value;
  last_name = document.getElementById("last_name").value;
  username = document.getElementById("username").value;

  // validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Incorrect Email or password!");
    return;
    // don't continue running the code
  }
  if (
    validate_field(first_name) == false ||
    validate_field(last_name) == false ||
    validate_field(username) == false
  ) {
    alert("First/Last/Username is incorrect!");
    return;
  }

  //auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // user variable
      var user = auth.currentUser;

      // adding user
      var database_ref = database.ref();

      // create user data
      var user_data = {
        email: email,
        first_name: first_name,
        last_name: last_name,
        username: username,
        last_login: Date.now(),
        
        user_id: user.uid,

        //friends new part of users in DB
        friends: "",
        addBy: "",
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      alert("User Created!");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// login function
function login() {
  // input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Incorrect!");
    return;
    // don't continue running the code
  } else {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        var user = auth.currentUser;
        localStorage.setItem("id", user.uid);

        // Add this user to Firebase Database
        var database_ref = database.ref();

        // create User data
        var user_data = {
          last_login: Date.now(),
        };

        // push to Firebase Database
        //database_ref.child('users/' + user.uid).update(user_data)
        database_ref.child("users/" + user.uid + "/last_login").set(Date.now());

        alert("Welcome " + email);
        // redirect to index.html
        window.location = "index.html";
      })
      .catch(function (error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code;
        var error_message = error.message;

        alert(error_message);
      });
  }
}

function signOut() {
  // remove user id from local storage which we store on login
  localStorage.removeItem("id");
  auth.signOut();
  alert("Signed Out ");
  window.location = "login.html";
}

// validate functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email ok
    return true;
  } else {
    // Email not ok
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

const btnHam = document.querySelector(".ham-btn");
const btnTimes = document.querySelector(".times-btn");
const navBar = document.getElementById("nav-bar");

//this is for the drop down menu//
btnHam.addEventListener("click", function () {
  if (btnHam.className !== "") {
    btnHam.style.display = "none";
    btnTimes.style.display = "block";
    navBar.classList.add("show-nav");
  }
});

btnTimes.addEventListener("click", function () {
  if (btnHam.className !== "") {
    this.style.display = "none";
    btnHam.style.display = "block";
    navBar.classList.remove("show-nav");
  }
});

/*Button sends message to confirm email has been sent*/
function reset() {
  message("Email has been sent!");
}



// Search user from firebase DB
function searchUser() {
  // check if user is logged in
  if (user) {
    let userToSearch;
    // get user input username
    let getUserInput = document.getElementById("searched-user").value;
    // invalid input notify
    if (getUserInput !== "") {
      // all user input into lowercase so its easier to match when searching
      userToSearch = getUserInput.toLowerCase().replace(/\s/g, "");

      //  get all users from DB
      database
        .ref()
        .child("users")
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            // structure firebase users in an array of object [{},{}] so we can iterate on it easily
            let structureResponse = Object.values(snapshot.val());
            // transforming the usernames of all fetched users to lowercase and remove space so we can easily match
            let isFindUser = structureResponse.filter(
              (item) =>
                item.username.toLowerCase().replace(/\s/g, "") === userToSearch
            );
            // check we got user
            typeof isFindUser === "object" &&
              // looping througn our array object of serached user and insert on users.html
              isFindUser.forEach((element) => {
                //  get the parent container of div
                let getDiv = document.getElementById("searched-user-list");
                // create the <li></li> inside it
                let createLi = document.createElement("li");
                // create  button inside it to add user
                let createButton = document.createElement("button");
                // add button text
                createButton.textContent = "+ Add User";
                // setting up the text content using user name
                createLi.textContent = `${element.username}`;
                // adding bootstrap 
                createLi.setAttribute(
                  "class",
                  "list-group-item d-flex justify-content-between align-items-center"
                );
                // get specific users once button is clicked
                Object.assign(createButton, {
                  className: "btn btn-success btn-sm",

                  onclick: function () {
                    addUserToList(element);
                  },
                });
                getDiv.appendChild(createLi).appendChild(createButton);
              });
              // errors
          } else {
            alert("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Enter username");
    }
  } else {
    alert("Please Register");
  }
}

// Adding users searched to your list, works up there^
function addUserToList(getuser) {
  // variables
  let previousFriends = [];
  let previousFriendsFiltered = [];

  // get current user
  database
    .ref("users/")
    .child(user.uid)
    .get()
    .then((res) => {
      if (res.exists()) {
        let obj = res.val();
        // check if user has friends in DB
        if (obj.hasOwnProperty("friends")) {
          // get previous added users
          previousFriends = [...obj.friends];
          // push new user that gets added
          previousFriends.push(getuser.user_id);
          // filter the array of new added user and remove any null values
          previousFriendsFiltered = previousFriends.filter(
            (item) => item !== undefined || item !== null
          );
          // update firebase DB with new added users list
          database
            .ref("users/")
            .child(user.uid)
            .update({ friends: previousFriendsFiltered });
          notify(getuser);
          alert(getuser.first_name + " has been added to your list");
        } else {
          alert("cant add");
        }
      }
    })
    .catch((err) => alert(err.message));
}
// Function for getting all users already added 
function listUsers() {
  // variable
  var final,
    finalizeData = [];
  // store user on local storage
  let user = {
    uid: localStorage.getItem("id"),
  };
  let myFriends = [];
  // firebase code to get the current logged in user object
  database
    .ref("users/")
    .child(user.uid)
    .get()
    .then((res) => {
      if (res.exists()) {
        let obj = res.val();
        myFriends = [...obj.friends];
        myFriends = myFriends.filter(
          (item) => item !== undefined && item !== null
        );
        // get all users
        database
          .ref()
          .child("users")
          .get()
          .then((res) => {
            if (res.exists()) {
              let structureResponse = Object.values(res.val());
              // iterate through users and get the ones who are added
              myFriends.forEach((item) => {
                let data = structureResponse.filter((itemNes) => {
                  return itemNes.user_id === item;
                });
                finalizeData.push(...data);
                finalizeData = Object.values(finalizeData);
              });
              // iterate through the users

              finalizeData.forEach((element) => {
                
                // get the parent container of div
                let getDiv = document.getElementById("user-list");
                // create <li>
                let createLi = document.createElement("li");
                // create button to remove user
                let createButton = document.createElement("button");
                // button text
                createButton.textContent = "Remove User";
                // username of user to remove
                createLi.textContent = `${element.username}`;
                createLi.setAttribute(
                  "class",
                  "list-group-item d-flex justify-content-between align-items-center"
                );
                  // removing specific user once button is clicked
                Object.assign(createButton, {
                  className: "btn btn-success btn-sm",

                  onclick: function () {
                    removeUserFromList(element);
                  },
                });
                getDiv.appendChild(createLi).appendChild(createButton);
              });
              // line 474~
              addedByList();
            }
          });
      }
    })
    .catch((err) => alert(err.message));
  console.log("rendered");
}
// removing user, ^ works up there
function removeUserFromList(getuser) {
  //  variables
  let previousFriends = [];
  let previousFriendsFiltered = [];
  // firebase DB get users
  database
    .ref("users/")
    .child(user.uid)
    .get()
    .then((res) => {
      if (res.exists()) {
        let obj = res.val();
        console.log(obj);
        if (obj.friends) {
          // copy the previous added users
          previousFriends = [...obj.friends];
          previousFriendsFiltered = previousFriends.filter(
            // filter array and remove user
            // filter for null
            (item) =>
              item !== getuser.user_id && item !== undefined && item !== null
          );
          // updates friends DB in the user
          database
            .ref("users/")
            .child(user.uid)
            .update({
              friends:
                //  checks if user removed all users friends
                previousFriendsFiltered.length > 0
                  ? previousFriendsFiltered
                  : "",
            });
          // clear container to show users friends
          const container = document.querySelector("#user-list");
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
          // removes user and gets new list
          // line 531~ function
          removeAddBy(getuser);
          listUsers();
        } else {
          alert("No users found");
        }

        alert(getuser.username + " has been removed from your list");
      }
    })
    .catch((err) => alert(err.message));
}

// function that lists all users who added you
function notify(getuser) {
  // variables
  let addBy = [];
  let addByFiltered = [];

  // get current user id
  database
    .ref("users/")
    .child(getuser.user_id)
    .get()
    .then((res) => {
      if (res.exists()) {
        let obj = res.val();
        // check if user has friends
        if (obj.hasOwnProperty("addBy")) {
          // copy previous added users
          addBy = [...obj.addBy];
          // push the new user id which he wants to add
          addBy.push(user.uid);
          // filter the array of new added user and remove any undefined or null values
          addByFiltered = addBy.filter(
            (item) => item !== undefined || item !== null
          );
          // update firebase with new list of users
          database
            .ref("users/")
            .child(getuser.user_id)
            .update({ addBy: addByFiltered });
          alert("Notified");
        } else {
          alert("cant add");
        }
      }
    })
    .catch((err) => alert(err.message));
}
// shows list who you were added by
function addedByList() {
  // variables
  let final,
    finalizeData = [];
  // store on local storage
  let user = {
    uid: localStorage.getItem("id"),
  };
  let myFriends = [];
  // firebase code to get the current logged in user
  database
    .ref("users/")
    .child(user.uid)
    .get()
    .then((res) => {
      if (res.exists()) {
        let obj = res.val();
        myFriends = [...obj.addBy];
        myFriends = myFriends.filter(
          (item) => item !== undefined && item !== null
        );
        // firebase code to get all users object
        database
          .ref()
          .child("users")
          .get()
          .then((res) => {
            if (res.exists()) {
              let structureResponse = Object.values(res.val());
              // now iterate on all the fetched users and get users who are added
              myFriends.forEach((item) => {
                let data = structureResponse.filter((itemNes) => {
                  return itemNes.user_id === item;
                });
                finalizeData.push(...data);
                finalizeData = Object.values(finalizeData);
              });
          
              // looping through array
              finalizeData.forEach((element) => {
                let getDiv = document.getElementById("addby-user-list");
                let createLi = document.createElement("li");
                createLi.textContent = `You have been added by ${element.username}`;
                createLi.setAttribute(
                  "class",
                  "list-group-item d-flex justify-content-between align-items-center"
                );
                getDiv.appendChild(createLi);
              });
            }
          });
      }
    })
    .catch((err) => alert(err.message));
  console.log("rendered");
}

function removeAddBy(getuser) {
  // variables
  let previousFriends = [];
  let previousFriendsFiltered = [];
  // get all users
  database
    .ref("users/")
    .child(getuser.user_id)
    .get()
    .then((res) => {
      if (res.exists()) {
        let obj = res.val();
        console.log(obj);
        if (obj.addBy) {
          // copy prev users
          previousFriends = [...obj.addBy];
          previousFriendsFiltered = addBy.filter(
            // filter for users and filter for null and remove
            (item) => item !== user.uid && item !== undefined && item !== null
          );
          // update with removed list
          database
            .ref("users/")
            .child(getuser.user_id)
            .update({
              addBy:
                // check if user removed all users
                previousFriendsFiltered.length > 0
                  ? previousFriendsFiltered
                  : "",
            });
        } else {
          alert("No users found");
        }

        alert(getuser.first_name + " has been removed from your list");
      }
    })
    .catch((err) => alert(err.message));
}
