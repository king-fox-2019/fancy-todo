function register(){
    let username = $('#nameReg').val()
    let email = $('#emailReg').val()
    let password = $('#passReg').val()
    $.ajax({
      url: 'http://localhost:3000/user/register',
      method: 'POST',
      data: {username, email, password}
    })
    .done(data => {
      $('#nameReg').val('')
      $('#emailReg').val('')
      $('#passReg').val('')
      Swal.fire({
        icon: 'success',
        title: 'register user',
        text: `register ${data.username} success!`
      })
    })  
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'register error',
        text: `${err.responseJSON.message[0]}`
      })
    })
}

function login(){
  let email = $('#emailLog').val()
  let password = $('#passLog').val()
  $.ajax({
    url: 'http://localhost:3000/user/login',
    method: 'POST',
    data: { email, password}
  })
  .done(data => {
    $('#emailLog').val('')
    $('#passLog').val('')
    $('#front-page').hide()
    $('#main-page').show()
    localStorage.setItem('token', data.token)
    getUserTodo()
    Swal.fire({
      icon: 'success',
      title: 'User Login',
      text: `${data.user.username} Login Success!`
    })
  })
  .fail(err => {
    Swal.fire({
      icon: 'error',
      title: 'User Login',
      text: `${err.responseJSON.message}`
    })
  })
}