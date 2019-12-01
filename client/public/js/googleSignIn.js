'use strict'

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token)
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/users/login/google',
    data: {
      id_token
    }
  })
    .done(user => {
      console.log(user)
      localStorage.setItem('access_token', user.access_token)
      showMainPage()
    })
    .fail(err => {
      console.log(err)
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.clear()
  });
}