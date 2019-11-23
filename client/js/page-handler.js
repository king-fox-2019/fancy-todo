function toLandingPage(e) {
  if (e) e.preventDefault()
  $('.page').hide()
  $('#landing-page').show()
  localStorage.setItem('active-page', 'landing-page')
  return false
}

function toSignUpPage(e) {
  if (e) e.preventDefault()
  $('.page').hide()
  $('#signup-page').show()
  localStorage.setItem('active-page', 'signup-page')
  return false
}

function toSignInPage(e) {
  if (e) e.preventDefault()
  $('.page').hide()
  $('#signin-page').show()
  localStorage.setItem('active-page', 'signin-page')
  return false
}

function toDashboardPage(e) {
  if (e) e.preventDefault()
  $('.page').hide()
  $('#dashboard-page').show()
  localStorage.setItem('active-page', 'dashboard-page')
  return false
}
