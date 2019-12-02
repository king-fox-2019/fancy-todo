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
    $('#active-user').empty()
    $('#active-user').append(`
      <p>${data.user.username}</p>
    `)
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

function getAllUser(){
  $.ajax({
    url: 'http://localhost:3000/user',
    method: 'GET',
    headers:{
      access_token: localStorage.getItem('token')
    }
  })
  .done(users => {
    $('#list-user').empty()
    $('#list-user').append(`
      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Join At</th>
        </tr>
      </thead>
      <tbody id="detail-table">
      </tbody>
    </table>
    `)
    $('#detail-table').empty()
    users.forEach((user,index) => {
      $('#detail-table').append(`
        <tr>
          <th scope="row">${index+1}</th>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${moment(user.createdAt).format('LL')}</td>
        </tr>
      `)
    });
  })
  .fail(err => {
    Swal.fire({
      icon: 'error',
      title: 'Get All User',
      text: `${err.responseJSON.message}`
    })
  })
}