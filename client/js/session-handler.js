function onSignUp(e) {
  if (e) e.preventDefault()
  validateUsername(), validateEmail(), validatePassword()
  if ($('#signup-page .is-invalid').length > 0) return false
  const username = $('#signup-page #username')
  const email = $('#signup-page #email')
  const password = $('#signup-page #password')
  toast('Loading')
  $.ajax(`${baseUrl}/signup`, {
    method: 'POST',
    data: {
      username: username.val(),
      email: email.val(),
      password: password.val()
    }
  })
    .done(data => {
      toast('Sign up success!', 3000)
      username.val('')
      email.val('')
      toDashboardPage()
    })
    .fail(({ responseJSON }) => {
      for (const msg of responseJSON) {
        if (msg.toLowerCase().includes('username'))
          username.addClass('is-invalid')
        if (msg.toLowerCase().includes('email')) email.addClass('is-invalid')
        if (msg.toLowerCase().includes('password'))
          password.addClass('is-invalid')
      }
      toast(responseJSON.join(', '), 5000)
    })
    .always(() => password.val(''))
  return false
}

function onSignIn(e) {
  const emailUsername = $('#signin-page #emailUsername')
  const password = $('#signin-page #password')
  if (e.type === 'submit') {
    e.preventDefault()
    toast('Loading')
    $.ajax(`${baseUrl}/signin`, {
      method: 'POST',
      data: {
        emailUsername: emailUsername.val(),
        password: password.val()
      }
    })
      .done(({ data }) => {
        toast('Sign in success!', 3000)
        localStorage.setItem('access_token', data.access_token)
        emailUsername.val('')
        toDashboardPage()
      })
      .fail(({ responseJSON }) => {
        toast(responseJSON, 5000)
        emailUsername.addClass('is-invalid')
        password.addClass('is-invalid')
        emailUsername.one('focus', () =>
          emailUsername.removeClass('is-invalid')
        )
        password.one('focus', () => password.removeClass('is-invalid'))
      })
      .always(() => password.val(''))
  } else if (e) {
    g_token = e.getAuthResponse().id_token
    toast('Loading')
    $.ajax(`${baseUrl}/g-signin`, {
      method: 'POST',
      data: {
        g_token
      }
    })
      .done(data => {
        toast('Sign in success!', 3000)
        localStorage.setItem('access_token', data.access_token)
        toDashboardPage()
      })
      .fail(({ responseJSON }) => {
        toast(responseJSON, 5000)
      })
      .always(() => {
        emailUsername.val('')
        password.val('')
      })
  }

  return false
}

function onSignOut(e) {
  e.preventDefault()
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function() {
    console.log('User signed out.')
  })
  localStorage.removeItem('access_token')
  toLandingPage()
  return false
}

/* Input Validation */
function validateUsername() {
  const page = localStorage.getItem('active-page')
  if (/^[a-zA-Z0-9_.]+$/.test($(`#${page} #username`).val())) {
    $(`#${page} #username`).removeClass('is-invalid')
  } else {
    $(`#${page} #username`).addClass('is-invalid')
  }
}

function validateEmail() {
  const page = localStorage.getItem('active-page')
  if (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      $(`#${page} #email`).val()
    )
  ) {
    $(`#${page} #email`).removeClass('is-invalid')
  } else {
    $(`#${page} #email`).addClass('is-invalid')
  }
}

function validatePassword() {
  const page = localStorage.getItem('active-page')
  if ($(`#${page} #password`).val().length >= 6) {
    $(`#${page} #password`).removeClass('is-invalid')
  } else {
    $(`#${page} #password`).addClass('is-invalid')
  }
}
