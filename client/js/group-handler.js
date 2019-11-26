let groups = []
let groupTodos = []

function fetchGroup(access_token) {
  toast('Loading')
  $.ajax(`${baseUrl}/user/groups`, {
    method: 'GET',
    headers: {
      access_token
    }
  })
    .done(({ data }) => {
      groups = data
      enlistGroups()
      Swal.close()
    })
    .fail(({ responseJSON }) => {
      toast(responseJSON, 5000)
    })
}

function enlistGroups() {
  $('#group-list').empty()
  for (const group of groups) {
    $('#group-list').append(`
      <tr onclick="toGroupPage('${group._id}', '${group.name}')">
        <td>${group.name}</td>
        <td>${group.leader.username}</td>
        <td>${group.members.length}</td>
      </tr>
    `)
  }
}

function onCreateGroup(e) {
  if (e) e.preventDefault()
  $('#btn-group-create').empty().append(`
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Creating...
  `)
  const groupName = $('#group-list-page #group-name')
  if (!groupName.val()) {
    groupName
      .addClass('is-invalid')
      .focusin(() => groupName.removeClass('is-invalid'))
    $('#btn-group-create')
      .empty()
      .append('Create New Group')
    return false
  }
  const access_token = localStorage.getItem('access_token')
  $.ajax(`${baseUrl}/groups`, {
    method: 'POST',
    headers: { access_token },
    data: {
      name: groupName.val()
    }
  })
    .done(({ data }) => {
      toast('New group created', 3000)
      $('#btn-group-create')
        .empty()
        .append('Create New Group')
      groups.push(data)
      enlistGroups()
    })
    .fail(({ responseJSON }) => {
      toast(responseJSON, 5000)
      $('#btn-group-create')
        .empty()
        .append('Create New Group')
    })
    .always(() => {
      groupName.val('')
    })
  return false
}

function fetchGroupTodos(access_token) {
  toast('Loading')
  const groupId = localStorage.getItem('group_id')
  $.ajax(`${baseUrl}/groups/${groupId}/todos`, {
    method: 'GET',
    headers: {
      access_token
    }
  })
    .done(({ data }) => {
      groups = data
      arrangeGroupCards()
      Swal.close()
    })
    .fail(({ responseJSON }) => {
      toast(responseJSON, 5000)
    })
}

function arrangeGroupCards() {
  $('#group-todo-cards').empty()
  for (const todo of todos) {
    $('#group-todo-cards').append(`
        <div class="col-12 col-md-6 col-lg-4 col-xl-3" id="${todo._id}">
          <div
            class="card mb-4"
            style="min-width: 15rem; min-height: 18rem;"
          >
            <div class="card-body d-flex flex-column position-relative">
              <div class="card-title">
                <h5 class="mb-0">${todo.name}</h5>
                <small class="d-block todo-status ${
                  todo.status == 'missed'
                    ? 'text-danger'
                    : todo.status == 'done'
                    ? 'text-success'
                    : 'text-muted'
                }">Status: ${todo.status}</small>
                <small class ="mt-0 text-muted">Due: ${moment(
                  todo.dueDate
                ).format('ddd, MMM Do YYYY')}</small>
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
      onOpenEditModal(todo)
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
