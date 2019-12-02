$(document).ready(function () {
  $('#login-form').submit(loginSubmit)
  $('#register-form').submit(registerSubmit)

  $('#register').click(showRegisterForm)
  $('#login').click(showLoginForm)
  $('#logout').click(loggingOut)
  $('#create-todo').click(createTodo)
  $('#update-todo').click(updatingTodo)

  checkLocalStorage()
})

function loggingOut(e) {
  e.preventDefault()

  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });

  localStorage.removeItem('token')

  showLoginForm(e)
}

function showRegisterForm(e) {
  e.preventDefault()

  $('#login-form').hide()
  $('#register-form').show()
  $('#dashboard').hide()
}

function showLoginForm(e) {
  e.preventDefault()

  $('#login-form').show()
  $('#register-form').hide()
  $('#dashboard').hide()
}

function checkLocalStorage() {
  if (localStorage.getItem('token')) {
    // already logged in
    $('#login-form').hide()
    $('#register-form').hide()
    $('#dashboard').show()

    fetchTodoData()
  }
}

function loginSubmit(e) {
  e.preventDefault()


  $.ajax({
    url: 'http://localhost:3000/user/login',
    method: 'post',
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val(),
    }
  })
    .done(function (result) {
      console.log(result.access_token)
      Swal.fire(
        'Logged In!',
        'You are now logged in to our app',
        'success'
      )

      localStorage.setItem('token', result.access_token)
      $('#login-form').hide()
      $('#register-form').hide()
      $('#dashboard').show()

      fetchTodoData()
    })
    .fail(function (err) {
      console.log(err.responseJSON.error)
      Swal.fire({
        title: 'Ops...',
        icon: 'error',
        text: err.responseJSON.error
      })
    })
    .always(function () {
      console.log('ajax done')
    })
}

function registerSubmit(e) {
  e.preventDefault()

  $.ajax({
    url: 'http://localhost:3000/user/register',
    method: 'post',
    data: {
      username: $('#register-username').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val(),
    }
  })
    .done(function (result) {
      console.log(result.message)
      Swal.fire(
        'Register success!',
        'You have registered to our app',
        'success'
      )

      $('#register-username').val('')
      $('#register-email').val('')
      $('#register-password').val('')
    })
    .fail(function (err) {
      console.log(err.responseJSON.errors)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.responseJSON.errors.join(', ')
      })
    })
    .always(function () {
      console.log('ajax done')
    })
}

function fetchTodoData() {
  $('todo-lists').empty()
  $.ajax({
    url: 'http://localhost:3000/todo/',
    method: 'get',
    headers: {
      access_token: localStorage.getItem('token')
    }
  })
    .done(function (result) {
      console.log(result)
      if (result.length === 0) {
        $('#when-empty').append(
          `
          <h3>There is no todo yet</h3>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#form-todo">Create new Todo</button>
          `
        )
      } else {
        result.forEach(todo => {
          $('#todo-lists').append(`
            <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title ${todo._id}">${todo.title}</h5>
                  <p class="card-text ${todo._id}">${todo.description}</p>
                  <button target="${todo._id}" type="button" class="btn btn-danger delete-todo">Delete</button>
                  <button target="${todo._id}" type="button" class="btn btn-info update-todo" data-toggle="modal" data-target="#update-todo-form">Update</button>
                </div>
              </div>
            </div>
          `)
        })
        $('.update-todo').click(updateTodo)
        $('.delete-todo').click(deleteTodo)
        $('#todo-lists').append(`
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#form-todo">Create new Todo</button>
        `)
      }
    })
    .fail(function (err) {
      console.log(err)
    })
    .always(function () {
      console.log('ajax done')
    })
}


function createTodo(e) {
  e.preventDefault()

  // console.log($('#todo-title').val())
  // console.log($('#todo-description').val())

  Swal.fire({
    title: 'Loading...',
    text: 'please wait',
    imageUrl: 'https://i.gifer.com/g0R5.gif',
    showConfirmButton: false,
    imageWidth: 50,
    imageHeight: 50,
  })

  $.ajax({
    url: 'http://localhost:3000/todo',
    method: 'post',
    headers: {
      access_token: localStorage.getItem('token'),
    },
    data: {
      title: $('#todo-title').val(),
      description: $('#todo-description').val(),
    }
  })
    .done(function (result) {
      // console.log(result)
      Swal.close()
      $('#todo-lists').empty()
      $('#when-empty').empty()
      fetchTodoData()
    })
    .fail(function (err) {
      // for (let keys in err) console.log(keys, err[keys])
      // console.log(err.responseJSON.errors)
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.responseJSON.errors.join(', ')
      })
    })
    .always(function () {
      $('#todo-title').val('')
      $('#todo-description').val('')
      $('.modal').modal('hide')
    })
}

function deleteTodo(e) {
  e.preventDefault()

  // console.log(e.currentTarget.attributes.target.value)
  const todoId = e.currentTarget.attributes.target.value
  $.ajax({
    url: `http://localhost:3000/todo/${todoId}`,
    method: 'delete',
    headers: {
      access_token: localStorage.getItem('token')
    }
  })
    .done(function (result) {
      Swal.fire(
        'Success',
        'Delete todo',
        'success'
      )
      $('#todo-lists').empty()
      $('#when-empty').empty()
      fetchTodoData()
    })
    .fail(function (err) {
      Swal.fire({
        icon: 'error',
        title: 'Opps..',
        text: 'something wrong happen'
      })
    })
    .always(function () {
      console.log('ajax done')
    })
}

function updateTodo(e) {
  e.preventDefault()

  const todoId = e.currentTarget.attributes.target.value
  const values = $(`.${todoId}`)
  $('#update-todo-title').val(values[0].textContent)
  $('#update-todo-description').val(values[1].textContent)
  $('#todo_id').val(todoId)
}

function updatingTodo(e) {
  e.preventDefault()

  const todoId = $('#todo_id').val()

  $.ajax({
    url: `http://localhost:3000/todo/${todoId}`,
    method: 'patch',
    headers: {
      access_token: localStorage.getItem('token')
    },
    data: {
      title: $('#update-todo-title').val(),
      description: $('#update-todo-description').val(),
    }
  })
    .done(function (result) {
      Swal.fire(
        'Success',
        'Update todo',
        'success'
      )
      $('#todo-lists').empty()
      $('#when-empty').empty()
      fetchTodoData()
    })
    .fail(function (err) {
      Swal.fire({
        icon: 'error',
        title: 'Opps..',
        text: 'something wrong happen'
      })
    })
    .always(function () {
      console.log('ajax done')
      $('.modal').modal('hide')
    })
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token

  $.ajax({
    url: 'http://localhost:3000/user/google-signin',
    method: 'post',
    data: {
      google_token: id_token,
    }
  })
    .done(function (result) {
      localStorage.setItem('token', result.access_token)
      $('#login-form').hide()
      $('#register-form').hide()
      $('#dashboard').show()
      $('#todo-lists').empty()
      $('#when-empty').empty()

      fetchTodoData()
    })
    .fail(function (err) {
      // console.log(err)
      for (let keys in err) console.log(keys, err[keys])
    })
    .always(function () {
      console.log('ajax google done')
    })
}
