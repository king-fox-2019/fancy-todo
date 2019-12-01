$(document).ready(function () {
  $('#login-form').submit(loginSubmit)
  $('#register-form').submit(registerSubmit)

  $('#register').click(showRegisterForm)
  $('#login').click(showLoginForm)
  $('#logout').click(loggingOut)

  checkLocalStorage()
})

function loggingOut(e) {
  e.preventDefault()

  localStorage.removeItem('token')
  showLoginForm(e)
}

function showRegisterForm(e) {
  e.preventDefault()

  $('#login-form').hide()
  $('#register-form').show()
  $('#dashboard').hide()
}

function showLoginForm(e) {
  e.preventDefault()

  $('#login-form').show()
  $('#register-form').hide()
  $('#dashboard').hide()
}

function checkLocalStorage() {
  if (localStorage.getItem('token')) {
    // already logged in
    $('#login-form').hide()
    $('#register-form').hide()
    $('#dashboard').show()
  }
}

function loginSubmit(e) {
  e.preventDefault()


  $.ajax({
    url: 'http://localhost:3000/user/login',
    method: 'post',
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val(),
    }
  })
    .done(function (result) {
      console.log(result.access_token)
      Swal.fire(
        'Logged In!',
        'You are now logged in to our app',
        'success'
      )

      localStorage.setItem('token', result.access_token)
      $('#login-form').hide()
      $('#register-form').hide()
      $('#dashboard').show()
    })
    .fail(function (err) {
      console.log(err.responseJSON.error)
      Swal.fire({
        title: 'Ops...',
        icon: 'error',
        text: err.responseJSON.error
      })
    })
    .always(function () {
      console.log('ajax done')
    })
}

function registerSubmit(e) {
  e.preventDefault()

  $.ajax({
    url: 'http://localhost:3000/user/register',
    method: 'post',
    data: {
      username: $('#register-username').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val(),
    }
  })
    .done(function (result) {
      console.log(result.message)
      Swal.fire(
        'Register success!',
        'You have registered to our app',
        'success'
      )

      $('#register-username').val('')
      $('#register-email').val('')
      $('#register-password').val('')
    })
    .fail(function (err) {
      console.log(err.responseJSON.errors)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.responseJSON.errors.join(', ')
      })
    })
    .always(function () {
      console.log('ajax done')
    })
}
