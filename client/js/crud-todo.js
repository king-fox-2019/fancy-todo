let today = (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toLocaleString({ timeZone: 'Asia/Jakarta' })

function createTodo(event) {
  event.preventDefault()
  if ($('#todo-add-title').val().length < 1 ||
    $('#todo-add-description').val().length < 1 ||
    $('#todo-input-datepicker').val().length < 1) {
    Swal.fire('Oops..', 'All fields must be filled!')
    return
  }

  if (new Date($('#todo-input-datepicker').val()) < today) {
    Swal.fire('Oops..', 'The due date can\'t be before today!')
    return
  }

  $.ajax({
    url: `${baseUrl}/todos`,
    method: 'post',
    data: {
      title: $('#todo-add-title').val(),
      description: $('#todo-add-description').val(),
      dueDate: $('#todo-input-datepicker').val()
    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (response) {
      // console.log(response);
      $('#todo-add-title').val('')
      $('#todo-add-description').val('')
      $('#todo-input-datepicker').val('')
      $('#collapse-add-todo').removeClass('show')
      Swal.fire('Success', response.message)
      getTodoItems()
    })
    .fail(err => {
      console.log('error when creating a task', err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function updateTodo(event) {
  event.preventDefault()
  const todoId = event.target.id

  if ($('#todo-update-title').val().length < 1 ||
    $('#todo-update-description').val().length < 1 ||
    $('#todo-update-datepicker').val().length < 1) {
    Swal.fire('Oops..', 'All fields must be filled!')
    return
  }

  if (new Date($('#todo-update-datepicker').val()) < today) {
    Swal.fire('Oops..', 'The due date can\'t be before today!')
    return
  }

  $.ajax({
    url: `${baseUrl}/todos/${todoId}`,
    method: 'put',
    data: {
      title: $('#todo-update-title').val(),
      description: $('#todo-update-description').val(),
      dueDate: $('#todo-update-datepicker').val()
    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (response) {
      $('#todo-input-update').hide()
      $('#todo-input').show()
      getTodoItems()
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function getTodoItems() {
  $('#todo-container').hide()

  return $.ajax({
    url: `${baseUrl}/todos`,
    method: 'get',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (todoItems) {
      $('#todo-items').empty()

      const nonProjectTodoItems = todoItems.filter(todoItem => !todoItem.project)

      nonProjectTodoItems.forEach((todoItem, index) => {
        // console.log('ini each todo item', todoItem)
        if (!todoItem.project) {
          let params = {
            id: todoItem._id,
            index: index + 1,
            title: todoItem.title,
            description: todoItem.description,
            dueDate: new Date(todoItem.dueDate),
            completed: todoItem.completed,
            important: todoItem.important
          }
          $('#todo-container').show()
          $('#todo-items').append(renderTodoList(params))
        }
      })
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function findTodo(event) {
  const todoId = event.target.id
  // console.log('masuk findTodo', todoId)
  $.ajax({
    url: `${baseUrl}/todos/${todoId}`,
    method: 'get',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(todo => {
      $('#todo-input').hide()
      $('#todo-input-update').html(renderUpdateTodoForm(todo))
      $(`#collapse-edit`).addClass('show')
      $(function(){
        var dtToday = new Date();
        
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
        
        var maxDate = year + '-' + month + '-' + day;
        // $('#todo-input-datepicker').attr('min', maxDate);
        $('#todo-update-datepicker').attr('min', maxDate);
        $('.datepicker').attr('min', maxDate);
      })
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', err.responseJSON.messages[0])
    })
}

function updateImportant(event) {
  const todoId = event.target.id.split('-')
  // console.log('todoId pas update important', todoId);

  if (todoId.includes('project')) {
    $.ajax({
      url: `${baseUrl}/todos/${todoId[1]}/important`,
      method: 'patch',
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(todo => {
        // console.log(todo)
        getProjectsAfterUpdate()
      })
      .fail(err => {
        console.log(err)
        Swal.fire('Oops..', 'Something went wrong.')
      })
  } else {
    $.ajax({
      url: `${baseUrl}/todos/${todoId}/important`,
      method: 'patch',
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(todo => {
        // console.log(todo)
        getTodoItems()
      })
      .fail(err => {
        console.log(err)
        Swal.fire('Oops..', 'Something went wrong.')
      })
  }
}

function deleteTodo(event) {
  const todoId = event.target.id.split('-')
  if (todoId.includes('project')) {
    $.ajax({
      url: `${baseUrl}/todos/${todoId[1]}`,
      method: 'delete',
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(function (response) {
        $('#todo-container').hide()
        getProjectsAfterUpdate()
      })
      .fail(err => {
        console.log(err)
        Swal.fire('Oops..', 'Something went wrong.')
      })
  } else {
    $.ajax({
      url: `${baseUrl}/todos/${todoId[0]}`,
      method: 'delete',
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(function (response) {
        $('#todo-container').hide()
        getTodoItems()
      })
      .fail(err => {
        console.log(err)
        Swal.fire('Oops..', 'Something went wrong.')
      })
  }
}

function complete() {
  $('input[type=checkbox]').on('change', function () {
    const todoId = $(this).val().split('-')
    // console.log('ini todoId pas complete', todoId);
    if (todoId.includes('project')) {
      $.ajax({
        url: `${baseUrl}/todos/${todoId[1]}`,
        method: 'patch',
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .done(function (response) {
          getProjectsAfterUpdate()
        })
        .fail(err => {
          console.log(err)
          Swal.fire('Oops..', 'Something went wrong.')
        })
    } else {
      $.ajax({
        url: `${baseUrl}/todos/${todoId[0]}`,
        method: 'patch',
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .done(function (response) {
          getTodoItems()
        })
        .fail(err => {
          console.log(err)
          Swal.fire('Oops..', 'Something went wrong.')
        })
    }
  })
}

// RENDERINGS

function renderTodoList(params) {
  // console.log('masuk sini');
  let rendering

  if (!params.completed && !params.important) {
    rendering =
      `
    <tr>
      <th class="text-center m-2" scope="row">
        ${params.index}
      </th>
      <td class="text-center m-2">
        ${params.title}
      </td>
      <td class="text-center m-2">
        ${params.description}
      </td>
      <td class="text-center m-2">
        ${params.dueDate.toDateString()}
      </td>
      <td class="text-center">
        <div class="squaredThree">
          <input id="checkbox_${params.id}" class="m-2 squaredThree" type="checkbox" value="${params.id}" id="check-complete" onclick="complete()">
          <label for="checkbox_${params.id}"></label>
        </div>
      </td>
      <td class="text-center">
        <input type="button" class="btn btn-dark m-2" value="Delete" onclick="deleteTodo(event)" id="${params.id}"> | 
        <input type="button" class="btn btn-dark m-2" value="Edit" onclick="findTodo(event)" id="${params.id}"> | 
        <input type="button" class="btn btn-dark m-2" value="Mark as important" onclick="updateImportant(event)" id="${params.id}">
      </td>
    </tr>
    `
  }
  else if (!params.completed && params.important) {
    // console.log("condition2")
    rendering =
      `
    <tr>
      <th class="text-center" scope="row">
        ${params.index}
      </th>
      <td class="text-center">
        <strong><em>${params.title}</em></strong>
      </td>
      <td class="text-center">
        <strong><em>${params.description}</em></strong>
      </td>
      <td class="text-center">
        <strong><em>${params.dueDate.toDateString()}</em></strong>
      </td>
      <td class="text-center">
        <div class="squaredThree">
          <input id="checkbox_${params.id}" class="m-2 squaredThree" type="checkbox" value="${params.id}" id="check-complete" onclick="complete()">
          <label for="checkbox_${params.id}"></label>
        </div>
      </td>
      <td class="text-center">
        <input type="button" class="btn btn-dark m-2" value="Delete" onclick="deleteTodo(event)" id="${params.id}"> | 
        <input type="button" class="btn btn-dark m-2" value="Edit" onclick="findTodo(event)" id="${params.id}"> | 
        <input type="button" class="btn btn-dark m-2" value="Unmark as important" onclick="updateImportant(event)" id="${params.id}">
      </td>
    </tr>
    `
  }
  else if (params.completed && !params.important) {
    // console.log("condition3")
    rendering =
      `
    <tr>
      <th scope="row" class="text-center m-2">
        <strike>${params.index}</strike>
      </th>
      <td class="text-center m-2">
        <strike>${params.title}</strike>
      </td>
      <td class="text-center m-2">
        <strike>${params.description}</strike>
      </td>
      <td class="text-center m-2">
        <strike>${params.dueDate.toDateString()}</strike>
      </td>
      <td class="text-center">
        <div class="squaredThree">
          <input id="checkbox_${params.id}" class="m-2 squaredThree" type="checkbox" value="${params.id}" id="check-complete" onclick="complete()" checked>
          <label for="checkbox_${params.id}"></label>
        </div>
      </td>
      <td class="text-center">
        <input type="button" class="btn btn-dark m-2" value="Delete" onclick="deleteTodo(event)" id="${params.id}"> | 
        <input type="button" class="btn btn-dark m-2" value="Edit" onclick="findTodo(event)" id="${params.id}"> |
        <input type="button" class="btn btn-dark m-2" value="Mark as important" onclick="updateImportant(event)" id="${params.id}">
      </td>
    </tr>
    `
  }
  else {
    // console.log("condition4")
    rendering =
      `
    <tr>
      <th scope="row" class="text-center m-2">
        <strike>${params.index}</strike>
      </th>
      <td class="text-center m-2">
        <strike>${params.title}</strike>
      </td>
      <td class="text-center m-2">
        <strike>${params.description}</strike>
      </td>
      <td class="text-center m-2">
        <strike>${params.dueDate.toDateString()}</strike>
      </td>
      <td class="text-center">
        <div class="squaredThree">
          <input id="checkbox_${params.id}" class="m-2 squaredThree" type="checkbox" value="${params.id}" id="check-complete" onclick="complete()" checked>
          <label for="checkbox_${params.id}"></label>
        </div>
      </td>
      <td class="text-center">
        <input type="button" class="btn btn-dark m-2" value="Delete" onclick="deleteTodo(event)" id="${params.id}"> | 
        <input type="button" class="btn btn-dark m-2" value="Edit" onclick="findTodo(event)" id="${params.id}"> |
        <input type="button" class="btn btn-dark m-2" value="Unmark as important" onclick="updateImportant(event)" id="${params.id}">
      </td>
    </tr>
    `
  }
  return rendering
}

function renderUpdateTodoForm(todo) {
  var initialDueDate = new Date(todo.dueDate)

  var day = ("0" + initialDueDate.getDate()).slice(-2);
  var month = ("0" + (initialDueDate.getMonth() + 1)).slice(-2);

  var dateToUpdate = initialDueDate.getFullYear()+"-"+(month)+"-"+(day)

  $("#todo-input-update").show()
  let rendering =
    `
    <div id="accordion">
      <div class="card">
        <div onclick="location.href='#';" style="cursor: pointer;" class="card-header bg-dark" data-toggle="collapse" data-target="#collapse-edit" id="heading-edit">
          <h5 class="text-center mb-0">
            <button class=" btn btn-link text-white" data-toggle="collapse" data-target="#collapse-edit"
            aria-expanded="true" aria-controls="collapse-edit">
              Click here to edit
            </button>
          </h5>
        </div>

        <div id="collapse-edit" class="collapse" aria-labelledby="heading-edit" data-parent="#accordion">
          <div class="card-body">
            <form>

              <div class="col my-3">
                <input type="text" class="text-center form-control" id="todo-update-title" placeholder="Title" value="${todo.title}" required>
              </div>

              <div class="col my-3">
                <input type="text" class="text-center form-control" id="todo-update-description" placeholder="Description" value="${todo.description}"
                  required>
              </div>

              <div class="col my-3">
                <div class="col text-center">
                  Due date:
                </div> 
                <input 
                  type="date" 
                  id="todo-update-datepicker" 
                  class="datepicker text-center pl-5 
                  form-control" 
                  value="${dateToUpdate}"
                  />
              </div>

              <div class="text-center submit-button mt-4 mb-3">
                <input 
                  id="${todo._id}" 
                  type="button" 
                  value="Submit" 
                  class="btn-dark btn" 
                  onclick="updateTodo(event)">
                <br>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  `
  return rendering
}