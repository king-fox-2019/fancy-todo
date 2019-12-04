function renderModalCreateProject() {
  $("#modal-create-project").modal("show");
  $("#close-modal-createproject").click(function() {
    $("#modal-create-project").modal("hide");
    $("#createProject-name").val("");
    $("#createProject-description").val("");
  });
}

function createProject() {
  let name = $("#createProject-name").val();
  let description = $("#createProject-description").val();
  let token = localStorage.getItem("token");
  $.ajax({
    url: baseUrl + "/projects/",
    method: "POST",
    headers: {
      token
    },
    data: {
      name,
      description
    }
  })
    .done(response => {
      $("#modal-create-project").modal("hide");
      getProject();
      alertify.success(response.message);
    })
    .fail(err => {
      $("#modal-create-project").modal("hide");
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
      $("#createProject-name").val("");
      $("#createProject-description").val("");
    });
}

function getProject() {
  $("#dropdown-menu-project").empty();
  let token = localStorage.getItem("token");
  $.ajax({
    url: baseUrl + "/projects/",
    method: "GET",
    headers: {
      token
    }
  })
    .done(response => {
      // console.log(response);
      response.forEach(e => {
        $("#dropdown-menu-project").append(`
             <a class="dropdown-item" onclick="seeProject('${e._id}')" href="#">${e.name}</a>
        `);
      });
    })
    .fail(err => {
      $("#dropdown-menu-project").append(`
             <a class="dropdown-item" href="#">No have Project</a>
      `);
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {});
}

function getInvitation() {
  // console.log("masuk invite");
  $("#dropdown-menu-invitation").empty();
  let token = localStorage.getItem("token");
  $.ajax({
    url: baseUrl + "/projects/invitation/",
    method: "GET",
    headers: {
      token
    }
  })
    .done(response => {
      // console.log(response);
      response.forEach(e => {
        $("#dropdown-menu-invitation").append(`
             <a class="dropdown-item" onclick="seeInvitation('${e._id}')" href="#">${e.name}</a>
        `);
      });
      setTimeout(() => {
        alertify.message(`Have ${response.length} invitation project`);
      }, 4000);
    })
    .fail(err => {
      $("#dropdown-menu-invitation").append(`
             <a class="dropdown-item" href="#">No have Invitation</a>
      `);
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {});
}

function seeProject(id) {
  $("#dropdown-project").empty();
  $("#project-todo").empty();
  $("#todo-content").hide();
  $(".project-content").show();
  let token = localStorage.getItem("token");
  $.ajax({
    url: baseUrl + `/projects/search/${id}`,
    method: "GET",
    headers: {
      token
    }
  })
    .done(response => {
      // console.log(response);
      $("#dropdown-project").append(`
      <a class="dropdown-item" onclick="DeleteProject('${response._id}')" href="#"
        >Delete Project</a
      >
      <a class="dropdown-item" onclick="addMember('${response._id}')" href="#"
        >Add Member</a
      >
      <a class="dropdown-item" onclick="kickMember('${response._id}')" href="#"
        >Kick Member</a
      >
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" onclick="goCreateTodo('${response._id}')" href="#"
        >Add Todo</a
      >
      `);
      //todo
      if (response.todo.length == 0) {
        setTimeout(() => {
          alertify.message("No Have Todo in this project");
        }, 2000);
      } else {
        let todos = response.todo;
        todos.forEach(e => {
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
            $("#project-todo").append(`
            <div class="col-4">
            <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header" style="display:flex; justify-content: space-between;">
                ${e.name}
                <button type="button" onclick="unDoneProject('${response._id}','${e._id}')" class="btn-sm btn-success ml-5">
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
                <button type="button" onclick="showModalUpdateProjectTodo('${response._id}','${e._id}')" class="btn-sm btn-warning">
                  Update
                </button>
                <button type="button" onclick="deleteProjectTodo('${response._id}','${e._id}')" class="btn-sm btn-danger ml-5">
                  Delete
                </button>
              </div>
            </div>
          </div>
            `);
          } else {
            $("#project-todo").append(`
            <div class="col-4">
            <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header" style="display:flex; justify-content: space-between;">
                ${e.name}
                <button type="button" onclick="doneProject('${response._id}','${e._id}')" class="btn-sm btn-success ml-5">
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
                <button type="button" onclick="showModalUpdateProjectTodo('${response._id}', '${e._id}')" class="btn-sm btn-warning">
                  Update
                </button>
                <button type="button" onclick="deleteProjectTodo('${response._id}','${e._id}')" class="btn-sm btn-danger ml-5">
                  Delete
                </button>
              </div>
            </div>
          </div>
            `);
          }
        });
      }
      //end todo
    })
    .fail(err => {
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {});
}

function seeInvitation(id) {
  $("#renderModalInvitation").append(`
    <div
      class="modal fade"
      id="modal-invitation-project"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Form Invitation Project
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
            <button type="button" onclick="accInv('${id}')" class="btn btn-primary">
              Accept
            </button>
            <button type="button" onclick="decInv('${id}')" class="btn btn-warning">
              Decline
            </button>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              id="close-modal-invitationproject"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `);
  $("#modal-invitation-project").modal("show");
}

function decInv(id) {
  let token = localStorage.getItem("token");
  $.ajax({
    url: baseUrl + `/projects/member/dec/${id}`,
    method: "PATCH",
    headers: {
      token
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
      $("#modal-invitation-project").modal("hide");
      getInvitation();
      getProject();
    });
}

function accInv(id) {
  let token = localStorage.getItem("token");
  $.ajax({
    url: baseUrl + `/projects/member/acc/${id}`,
    method: "PATCH",
    headers: {
      token
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
      $("#modal-invitation-project").modal("hide");
      getInvitation();
      getProject();
    });
}

function addMember(id) {
  $("#renderModalAddMember").append(`
  <div
    class="modal fade"
    id="modal-add-member"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            Add Member
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
        <form>
          <div class="modal-body">
            <div class="form-group">
              <label for="exampleInputAddMember">Email</label>
              <input
                type="email"
                class="form-control"
                id="email-add-member"
                placeholder="Enter Email"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              onclick="closeAddMember()"
            >
              Close
            </button>
            <button type="submit" id="btn-add-member" onclick="addMemberToProject('${id}')" class="btn btn-primary">
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `);
  $("#modal-add-member").modal("show");
}

function addMemberToProject(id) {
  let token = localStorage.getItem("token");
  let email = $("#email-add-member").val();
  $.ajax({
    url: baseUrl + `/projects/admin/add/${id}`,
    method: "PATCH",
    data: {
      email
    },
    headers: {
      token
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
      $("#modal-add-member").modal("hide");
      $("#email-add-member").val("");
      getInvitation();
      getProject();
    });
}

function kickMember(id) {
  $("#renderModalKickMember").append(`
  <div
    class="modal fade"
    id="modal-kick-member"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            Kick Member
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
        <form>
          <div class="modal-body">
            <div class="form-group">
              <label for="exampleInputAddMember">Email</label>
              <input
                type="email"
                class="form-control"
                id="email-kick-member"
                placeholder="Enter Email"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              onclick="closeKickMember()"
            >
              Close
            </button>
            <button type="submit" id="btn-kick-member" onclick="kickMemberFromProject('${id}')" class="btn btn-primary">
              Kick Member
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `);
  $("#modal-kick-member").modal("show");
}

function kickMemberFromProject(id) {
  console.log(id);
  let token = localStorage.getItem("token");
  let email = $("#email-kick-member").val();
  $.ajax({
    url: baseUrl + `/projects/admin/kick/${id}`,
    method: "PATCH",
    data: {
      email
    },
    headers: {
      token
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
      $("#modal-kick-member").modal("hide");
      $("#email-kick-member").val("");
      getInvitation();
      getProject();
    });
}

function closeAddMember() {
  $("#email-add-member").val("");
  $("#modal-add-member").modal("hide");
}

function closeKickMember() {
  $("#email-kick-member").val("");
  $("#modal-kick-member").modal("hide");
}

function goCreateTodo(id) {
  $("#modal-create-todo-project").modal("show");
  $("#btn-create-todo-project").submit(function(event) {
    event.preventDefault();
    createProjectTodo(id);
  });
}

function createProjectTodo(id) {
  let token = localStorage.getItem("token");
  let name = $("#createTodo-project-name").val();
  let description = $("#createTodo-project-description").val();
  let due = $("#createTodo-project-due").val();
  $.ajax({
    url: baseUrl + `/projects/addTodo/${id}`,
    method: "POST",
    data: {
      name,
      description,
      due
    },
    headers: {
      token
    }
  })
    .done(response => {
      seeProject(id);
      $("#modal-create-todo-project").modal("hide");
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
      $("#createTodo-project-name").val("");
      $("#createTodo-project-description").val("");
      $("#createTodo-project-due").val("");
    });
}

function DeleteProject(id) {
  let token = localStorage.getItem("token");
  $.ajax({
    url: baseUrl + `/projects/${id}`,
    method: "DELETE",
    headers: {
      token
    }
  })
    .done(response => {
      alertify.success(response.message);
      getProject();
      $(".project-content").hide();
      $("#todo-content").show();
    })
    .fail(err => {
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {});
}

function showModalUpdateProjectTodo(idProject, idTodo) {
  let token = localStorage.getItem("token");
  $.ajax({
    url: baseUrl + `/projects/todo/${idProject}/${idTodo}`,
    method: "GET",
    headers: {
      token
    }
  })
    .done(response => {
      $("#renderModalUpdateProjectTodo").append(`
      <div
        class="modal fade"
        id="modal-update-project-todo"
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
                    id="updateTodo-project-name"
                    value="${response.name}"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputTodoDescription">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="updateTodo-project-description"
                    value="${response.description}"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputDueDate">Due Date</label>
                  <input
                    type="date"
                    class="form-control"
                    id="updateTodo-project-due"
                    value="${response.due}"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputDone">Status</label>
                  <div class="radio">
                    <label><input id="updateTodo-project-status-done" type="radio" name="optradio" checked>Done</label>
                  </div>
                  <div class="radio">
                    <label><input id="updateTodo-project-status-undone" type="radio" name="optradio">UnDone</label>
                  </div>
                </div>
                <button type="submit" onclick="updateProjectTodo('${response._id}', '${idProject}')" class="btn btn-primary">
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
      $("#modal-update-project-todo").modal("show");
    });
}

function updateProjectTodo(idTodo, idProject) {
  let token = localStorage.getItem("token");
  let name = $("#updateTodo-project-name").val();
  let description = $("#updateTodo-project-description").val();
  let due = $("#updateTodo-project-due").val();
  let status;
  if ($("#updateTodo-project-status-done").prop("checked")) {
    status = true;
  } else if ($("#updateTodo-project-status-undone").prop("checked")) {
    status = false;
  }
  console.log(status);
  // console.log(idTodo, idProject);
  $.ajax({
    url: baseUrl + `/projects/todo/${idProject}/${idTodo}`,
    method: "PUT",
    data: {
      name,
      description,
      due,
      status
    },
    headers: {
      token
    }
  })
    .done(response => {
      alertify.success(response.message);
      $("#modal-update-project-todo").modal("hide");
      seeProject(idProject);
    })
    .fail(err => {
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {});
}

function unDoneProject(idProject, idTodo) {
  $.ajax({
    url: baseUrl + `/projects/status/${idProject}/${idTodo}`,
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
      seeProject(idProject);
    })
    .fail(err => {
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {});
}

function doneProject(idProject, idTodo) {
  $.ajax({
    url: baseUrl + `/projects/status/${idProject}/${idTodo}`,
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
      seeProject(idProject);
    })
    .fail(err => {
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {});
}

function deleteProjectTodo(idProject, idTodo) {
  $.ajax({
    url: baseUrl + `/projects/${idProject}/${idTodo}`,
    method: "DELETE",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      alertify.success(response.message);
      seeProject(idProject);
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
