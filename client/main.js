$(document).ready(function () {
  M.AutoInit();

  if (localStorage.getItem('token')) {
    showTodo()
    $('.homepage').show()
    $('.login').hide()
  } else {
    $('.login').show()
    $('.homepage').hide()
  }
  // $('project-action-buttons').hide()
  $('.datepicker').datepicker()
})

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: "http://localhost:3000/users/googleSignIn",
    method: 'POST',
    data: {
      token: id_token
    }
  })
    .done(token => {
      console.log(token.token);
      localStorage.setItem('token', token.token)
      showTodo()
      $('.homepage').show()
      $('.login').hide()
    })
    .fail(err => {
      console.log(err)
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Maybe you forgot your password?'
      })
    })
}

function signIn(event) {
  event.preventDefault()
  $.ajax({
    url: "http://localhost:3000/users/login",
    method: "POST",
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    }
  })
    .done(token => {
      localStorage.setItem('token', token.token)
      Swal.fire({
        title: 'Welcome',
        showConfirmButton: false,
        timer: 500
      })
      showTodo()
      $('.homepage').show()
      $('.login').hide()
    })
    .fail(err => {
      console.log(err);
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Maybe you forgot your password?'
      })
    })
}
function signUp(event) {
  event.preventDefault()
  $.ajax({
    url: "http://localhost:3000/users/register",
    method: "POST",
    data: {
      email: $('#signup-email').val(),
      password: $('#signup-password').val()
    }
  })
    .done(user => {
      console.log(user)
      Swal.fire({
        type: 'success',
        title: 'Registration successful',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(err => {
      console.log(err)
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'The email that you use is already registered in our database, please use other email.',
        footer: '<a href>Why do I have this issue?</a>'
      })
    })

}
function signOut() {
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.removeItem('token')
    $('.login').show()
    $('.homepage').hide()
    console.log('User signed out.');
  });
}

function showTodo() {
  $.ajax({
    url: 'http://localhost:3000/todos/',
    method: "GET",
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(todos => {
      $('.todo-page').show()
      $('.project-page').hide()
      $('.project-list-page').hide()
      $('.project-details-page').hide()

      $('#todoList').empty()
      for (let i = 0; i < todos.length; i++) {
        $('#todoList').append(`
            <div class="row">
              <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <span class="card-title">${todos[i].title}</span>
                    <div style="text-align: right">
                      <small>Due Date: ${new Date(todos[i].dueDate).getDate()}-${new Date(todos[i].dueDate).getMonth() + 1}-${new Date(todos[i].dueDate).getFullYear()}<small>
                    </div>
                    <div>
                      <h6>${todos[i].description}</h6>
                    </div>
                    <span>Status: <a style="cursor: pointer;" onclick="updateStatusTodo('${todos[i]._id}', ${todos[i].status})"> ${(!todos[i].status) ? "undone" : "done"} </a> </span>
                  </div>
                  <div class="card-action blue-grey darken-1">
                    <a class="modal-trigger" data-target="modal2 updateTask" onclick="showUpdateWindow('${todos[i]._id}')"> <i class="material-icons right">mode_edit</i> </a>
                    <a onclick="deleteTodo('${todos[i]._id}')"> <i class="material-icons right">delete_forever</i> </a>
                  </div>
                </div>
              </div>
            </div>
            `)
      }
    })
    .fail(err => {
      console.log(err);
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>'
      })
    })
}

function deleteTodo(id) {
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    method: "DELETE",
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(() => {
      showTodo()
      console.log('Successfully delete')
      Swal.fire({
        type: 'success',
        title: 'Successfully deleted!',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(err => {
      console.log(err)
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>'
      })
    })
}

let todoData = null // buat tampung id dari pas manggil modal
function showUpdateWindow(id) {
  todoData = id
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    method: "GET",
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(todo => {
      $('#updateTitle').val(`${todo.title}`)
      $('#updateDescription').val(`${todo.description}`)
      $('#updateStatus').val(`${todo.status}`)
    })
}

function updateTodo(id) {
  id = todoData
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    method: 'PUT',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      title: $('#updateTitle').val(),
      description: $('#updateDescription').val(),
      dueDate: $('#updateDueData').val()
    }
  })
    .done(data => {
      console.log(data);
      showTodo()
      console.log('Successfully update todo')
      Swal.fire({
        type: 'success',
        title: 'Successfully updated your task!',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(err => {
      console.log(err)
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    })
}

function updateStatusTodo(todoId, todoStatus) {
  let editStatus = null
  if (todoStatus === false) {
    editStatus = true
  } else if (todoStatus === true) {
    editStatus = false
  }
  $.ajax({
    url: `http://localhost:3000/todos/${todoId}`,
    method: 'PATCH',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      status: editStatus
    }
  })
    .done(_ => {
      showTodo()
      console.log('Todo status updated')
      Swal.fire({
        type: 'success',
        title: 'Todo status updated',
        showConfirmButton: false,
        timer: 500
      })
    })
    .fail(err => {
      console.log(err)
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    })
}


function addTask() {
  $.ajax({
    url: `http://localhost:3000/todos`,
    method: 'POST',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      title: $('#newTitle').val(),
      description: $('#newDescription').val(),
      dueDate: $('#newDueDate').val()
    }
  })
    .done(() => {
      // $('#addNewTask').modal('hide')
      $('#newTitle').val('')
      $('#newDescription').val('')
      $('#newDueDate').val('')
      showTodo()
      console.log('Success add new task')
      Swal.fire({
        type: 'success',
        title: 'Success added a new task',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(err => {
      console.log(err.responseJSON.errors)
      let errors = err.responseJSON.errors
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: errors
      })
    })
}

function getProjectsNameAndOwner() {
  $.ajax({
    url: 'http://localhost:3000/projects',
    method: "GET",
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(projects => {
      $('#projectList').empty()
      for (let i = 0; i < projects.length; i++) {
        $('#projectList').append(`
          <div class="container" onclick="showProjectDetails('${projects[i]._id}')" style="cursor: pointer;">
            <div class="row">
              <div class="col s12 mt-2">
                <h1>${projects[i].name}</h1>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col s12">
                <h3>Project Leader: ${projects[i].owner.email}</h3>
              </div>
            </div>
  
          </div>
          <hr>
        `)
      }
    })
    .fail(err => {
      console.log(err.responseJSON.errors)
      let errors = err.responseJSON.errors
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: errors
      })
    })
}

function showProjectDetails(id) {
  $.ajax({
    url: `http://localhost:3000/projects/${id}`,
    method: "GET",
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(project => {
      localStorage.removeItem('project-id')
      localStorage.setItem('project-id', project._id)

      $('.project-name-and-owner').empty()
      $('.project-todos').empty()
      $('#project-members').empty()

      $('.todo-page').hide()
      $('.project-list-page').hide()
      $('.project-details-page').show()

      $('.project-name-and-owner').append(`
          <div class="container">
            <div class="row">
              <div class="col s12">
              <h1> ${project.name} </h1>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col s12">
              <h3>Project Leader: ${project.owner.email} </h3>
              </div>
            </div>
        `)

      for(let j = 0; j < project.members.length; j++) {
        $('#project-members').append(`
          <ul>
            <li>${project.members[j].email}</li>
          </ul>
        `)
      }

      for (let i = 0; i < project.todo_id.length; i++) {
        $('.project-todos').append(`
              <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <span class="card-title">${project.todo_id[i].title}</span>
                    <div style="text-align: right">
                      <small>Due Date: ${new Date(project.todo_id[i].dueDate).getDate()}-${new
              Date(project.todo_id[i].dueDate).getMonth() + 1}-${new Date(project.todo_id[i].dueDate).getFullYear()}<small>
                    </div>
                    <div>
                      <h6>${project.todo_id[i].description}</h6>
                    </div>
                    <span>Status: <a style="cursor: pointer;" onclick="updateStatusProjectTodo('${project.todo_id[i]._id}', ${project.todo_id[i].status})"> ${(!project.todo_id[i].status) ? "undone" : "done"} </a> </span>
                    </span>
                  </div>
                  <div class="card-action blue-grey darken-1">
                    <a class="modal-trigger" data-target="modal6 updateProjectTask"
                      onclick="showUpdateProjectTaskWindow('${project.todo_id[i]._id}')"> <i class="material-icons right">mode_edit</i>
                    </a>
                    <a onclick="deleteProjectTodo(event, '${project._id}', '${project.todo_id[i]._id}')"> <i class="material-icons right">delete_forever</i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `)
      }
    })
}

function addNewProject() {
  $.ajax({
    url: `http://localhost:3000/projects`,
    method: 'POST',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      name: $('#newProjectName').val()
    }
  })
    .done(() => {
      // $('#addNewTask').modal('hide')
      $('#newProjectName').val('')
      // showProjects()
      console.log('Success add new project')
      Swal.fire({
        type: 'success',
        title: 'Success creating a new project',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(err => {
      console.log(err.responseJSON.errors)
      let errors = err.responseJSON.errors
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: errors
      })
    })
}

function addProjectTask() {
  let projectId = localStorage.getItem('project-id')
  $.ajax({
    url: `http://localhost:3000/projects/${projectId}/todos/`,
    method: 'PATCH',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      title: $('#newTodoProjectTitle').val(),
      description: $('#newTodoProjectDescription').val(),
      dueDate: $('#newTodoProjectDueDate').val()
    }
  })
  .done(() => {
    $('#newTodoProjectTitle').val('')
    $('#newTodoProjectDescription').val('')
    $('#newTodoProjectDueDate').val('')
    showProjectDetails(projectId)
    
    console.log('Success add new project task')
    Swal.fire({
      type: 'success',
      title: 'Success added a new tproject ask',
      showConfirmButton: false,
      timer: 1500
    })
  })
  .fail(err => {
    console.log(err);
    let errors = err.responseJSON.message
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: errors
    })
  })
}

function addMemberToProject() {
  let projectId = localStorage.getItem('project-id')
  $.ajax({
    url: `http://localhost:3000/projects/${projectId}/`,
    method: 'PATCH',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      email: $('#memberEmail').val()
    }
  })
  .done(() => {
    $('#memberEmail').val('')
    showProjectDetails(projectId)
    
    console.log('Success add a new member to project')
    Swal.fire({
      type: 'success',
      title: 'Success added a new member to project',
      showConfirmButton: false,
      timer: 1500
    })
  })
  .fail(err => {
    console.log(err)
    console.log(err.responseJSON.errors)
    let errors = err.responseJSON.message
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: errors
    })
  })
}

let projectTodoData = null // buat tampung id dari pas manggil modal
function showUpdateProjectTaskWindow(id) {
  console.log(id);

  projectTodoData = id
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    method: "GET",
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(todo => {
      $('#updateProjectTitle').val(`${todo.title}`)
      $('#updateProjectDescription').val(`${todo.description}`)
      $('#updateProjectStatus').val(`${todo.status}`)
    })
}

function updateProjectTodo(id) {
  let projectId = localStorage.getItem('project-id')
  id = projectTodoData
  $.ajax({
    url: `http://localhost:3000/projects/${projectId}/todos/${id}`,
    method: 'PATCH',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      title: $('#updateProjectTitle').val(),
      description: $('#updateProjectDescription').val(),
      dueDate: $('#updateProjectDueData').val()
    }
  })
    .done(data => {
      console.log(data);
      showProjectDetails(projectId)
      console.log('Successfully update project todo')
      Swal.fire({
        type: 'success',
        title: 'Successfully updated your project task!',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(err => {
      console.log(err)
      console.log(err.responseJSON.errors)
      let errors = err.responseJSON.errors
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: errors
      })
    })
}

function updateStatusProjectTodo(todoId, todoStatus) {
  let projectId = localStorage.getItem('project-id')
  let editStatus = null
  if (todoStatus === false) {
    editStatus = true
  } else if (todoStatus === true) {
    editStatus = false
  }
  $.ajax({
    // /:id/todos/:todoId/status
    url: `http://localhost:3000/projects/${projectId}/todos/${todoId}/status`,
    method: 'PATCH',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      status: editStatus
    }
  })
    .done(_ => {
      showProjectDetails(projectId)
      console.log('Project Todo status updated')
      Swal.fire({
        type: 'success',
        title: 'Project Todo status updated',
        showConfirmButton: false,
        timer: 500
      })
    })
    .fail(err => {
      console.log(err)
      console.log(err.responseJSON.errors)
      let errors = err.responseJSON.errors
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: errors
      })
    })
}

function deleteProjectTodo(event, projectId, todoId) {
  event.preventDefault()
  $.ajax({
    url: `http://localhost:3000/projects/${projectId}/todos/${todoId}`,
    method: 'DELETE',
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(() => {
    showProjectDetails(projectId)
    console.log('Successfully delete')
    Swal.fire({
      type: 'success',
      title: 'Successfully deleted!',
      showConfirmButton: false,
      timer: 1500
    })
  })
  .fail(err => {
    console.log(err.responseJSON.errors)
    let errors = err.responseJSON.errors
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: errors
    })
  })
}

function deleteProject() {
  let projectId = localStorage.getItem('project-id')
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })
    .then(result => {
      if(result.value) {
        $.ajax({
          url: `http://localhost:3000/projects/${projectId}`,
          method: 'DELETE',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .done(() => {
            switchToProjectPage()
            Swal.fire('Deleted!', 'Your project has been deleted.', 'success')
          })
          .fail(err => {
            console.log(err);
            console.log(err.responseJSON.message)
            let errors = err.responseJSON.message
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: errors
            })
          })
      }
    })
    .catch(err => {
      console.log(err)
      Swal.fire('error', 'internal server error', 'error')
    })
}

function generateQuote() {
  $.ajax({
    url: `http://localhost:3000/quote/`,
    method: "GET",
    headers: {
      token: localStorage.getItem('token')
    },
  })
    .done(quote => {
      console.log(quote);
      $('#quote').empty()
      $('#quote').append(`
        <div class="row">
          <div class="col s12 m6">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">${quote.quoteAuthor}</span>
                <p>${quote.quoteText}</p>
              </div>
            </div>
          </div>
        </div>
      `)
    })
}

function summonShibe() {
  $.ajax({
    url: `http://localhost:3000/shibe`,
    method: "GET",
    headers: {
      token: localStorage.getItem('token')
    },
  })
    .done(shibe => {
      $('#shibe').empty()
      $('#shibe').append(`
      <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img src="${shibe}">
            </div>
          </div>
        </div>
      </div>
      `)
    })
}

function switchToProjectPage() {
  $('.todo-page').hide()
  $('.project-list-page').show()
  $('.project-details-page').hide()
  getProjectsNameAndOwner()
}

function switchToTodoPage() {
  $('.todo-page').show()
  $('.project-list-page').hide()
  $('.project-details-page').hide()
  showTodo()
}

const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
  item.addEventListener('click', function () {
    switchers.forEach(item => item.parentElement.classList.remove('is-active'))
    this.parentElement.classList.add('is-active')
  })
})