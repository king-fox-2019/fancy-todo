'use strict'

function submitLogIn(e) {
  if (e) e.preventDefault()
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/users/login',
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    }
  })
    .done(user => {
      console.log(user)
      localStorage.setItem('token', user.token)
      getAllTodos()
      showMainPage()
    })
    .fail(err => {
      console.log(err)
    })
    .always(() => {
      $('#login-email').val('')
      $('#login-password').val('')
    })
}