$(document).ready(function(){
  if(localStorage.getItem('access_token')) showMainPage()
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
  if (localStorage.getItem('access_token')) {
    $('#login-page').hide()
    $('#register-page').hide()
    $('#main-page').show()
    getAllTodos()
  } else {
    e.preventDefault()
    showRegister()
  }
}

function logout(e){
  if(e) {
    e.preventDefault()
    localStorage.removeItem('access_token')
    signOut()
    showRegister()
  }
}

function showCreateForm(e){
  if (e) e.preventDefault()
  $('#modal-create').modal('show')
}

