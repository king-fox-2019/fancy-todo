$(document).ready(() => {
  $('[data-toggle="tooltip"]').tooltip()
  let activePage = localStorage.getItem('active-page')
  if (!activePage) {
    activePage = 'landing-page'
  }
  switchPage(activePage)
})

function switchPage(page) {
  switch (page) {
    case 'landing-page':
      toLandingPage()
      break
    case 'signup-page':
      toSignUpPage()
      break
    case 'signin-page':
      toSignInPage()
      break
    case 'dashboard-page':
      toDashboardPage()
      break

    default:
      toLandingPage()
      break
  }
}
