//every new process change, checks if user is logged in and calls function getData()
auth.onAuthStateChanged((u) => {
	
	user = u

	// call so this is triggered
	getData()

	console.log(user)
})
  //if there is not a user, log
  function getData(){
	  if (!user) {
		  console.error("USER IS NOT LOGGED IN.")
          document.getElementById("index_username").innerHTML = "NOT LOGGED IN"
		  return
	  }
    //snap shot firebase database of current user logged in, and print their info
    firebase.database().ref(`users/${user.uid}`).once('value',function(snapshot){

      if (snapshot.exists()) {
			let userProfile = snapshot.val()
			const {username,first_name,last_name,last_login} = userProfile
        document.getElementById("index_username").innerHTML = `Welcome ${username}`
        document.getElementById("index_first_name").innerHTML = `Welcome ${first_name}`
        document.getElementById("index_last_name").innerHTML = ` ${last_name}`
        document.getElementById("index_last_login").innerHTML = `Login #: ${last_login}`
      }
    });
  }
  //run getdata when web app loads
window.onload = getData
