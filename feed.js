//every new process change, checks if user is logged in and calls function getData()
auth.onAuthStateChanged((u) => {
  user = u;

  // call so this is triggered
  getData();
});

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
        const { preferences } = userProfile;
        //console.log(userProfile);

        if (!preferences) {
          return;
        }
        //preferences
        const {
          Business,
          Entertainment,
          General,
          Health,
          Science,
          Sports,
          Technology,
        } = preferences;

        //console.log("here")
//if selected, fetch that certain news type
if(Business){fetchNews("Business")}
if(Entertainment){fetchNews("Entertainment")}
if(General){fetchNews("General")}
if(Health){fetchNews("Health")}
if(Science){fetchNews("Science")}
if(Sports){fetchNews("Sports")}
if(Technology ){fetchNews("Technology")}

      }
    });
}
