//every new process change, checks if user is logged in and calls function getData()
auth.onAuthStateChanged((u) => {
  user = u;

  // call so this is triggered
  getData();

  console.log(user);
  //    shows message is v or not v
  document.getElementById("verify_email_status").innerText = user.emailVerified
    ? `${user.email} is verfied`
    : "Not verfied";
  // if not v no change button shows, if v button disappears...magic
  document.getElementById("verify_email_btn").style.display = user.emailVerified
    ? "none"
    : "block";
});

async function verify() {
  await user.sendEmailVerification();
}

//if there is not a user, log
function getData() {
  if (!user) {
    console.error("USER IS NOT LOGGED IN.");
    document.getElementById("index_username").innerHTML = "NOT LOGGED IN";
    return;
  }
  //snap shot firebase database of current user logged in, and print their info
  firebase
    .database()
    .ref(`users/${user.uid}`)
    .once("value", function (snapshot) {
      if (snapshot.exists()) {
        let userProfile = snapshot.val();
        const { username, first_name, last_name, last_login } = userProfile;
        document.getElementById(
          "index_username"
        ).innerHTML = `Welcome ${username}`;
        document.getElementById(
          "index_first_name"
        ).innerHTML = `Welcome ${first_name}`;
        document.getElementById("index_last_name").innerHTML = ` ${last_name}`;
        //document.getElementById("index_last_login").innerHTML = `Login #: ${last_login}`

        // loading preferences
        //

        const { preferences } = userProfile;

        if (!preferences) {
          return;
        }

        const {
          Business,
          Entertainment,
          General,
          Health,
          Science,
          Sports,
          Technology,
        } = preferences;

        if (Business) {
          document.getElementById("c_Business").checked = true;
        }
        if (Entertainment) {
          document.getElementById("c_Entertainment").checked = true;
        }
        if (General) {
          document.getElementById("c_General").checked = true;
        }
        if (Health) {
          document.getElementById("c_Health").checked = true;
        }
        if (Science) {
          document.getElementById("c_Science").checked = true;
        }
        if (Sports) {
          document.getElementById("c_Sports").checked = true;
        }
        if (Technology) {
          document.getElementById("c_Technology").checked = true;
        }
      }
    });
}

function savePreferences() {
  const Business = document.getElementById("c_Business").checked;
  const Entertainment = document.getElementById("c_Entertainment").checked;
  const General = document.getElementById("c_General").checked;
  const Health = document.getElementById("c_Health").checked;
  const Science = document.getElementById("c_Science").checked;
  const Sports = document.getElementById("c_Sports").checked;
  const Technology = document.getElementById("c_Technology").checked;

  firebase.database().ref(`users/${user.uid}/preferences`).set({
    Business,
    Entertainment,
    General,
    Health,
    Science,
    Sports,
    Technology,
  });
}

//run getdata when web app loads
window.onload = getData;
