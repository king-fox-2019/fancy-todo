function register(event) {
  event.preventDefault()
  $.ajax({
    url: `${baseUrl}/users/register`,
    method: 'post',
    data: {
      name: $('#register-name').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val()
    }
  })
  .done(function (response) {
    // console.log("Successfully registered")
    let { access_token } = response
    localStorage.setItem("access_token", access_token)
    checkToken()
    $('.squiggly-home').show()
  })
  .fail(err => {
      console.log('masuk register', baseUrl);
      console.log('ini err pas register', err)
      Swal.fire('Oops..', err.responseJSON.messages[0])
    })
}

function signin(event) {
  event.preventDefault()
  $.ajax({
    url: `${baseUrl}/users/login`,
    method: 'post',
    data: {
      email: $('#signin-email').val(),
      password: $('#signin-password').val()
    }
  })
    .done(function (response) {
      let { access_token } = response
      localStorage.setItem("access_token", access_token)
      checkToken()
      $('.squiggly-home').show()
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', err.responseJSON.messages[0].message)
    })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  // console.log('masuk on sign in');
  $.ajax({
    url: `${baseUrl}/users/google-sign-in`,
    method: 'post',
    data: {
      googleIdToken: id_token
    }
  })
    .done(function (response) {
      // console.log("Posted googleIdToken to the server", response.token)
      let { access_token } = response
      localStorage.setItem("access_token", access_token)
      checkToken()
      $('.squiggly-home').show()
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function signOut(event) {
  // console.log('masuk sign out');
  event.preventDefault()
  const auth2 = gapi.auth2.getAuthInstance()
  // console.log('ini auth2 di sign out', auth2)
  if (auth2) {
    auth2.signOut().then(function () {
      localStorage.removeItem("access_token")
      checkToken()
    })
  } else {
    // console.log('masuk else di register');
    localStorage.removeItem("access_token")
    checkToken()
  }
}