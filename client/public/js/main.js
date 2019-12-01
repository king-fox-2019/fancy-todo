$(document).ready(function(){
  if(localStorage.getItem('token')) showMainPage()
  else showRegister()
  
})

function showRegister(){
  $('#register-page').show()
  $('#login-page').hide()
  $('#main-page').hide()
}

function showLogin(e){
  if (e) e.preventDefault()
  $('#login-page').show()
  $('#register-page').hide()
  $('#main-page').hide()
}

function showMainPage(e){
  if (localStorage.getItem('token')) {
    $('#login-page').hide()
    $('#register-page').hide()
    $('#main-page').show()
  } else {
    e.preventDefault()
    showRegister()
  }
}

function logout(e){
  if(e) {
    e.preventDefault()
    localStorage.removeItem('token')
    showRegister()
  }
}

