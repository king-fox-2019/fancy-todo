function fetchCards(access_token) {
  $.ajax(`${baseUrl}/user/todos`, {
    method: 'GET',
    headers: {
      access_token
    }
  }).done(({ data }) => {
    appendCards(data)
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
                <small class="todo-status text-muted">Status: ${
                  todo.status
                }</small>
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
                  <small class="text-muted">${moment(
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

      $(`#toggle-mark-${todo._id}`).click(todo, onToggleMark)
    }
  } else {
    const todo = todos
    $('#todo-cards').append(`
        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
          <div
            class="card mb-4"
            style="min-width: 15rem; min-height: 15rem;"
          >
            <div class="card-body d-flex flex-column position-relative">
              <div class="card-title">
                <h5 class="mb-0">${todo.name}</h5>
                <small class="text-muted">Status: ${todo.status}</small>
                <div
                  class="position-absolute"
                  style="font-size: large; top: 1rem; right: 1rem;"
                  onclick="onEditTodo(${todo})"
                >
                  <i class="fas fa-edit text-muted"></i>
                </div>
              </div>
              <p class="card-text">
                ${todo.description || 'No description'}
              </p>
              <div class="mt-auto">
                <p class="card-text">
                  <small class="text-muted">${moment(
                    todo.updatedAt
                  ).fromNow()}</small>
                </p>
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-danger" onclick="onDeleteTodo(${todo})">
                <i class="fas fa-trash-alt"></i>
              </button>
              <button class="btn btn-success">${
                todo.status == 'pending'
                  ? 'Mark Done'
                  : todo.status == 'done'
                  ? 'Mark Undone'
                  : ''
              }</button>
            </div>
          </div>
        </div>
      `)
  }
}

function onEditTodo(todo) {
  console.log('On Edit!')
  console.log(todo)
}

function onDeleteTodo(e) {
  const todo = e.data
  console.log('On Delete!')
  console.log(todo)
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
      Swal.close()
    })
    .fail(({ responseJSON }) => {
      toast(responseJSON, 5000)
    })
}
