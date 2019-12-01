function onSignIn(googleUser) {
   var id_token = googleUser.getAuthResponse().id_token;

   $.ajax({
     url: 'http://localhost:3000/user/googleSignIn',
     method: 'post',
     data: {id_token: id_token}
   })
   .done(access_token => {
     localStorage.setItem('access_token', access_token)
     $('#front').hide()
     $('#todo-main').show()
   })
   .fail(error => console.error(error))
 }

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    // console.log('User signed out.');
  });

  localStorage.removeItem('access_token')

  $('#front').show()
  $('#todo-main').hide()
}