$(document).ready(() => {
  $(document).click(function(e) {
    $(`.navbar-collapse`).collapse('hide')
  })
  $('[data-toggle="tooltip"]').tooltip()
  checkSession()
  let activePage = localStorage.getItem('active-page')
  if (!activePage) {
    activePage = 'landing-page'
  }
  switchPage(activePage)
})
