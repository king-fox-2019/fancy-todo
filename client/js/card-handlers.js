function fetchCards(access_token) {
  toast('Loading')
  $.ajax(`${baseUrl}/user/todos`, {
    method: 'GET',
    headers: {
      access_token
    }
  }).done(({ data }) => {
    appendCards(data)
    Swal.close()
  })
}

function appendCards(todos) {
  if (todos.length) {
    for (const todo of todos) {
      $('#todo-cards').append(`
        <div class="col-12 col-md-6 col-lg-4 col-xl-3" id="${todo._id}">
          <div
            class="card mb-4"
            style="min-width: 15rem; min-height: 15rem;"
          >
            <div class="card-body d-flex flex-column position-relative">
              <div class="card-title">
                <h5 class="mb-0">${todo.name}</h5>
                <small class="todo-status ${
                  todo.status == 'missed' ? 'text-danger' : 'text-muted'
                }">Status: ${todo.status}</small>
                <div
                  class="position-absolute"
                  style="font-size: large; top: 1rem; right: 1rem;"
                  id="edit-todo-${todo._id}"
                >
                  <a href=""><i class="fas fa-edit text-muted"></i></a>
                </div>
              </div>
              <p class="card-text">
                ${todo.description || 'No description'}
              </p>
              <div class="mt-auto">
                <p class="card-text">
                  <small class="todo-last-update text-muted">${moment(
                    todo.updatedAt
                  ).fromNow()}</small>
                </p>
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-danger" id="delete-todo-${todo._id}">
                <i class="fas fa-trash-alt"></i>
              </button>
              <button class="btn btn-success" id="toggle-mark-${todo._id}">
                ${
                  todo.status == 'pending'
                    ? 'Mark Done'
                    : todo.status == 'done'
                    ? 'Mark Undone'
                    : ''
                }
              </button>
            </div>
          </div>
        </div>
      `)

      $(`#edit-todo-${todo._id}`).click(function(e) {
        e.preventDefault()
        onEditTodo(todo)
        return false
      })

      $(`#delete-todo-${todo._id}`).click(todo, onDeleteTodo)

      if (todo.status == 'missed') {
        $(`#toggle-mark-${todo._id}`).remove()
      } else {
        $(`#toggle-mark-${todo._id}`).click(todo, onToggleMark)
      }
    }
  } else {
    const todo = todos
    $('#todo-cards').prepend(`
        <div class="col-12 col-md-6 col-lg-4 col-xl-3" id="${todo._id}">
          <div
            class="card mb-4"
            style="min-width: 15rem; min-height: 15rem;"
          >
            <div class="card-body d-flex flex-column position-relative">
              <div class="card-title">
                <h5 class="mb-0">${todo.name}</h5>
                <small class="todo-status ${
                  todo.status == 'missed' ? 'text-danger' : 'text-muted'
                }">Status: ${todo.status}</small>
                <div
                  class="position-absolute"
                  style="font-size: large; top: 1rem; right: 1rem;"
                  id="edit-todo-${todo._id}"
                >
                  <a href=""><i class="fas fa-edit text-muted"></i></a>
                </div>
              </div>
              <p class="card-text">
                ${todo.description || 'No description'}
              </p>
              <div class="mt-auto">
                <p class="card-text">
                  <small class="todo-last-update text-muted">${moment(
                    todo.updatedAt
                  ).fromNow()}</small>
                </p>
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-danger" id="delete-todo-${todo._id}">
                <i class="fas fa-trash-alt"></i>
              </button>
              <button class="btn btn-success" id="toggle-mark-${todo._id}">
                ${
                  todo.status == 'pending'
                    ? 'Mark Done'
                    : todo.status == 'done'
                    ? 'Mark Undone'
                    : ''
                }
              </button>
            </div>
          </div>
        </div>
      `)
    $(`#edit-todo-${todo._id}`).click(function(e) {
      e.preventDefault()
      onEditTodo(todo)
      return false
    })

    $(`#delete-todo-${todo._id}`).click(todo, onDeleteTodo)

    if (todo.status == 'missed') {
      $(`#toggle-mark-${todo._id}`).remove()
    } else {
      $(`#toggle-mark-${todo._id}`).click(todo, onToggleMark)
    }
  }
}

// Event hanlders
function onEditTodo(todo) {
  console.log('On Edit!')
  console.log(todo)
}

function onDeleteTodo(e) {
  const todo = e.data
  Swal.fire({
    title: 'Are you sure?',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#007bff',
    reverseButtons: true,
    confirmButtonText: 'Delete',
    focusConfirm: false,
    focusCancel: true
  }).then(result => {
    if (result.value) {
      toast('Loading')
      $.ajax(`${baseUrl}/todos/${todo._id}`, {
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .done(() => {
          $(`#${todo._id}`).remove()
          toast('Todo deleted!', 5000)
        })
        .fail(({ responseJSON }) => {
          toast(responseJSON, 5000)
        })
    }
  })
}

function onToggleMark(e) {
  const todo = e.data
  toast('Loading')
  $.ajax(`${baseUrl}/todos/${todo._id}`, {
    method: 'PATCH',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(({ data }) => {
      $(`#${data._id} .todo-status`).text(`Status: ${data.status}`)
      $(`#toggle-mark-${data._id}`).text(
        `${
          data.status == 'pending'
            ? 'Mark Done'
            : data.status == 'done'
            ? 'Mark Undone'
            : ''
        }`
      )
      $(`#${data._id} .todo-last-update`).text(moment(data.updatedAt).fromNow())
      Swal.close()
    })
    .fail(({ responseJSON }) => {
      toast(responseJSON, 5000)
    })
}

function onOpenTodoModal() {
  $('#todo-modal').modal({
    backdrop: 'static'
  })
  $('#todo-modal').on('hidden.bs.modal', function(e) {
    $('#todo-modal #todo-name').val('')
    $('#todo-modal #todo-desc').val('')
    $('#todo-modal #todo-due').val('')
  })
}

function onCreateTodo(e) {
  if (e) e.preventDefault()
  $('#btn-todo-create').empty().append(`
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Creating...
  `)
  validateTodoName()
  if ($('#todo-modal .is-invalid').length > 0) {
    $('#btn-todo-create')
      .empty()
      .append('Create')
    return false
  }
  const name = $('#todo-modal #todo-name')
  const description = $('#todo-modal #todo-desc')
  const dueDate = $('#todo-modal #todo-due')
  console.log(dueDate.val())
  const access_token = localStorage.getItem('access_token')
  $.ajax(`${baseUrl}/todos`, {
    method: 'POST',
    headers: {
      access_token
    },
    data: {
      name: name.val(),
      description: description.val() || undefined,
      dueDate: dueDate.val() || undefined
    }
  })
    .done(({ data }) => {
      appendCards(data)
      $('#todo-modal').modal('hide')
      toast('New todo created', 3000)
    })
    .fail(({ responseJSON }) => {
      toast(responseJSON.join(', '), 5000)
    })
    .always(() => {
      $('#btn-todo-create')
        .empty()
        .append('Create')
    })
}

function validateTodoName() {
  if ($('#todo-modal #todo-name').val().length > 0) {
    $('#todo-modal #todo-name').removeClass('is-invalid')
  } else {
    $('#todo-modal #todo-name').addClass('is-invalid')
  }
}
