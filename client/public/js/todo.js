function renderModalCreateTodo() {
  $("#modal-create-todo").modal("show");
  $("#close-modal-createtodo").click(function() {
    $("#modal-create-todo").modal("hide");
    $("#createTodo-name").val("");
    $("#createTodo-description").val("");
    $("#createTodo-due").val("");
  });
}

function createTodo() {
  let name = $("#createTodo-name").val();
  let description = $("#createTodo-description").val();
  let due = $("#createTodo-due").val();
  let token = localStorage.getItem("token");
  $.ajax({
    url: baseUrl + "/todos/",
    method: "POST",
    headers: {
      token
    },
    data: {
      name,
      description,
      due
    }
  })
    .done(response => {
      getTodo();
      $("#modal-create-todo").modal("hide");
      alertify.success(response.message);
    })
    .fail(err => {
      $("#modal-create-todo").modal("hide");
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
      setTimeout(() => {
        renderModalSignin();
      }, 2000);
    })
    .always(_ => {
      $("#createTodo-name").val("");
      $("#createTodo-description").val("");
      $("#createTodo-due").val("");
    });
}

function getQuote() {
  $("#quote-page").empty();
  $.ajax({
    url: baseUrl + "/quotes/",
    method: "GET",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      let author = "";
      if (response.author === null || response.author === undefined) {
        author = "anonymus";
      } else {
        author = response.author;
      }
      $("#quote-page").append(`
      <h2>${response.text}</h2>
      <p>${author}</p>
    `);
    })
    .fail(err => {
      alertify.message("sorry no have quote for today");
    })
    .always();
}

function getTodo() {
  $("#todo-content").empty();
  $.ajax({
    url: baseUrl + "/todos/",
    method: "GET",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      if (response.length == 0) {
        setTimeout(() => {
          alertify.message("No Have Todo");
        }, 4000);
      } else {
        response.forEach(e => {
          let status = "";
          if (e.status) {
            status = "done";
          } else {
            status = "unDone";
          }
          let date = new Date(e.due);
          let resultDate = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`;
          if (!e.description) e.description = " ";
          if (e.status) {
            $("#todo-content").append(`
            <div class="col-4">
            <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header" style="display:flex; justify-content: space-between;">
                ${e.name}
                <button type="button" onclick="unDone('${e._id}')" class="btn-sm btn-success ml-5">
                  unDone
                </button>
              </div>
              <div class="card-body">
                <h5 class="card-title">${e.description}</h5>
                <p class="card-text">
                  Due Date : ${resultDate}
                </p>
                <h5 class="card-title">Status : ${status}</h5>
              </div>
              <div class="card-footer" style="display:flex; justify-content:space-between;">
                <button type="button" onclick="showModalUpdateTodo('${e._id}')" class="btn-sm btn-warning">
                  Update
                </button>
                <button type="button" onclick="deleteTodo('${e._id}')" class="btn-sm btn-danger ml-5">
                  Delete
                </button>
              </div>
            </div>
          </div>
            `);
          } else {
            $("#todo-content").append(`
            <div class="col-4">
            <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header" style="display:flex; justify-content: space-between;">
                ${e.name}
                <button type="button" onclick="done('${e._id}')" class="btn-sm btn-success ml-5">
                  done
                </button>
              </div>
              <div class="card-body">
                <h5 class="card-title">${e.description}</h5>
                <p class="card-text">
                  Due Date : ${resultDate}
                </p>
                <h5 class="card-title">Status : ${status}</h5>
              </div>
              <div class="card-footer" style="display:flex; justify-content:space-between;">
                <button type="button" onclick="showModalUpdateTodo('${e._id}')" class="btn-sm btn-warning">
                  Update
                </button>
                <button type="button" onclick="deleteTodo('${e._id}')" class="btn-sm btn-danger ml-5">
                  Delete
                </button>
              </div>
            </div>
          </div>
            `);
          }
        });
      }
    })
    .fail(err => {
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    });
}

function deleteTodo(id) {
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: "DELETE",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      alertify.success(response.message);
    })
    .fail(err => {
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {
      getTodo();
    });
}

function done(id) {
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: "PATCH",
    data: {
      status: true
    },
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      alertify.success(response.message);
    })
    .fail(err => {
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {
      getTodo();
    });
}

function unDone(id) {
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: "PATCH",
    data: {
      status: false
    },
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      alertify.success(response.message);
    })
    .fail(err => {
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {
      getTodo();
    });
}

function showModalUpdateTodo(id) {
  $.ajax({
    url: baseUrl + `/todos/search/${id}`,
    method: "GET",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      $("#renderModalUpdate").append(`
        <div
        class="modal fade"
        id="modal-update-todo"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Form Update Todo
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="btn-update-todo">
                <div class="form-group">
                  <label for="exampleInputTodoName">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="updateTodo-name"
                    value="${response.response.name}"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputTodoDescription">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="updateTodo-description"
                    value="${response.response.description}"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputDueDate">Due Date</label>
                  <input
                    type="date"
                    class="form-control"
                    id="updateTodo-due"
                    value="${response.response.due}"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputDone">Status</label>
                  <div class="radio">
                    <label><input id="updateTodo-status-done" type="radio" name="optradio" checked>Done</label>
                  </div>
                  <div class="radio">
                    <label><input id="updateTodo-status-undone" type="radio" name="optradio">UnDone</label>
                  </div>
                </div>
                <button type="submit" onclick="updateTodo('${response.response._id}')" class="btn btn-primary">
                  update Todo
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                id="close-modal-updatetodo"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
  `);
    })
    .fail(err => {
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {
      $("#modal-update-todo").modal("show");
    });
}

function updateTodo(id) {
  let name = $("#updateTodo-name").val();
  let description = $("#updateTodo-description").val();
  let due = $("#updateTodo-due").val();
  let status;
  if ($("#updateTodo-status-done").prop("checked")) {
    status = true;
  } else if ($("#updateTodo-status-undone").prop("checked")) {
    status = false;
  }
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: "PUT",
    data: {
      name,
      description,
      due,
      status
    },
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      alertify.success(response.message);
    })
    .fail(err => {
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {
      $("#modal-update-todo").modal("hide");
      getTodo();
    });
}
