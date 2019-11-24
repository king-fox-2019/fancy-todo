function toLandingPage(e) {
  if (e) e.preventDefault()
  $('.page').hide()
  $('#landing-page').show()
  localStorage.setItem('active-page', 'landing-page')
  $('#in-session-nav').hide()
  $('#out-session-nav').show()
  return false
}

function toSignUpPage(e) {
  if (e) e.preventDefault()
  $('#signup-page #username').val('')
  $('#signup-page #email').val('')
  $('#signup-page #password').val('')
  $('.page').hide()
  $('#signup-page').show()
  localStorage.setItem('active-page', 'signup-page')
  $('#in-session-nav').hide()
  $('#out-session-nav').show()
  return false
}

function toSignInPage(e) {
  if (e) e.preventDefault()
  $('#signin-page #emailUsername').val('')
  $('#signin-page #password').val('')
  $('.page').hide()
  $('#signin-page').show()
  localStorage.setItem('active-page', 'signin-page')
  $('#in-session-nav').hide()
  $('#out-session-nav').show()
  return false
}

function toDashboardPage(e) {
  if (e) e.preventDefault()
  $('.page').hide()
  $('#dashboard-page').show()
  localStorage.setItem('active-page', 'dashboard-page')
  $('#in-session-nav').show()
  $('#out-session-nav').hide()
  fetchCards(localStorage.getItem('access_token'))
  return false
}
