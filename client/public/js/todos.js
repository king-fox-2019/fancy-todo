'use strict'

function getAllTodos(){
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/todos',
    headers: {access_token: localStorage.getItem('access_token')}
  })
  .done(todos => {
    $('#value-data').empty()
    todos.forEach(todo => {
      $(`#value-data`).append(`
        <div class="card bg-light p-3 w-25 m-3">
         <blockquote class="blockquote-header">
          <h5 class="card-title">${todo.title}</h5>
          <hr class="my-4 mt-0">
          <p> ${todo.description}. </p>
            <footer class="blockquote-footer">
              <medium class="text-muted">
                ${todo.dueDate.slice(0,10)}
              </medium>
            </footer>
          </blockquote>
          <br>
          <div class="row">
            <div class="col-6">
              <button id="update-status-${todo._id}" value="${todo._id}" type="button" class="btn btn-${todo.status == true ? 'success btn-lg btn-sm disabled' : 'danger btn-lg btn-sm'}" role="button" aria-disabled="true" id="status-todo-${todo._id}">${todo.status == true ? 'completed' : 'uncompleted'}</button>
            </div>
            <div class="col">
              <a href="#" class="btn btn-outline-dark btn-lg btn-sm" role="button" aria-disabled="true" id="edit-todo-${todo._id}">Edit</a>
              <a href="#" class="btn btn-outline-dark btn-lg btn-sm" role="button" aria-disabled="true" id="delete-todo-${todo._id}">Delete</a>
            </div>
          </div>
        </div>
      `)
      $(`#edit-todo-${todo._id}`).click(todo, editPageTodo)
      $(`#delete-todo-${todo._id}`).click(todo, deleteTodo)
      $(`#update-status-${todo._id}`).click(todo, statusTodo)
    });
    $('#value-data').show()
  })
  .fail(err => {
    console.log(err)
  })
}

function createTodo(e){
  if (e) e.preventDefault()
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/todos',
    headers: { access_token: localStorage.getItem('access_token') },
    data: {
      title: $('#create-title').val(),
      description: $('#create-description').val(),
      dueDate: $('#create-dueDate').val()
    }
  })
  .done(todo => {
    getAllTodos()
    $('#modal-create').modal('hide')
    $('#create-title').val(''),
    $('#create-description').val(''),
    $('#create-dueDate').val('')
  })
  .fail(err => {
    console.log(err)
  })
}

function editPageTodo(e){
  if (e) e.preventDefault()
  const todo = e.data
  $("#edit-title").val(todo.title)
  $("#edit-description").val(todo.description)
  $("#edit-dueDate").val(todo.dueDate.slice(0, ("yyyy-mm-dd").length))
  $("#id-todo-edit").val(todo._id)
  $("#modal-edit").modal("show")
}

function editTodo(e){
  if (e) e.preventDefault()
  const id = $('#id-todo-edit').val()
  $.ajax({
    method: 'PUT',
    url: `http://localhost:3000/todos/${id}`,
    headers: { access_token: localStorage.getItem('access_token') },
    data: {
      title: $("#edit-title").val(),
      description: $("#edit-description").val(),
      dueDate: $("#edit-dueDate").val()
    }
  })
  .done(todo => {
    getAllTodos()
    $('#modal-edit').modal('hide')
  })
  .fail(err => {
    console.log(err)
  })
}

function deleteTodo(e) {
  if (e) e.preventDefault()
  const id = e.data._id
  $.ajax({
    method: 'DELETE',
    url: `http://localhost:3000/todos/${id}`,
    headers: { access_token: localStorage.getItem('access_token') },
  })
  .done(todo => {
    getAllTodos()
    $('#modal-edit').modal('hide')
  })
  .fail(err => {
      console.log(err)
  })
}

function statusTodo(e) {
  if (e) e.preventDefault()
  const id = e.data._id
  $.ajax({
    method: 'PUT',
    url: `http://localhost:3000/todos/${id}`,
    headers: { access_token: localStorage.getItem('access_token') },
    data: {
      status: true
    }
  })
    .done(todo => {
      getAllTodos()
      $('#modal-edit').modal('hide')
    })
    .fail(err => {
      console.log(err)
    })
}

