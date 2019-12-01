$(document).ready(function(){
  if(localStorage.getItem('token')){
    isLogin(true)
    getUserTodo()
  }else{
    isLogin(false)
  }
  
  // welcome animation
  $('#welcome-text').delay(300).animate({opacity:1},600)
  $('.get-start').delay(1300).animate({'margin-top':'+=-80px', opacity:1},800)

  $('#register-form').submit(function(event){
    event.preventDefault()
    register()
  })

  $('#login-form').submit(function(event){
    event.preventDefault()
    login()
  })

  $('#setLogin').click(function(event){
    event.preventDefault()
  })

  $('#setRegister').click(function(event){
    event.preventDefault()
  })

  $('#create-todo').submit(function(event){
    event.preventDefault()
  })

  $('#create-project').submit(function(event){
    event.preventDefault()
  })

  $('#edit-form').submit(function(event){
    event.preventDefault()
  })

  $('#create-task').submit(function(event){
    event.preventDefault()
  })

  $('#edit-task').submit(function(event){
    event.preventDefault()
  })

  $('#back-home').click(function(){
    $('#main-look').show('fast')
    $('#login').hide('fast')
    $('#register').hide('fast')
  })
})

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

function isLogin(status){
  if(status){
    $('#front-page').hide()
    $('#main-page').show()
  }else{
    $('#login').hide()
    $('#register').hide()
    $('#main-page').hide()
  }
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
      url: `http://localhost:3000/user/login/google`,
      method: 'POST',
      data:{
        idToken: id_token
      }
    })
    .done(result => {
      localStorage.setItem('token', result.token)
      $('#emailLog').val('')
      $('#passLog').val('')
      $('#front-page').hide()
      $('#main-page').show()
      getUserTodo()
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Google Signin',
        text: `${err.responseJSON.message}`
      })
    })
    $('#front-page').hide()
    $('#main-page').show()
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      Swal.fire({
        icon: 'success',
        title: 'Logout User',
        text: 'Logout Success'
      })
      localStorage.clear()
      $('#front-page').show()
      $('#main-look').show()
      $('#main-page').hide()
      $('#login').hide()
      $('#register').hide()
    });
}

function setToLogin(){
    $('#register').hide('fast')
    $('#login').show('fast')
}

function setToRegister(){
  $('#register').show('fast')
  $('#login').hide('fast')
}

function showRegister(){
  $('#register').show('fast')
  $('#main-look').hide('fast')
}