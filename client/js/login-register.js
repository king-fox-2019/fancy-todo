function showRegister(e) {
  if (e) e.preventDefault();
  $("#signin").hide();
  $("#register").show();
}

function showSignin(e) {
  if (e) e.preventDefault();
  $("#register").hide();
  $("#signin").show();
}

function register(e) {
  if (e) e.preventDefault();
  $.ajax({
    method: "post",
    url: `${baseUrl}/user/signup`,
    data: {
      username: $("#reg-username").val(),
      email: $("#reg-email").val(),
      password: $("#reg-password").val()
    }
  }).done(user => {
    $("#register").hide();
    $(".navbar").show();
    $("#main-todo").show();
  }).fail(err => {
    console.log(err)
  })
}

function signin(e) {
  if (e) e.preventDefault();
  console.log($('#signin-email').val())
  $.ajax({
    method: "post",
    url: `${baseUrl}/user/signin`,
    data: {
      email: $('#signin-email').val(),
      password: $('#signin-password').val()
    }
  }).done(user => {
      localStorage.setItem('access_token', user.access_token);
      $("#signin").hide();
      fetchTodos();
    })
    .fail(err => console.log(err))
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    type: 'post',
    url: `${baseUrl}/user/signin/google`,
    data: { id_token }
  }).done(user => {
      localStorage.setItem('access_token', user.access_token);
      $("#all").hide();
      $("#signin").hide()
      $(".navbar").show();
      fetchTodos()
    })
    .fail(error => console.log(error))
}

function signout(e) {
  if (e) e.preventDefault();
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function() {
    console.log('User signed out.')
  })

  console.log('logged out')
  localStorage.removeItem('access_token')
  $('.all').hide()
  $('#signin').show()
}