function fetchTodos() {
  $.ajax({
    method: "get",
    url: `${baseUrl}/todo`,
    headers: { access_token: localStorage.getItem('access_token') }
  })
  .done(todosArr => {
    $("#todo-list").empty();
    showTodos(todosArr);
  })
  .fail(err => {
    console.log(err)
  })
}

function showTodos(todos) {
  $("#todo-list").empty();
  for (let todo of todos) {
    let date = todo.due_date.slice(0, 10)
    $("#todo-list").append(
      `<li class="each-task list-group-item">
        <div class="card-body">
          <button id="check-${todo._id}" class="checker btn btn-success btn-sm mr-2" onclick="check('${todo._id}', $(this).text())">Check</button>
          <span class="todo-name">${todo.name}</span>
          <br>
          <div class="info float-left buttons-action">
            <span class="to-details checker btn btn-info btn-sm mr-2" onclick="showTodo('${todo._id}')">Details</span>
            <span id="status-${todo._id}" class="badge badge-pill badge-warning">${todo.status}</span>
            <span class="due-date">${date}</span>
          </div>     
        </div>
    </li>`
    );
    // $(".todo-details").hide();
    $("#main-todo").show()
  }
}

// ----------------------------

function showTodo(todoId) {
  let params = {};
  $.ajax({
    method: "get",
    url: `${baseUrl}/todo/${todoId}`,
    headers: { access_token: localStorage.getItem('access_token') }
  })
  .done(result => {
      params.name = result.name,
      params.description = result.description,
      params.due_date = result.due_date.slice(0, 10)

    $(".todo-details").html(
      `<article>
      <p>${result.description}</p>
      </article>
      <div class="actions buttons-action mx-auto">
      <button class="btn btn-primary btn-sm check" 
      onclick="showEdit('${todoId}', '${params.name}', '${params.description}', '${params.due_date}')">
      Edit
      </button>
      <button class="btn btn-danger btn-sm delete" onclick="deleteTodo('${todoId}')">Delete</button>
      </div>
      `
    )
  })
  .fail(err => {
    console.log(err)
  })
}

function createTodo(e) {
  if (e) e.preventDefault();
  
  $.ajax({
    method: "post",
    url: `${baseUrl}/todo`,
    data: {
      name: $("#todo-name").val(),
      description: $("#todo-description").val(),
      due_date: $("#todo-due-date").val()
    },
    headers: { access_token: localStorage.getItem('access_token') }
  })
  .done(todo => {
    $("#input-form").trigger("reset");
    fetchTodos()
  })
  .fail(err => {
    console.log(err);
  })
}

function check(todoId, t) {
  let status;
  let selectCheck = `#check-${todoId}`;
  let selectStat = `#status-${todoId}`
  if (t === "Check") {
    $(`${selectCheck}`).text("Uncheck");
    $(`${selectCheck}`).removeClass("btn-success").addClass("btn-secondary");
    $(`${selectStat}`).text("Done")
    $(`${selectStat}`).removeClass("badge-warning").addClass("badge-success")
    status = "Done";
  } else if (t = "Uncheck") {
    $(`${selectCheck}`).text("Check")
    $(`${selectCheck}`).removeClass("btn-secondary").addClass("btn-success");
    $(`${selectStat}`).text("Queued")
    $(`${selectStat}`).removeClass("badge-success ").addClass("badge-warning")
    status = "Queued"
  }

  $.ajax({
    method: "patch",
    url: `${baseUrl}/todo/${todoId}`,
    data: { status },
    headers: { access_token: localStorage.getItem('access_token') }
  })
  .done(result => {
    console.log(result)
  })
  .fail(err => {
    console.log(err)
  })
}

function showEdit(todoId, name, description, due_date) {
  $(".todo-details").html(
    `
    <div id="edit-todo" class="all card card-body mt-3">
      <div class="container">
        <h2 class="title">Edit Todo</h2>
        <div class="col-md-12">
          <form id="edit-form" class="mb-4" onsubmit="createTodo(event)">
              <input id="edit-todo-name" name="name" type="text" class="form-control mb-2 flex-fill" value="${name}">
              <textarea id="edit-todo-description" rows="5" name="description" type="textarea" class="form-control mb-2 flex-fill" >${description}</textarea>
              Due date: <input id="edit-todo-due-date" name="due_date" type="date" class="form-control mb-2 flex-fill" value="${due_date}">
              <input type="submit" class="btn btn-primary" value="Save Edit" onclick="edit('${todoId}')">
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- End of edit -->
    `
  )
}

function edit(todoId) {
  $.ajax({
    method: "patch",
    url: `${baseUrl}/todo/${todoId}`,
    data: {
      name: $("#edit-todo-name").val(),
      description: $("#edit-todo-description").val(),
      due_date: $("#edit-todo-due-date").val()
    },
    headers: { access_token: localStorage.getItem('access_token') }
  })
  .done(result => {
    console.log(result)
  })
  .fail(err => {
    console.log(err)
  })
}

function deleteTodo(todoId) {
  $.ajax({
    method: "delete",
    url: `${baseUrl}/todo/${todoId}`,
    headers: { access_token: localStorage.getItem('access_token') }
  })
  .done(result => {
    console.log(result)
    fetchTodos()
  })
  .fail(err =>  {
    console.log(err)
  })
}