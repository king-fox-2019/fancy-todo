'use strict'

function submitRegister(e){
  if(e) e.preventDefault()
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/users/register',
    data: {
      username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val()
    }
  })
  .done(user => {
    console.log(user)
  })
  .fail(err => {
    console.log(err)
  })
  .always(() => {
    $('#password').val('')
  })
}