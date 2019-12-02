$(document).ready(function() {
  let token = localStorage.getItem("token");
  if (token) {
    showContent();
  } else {
    $("#home").show();
    $("#content").hide();
    $("#project").hide();
  }
})

const baseURL = "http://localhost:3000";

let count = 0;

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-bottom-left",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "3000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};

function register() {
  let name = $("#register_name").val();
  let email = $("#register_email").val();
  let password = $("#register_password").val();

  $.ajax({
    method: "POST",
    url: `${baseURL}/user/register`,
    data: { name, email, password }
  })
    .done(response => {
      console.log('response =>',response);
      toastr.info("Register successful. Please login to continue!");
    })
    .fail(err => {
      console.log(err)
      let errors = Object.values(err.responseJSON.errors);
      errors.forEach(error => {
        toastr.warning(error.message);
      });
    });
}

function onSignIn(googleUser) {
  consolelog('onSignIn() invoked');
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.

  var id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: `${baseURL}/user/googlesignin`,
    method: "POST",
    data: {
      token: id_token
    }
  })
    .done(response => {
      console.log('response => ',response);
      localStorage.setItem("token", response.token);
      localStorage.setItem("id", response.id);
      localStorage.setItem("name", response.name);
      showContent();
    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR, textStatus);
    });
}

function manualLogin() {
  event.preventDefault();
  console.log('manualLogin() invoked')
  let email = $("#email").val();
  let password = $("#password").val();
  console.log('email => ',email);
  console.log('password => ',password)

  $.ajax({
    method: "POST",
    url: `${baseURL}/user/login`,
    data: { email, password }
  })
    .done(response => {
        console.log('response.token => ',response.token);
        console.log('response.payload => ',response.payload);
      localStorage.setItem("token", response.token);
        console.log("localStorage.token => ", localStorage.token)
      localStorage.setItem("email", response.payload.email);
        console.log("localStorage.email => ", localStorage.email)
      localStorage.setItem("id", response.payload.id);
        console.log("localStorage.id => ", localStorage.id)
      localStorage.setItem("name", response.payload.name);
        console.log("localStorage.name => ", localStorage.name)
      toastr.success("Welcome");
      $("#content").show();
      $("#home").hide();
      showTodo();
      showDashboard();
    })
    .fail(err => {
      toastr.warning(err.responseJSON.message);
    });
}

function logout() {
  console.log('logout() invoked');
  localStorage.clear();
  $("#home").show();
  $("#content").hide();
  $("#project").hide();

  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
}

function showContent() {
  console.log('showContent() invoked')
  $("#home").hide();
  $("#content").show();
  showTodo();
  showDashboard();
}

function fetchUser() {
  $.ajax({
    url: `${baseURL}/user`,
    method: "GET"
  })
    .done(users => {
      console.log('users => ', users);
      let userData = {};
      users.forEach(user => {
        userData[user.email] = null;
      });
      $("input.autocomplete").autocomplete({
        data: userData
      });
      console.log(users);
    })
    .fail(err => {
      console.log(err);
    });
}

function showTodo() {
  console.log('showTodo() invoked')
  $("#list").html("");
  $.ajax({
    method: "GET",
    url: `${baseURL}/todos`,
    headers: {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("id")
    }
  })
    .then(response => {
      $("#content").show();
      $("#project").hide();
      response.forEach(todo => {
        console.log('todo => ', todo)
        let todoStatus = null;
        let status = null;
        if(todo.status == "completed"){
          todoStatus = "checked='checked'"
          status = 'completed'
        } else {
          todoStatus = ""
          status = 'incomplete'
        }

        $("#list").append(`
              <tr>
                <td>${todo.title}</td>
                <td>${todo.description}</td>
                <td>${new Date(`${todo.createdAt}`).toUTCString()}</td>
                <td>${new Date(`${todo.dueDate}`).toUTCString()}</td>
                <td>
                  <label>
                    <input type="checkbox" ${todoStatus} onclick="editTodo('${
          todo._id
        }', '${todo.status}')"/>
                    <span>${status}</span>
                  </label>
                </td>
                <td>
                  <a href="" class="btn-small modal-trigger tooltipped" data-position="bottom" data-tooltip="Edit ToDo" data-target="modal3" onclick="editModals('${ todo._id }')"><i class="material-icons">edit</i></a></li>
                  <a href="" class="btn-small tooltipped" data-position="bottom" data-tooltip="Delete ToDo" onclick="deleteTodo('${ todo._id }')"><i class="material-icons">delete_forever</i></a></li> <br>
                </td>
              </tr>
            `);
      });
    })
    .catch(err => {
      console.log(err);
    });
}

function editModals(id) {
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: `${baseURL}/todos/${id}`,
    headers: {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("id")
    }
  })
    .then(response => {
      $("#editTodo").html(
        `
        <form class="col s12">
            <div class="row">
                <div class="input-field col s12">
                <input placeholder="" id="edit_title" value="${
                  response.title
                }" type="text" />
                <label for="edit_title"></label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                <textarea id="edit_description" value="${
                  response.description
                }" class="materialize-textarea">${
          response.description
        }</textarea>
                <label for="edit_description"></label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                  <input type="text" value="${new Date(
                    `${response.createdAt}`
                  ).toUTCString()}" id="edit_dueDate" class="datepicker">
                </div>
                <div class="input-field col s6">
                  <input type="text" value="${
                    response.dueTime
                  }" id="edit_dueTime" class="timepicker">
                </div>
            </div>
        </div>
        </div> 
            <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat"
            onclick="event.preventDefault(); return editTodo('${id}')"
                >Edit</a
            >
            <a href="#!" class="modal-close waves-effect waves-green btn-flat"
            onclick="event.preventDefault(); return cancel('modal2)"
                >Cancel</a
            >
            </div>
        </form>
      `
      );
      $(".datepicker").datepicker();
      $(".timepicker").timepicker();
      editTitle = $("#edit_title").val();
    })
    .catch(err => {
      console.log(err);
    });
}

function editTodo(id, status) {
  console.log('editTodo() invoked')
  event.preventDefault();
  let value = null;
  if (status) {
    if (status == "completed") {
      value = "incomplete";
    } else {
      value = "completed";
    }
    $.ajax({
      method: "PUT",
      url: `${baseURL}/todos/${id}`,
      data: {
        status: value
      },
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(response => {
        console.log(response);
        showTodo();
        toastr.success("update success");
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    $.ajax({
      method: "PUT",
      url: `${baseURL}/todos/${id}`,
      data: {
        title: $("#edit_title").val(),
        description: $("#edit_description").val(),
        dueDate: $("#edit_dueDate").val(),
        dueTime: $("#edit_dueTime").val()
      },
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(response => {
        console.log('response ', response);
        showTodo();
        toastr.success("update success");
      })
      .catch(err => {
        console.log(err);
      });
  }
}

function addTodo() {
  console.log('addTodo() invoked')
  let id = localStorage.getItem("id");
  let todoStatus = null;

  let date = $("#dueDate").val()
  console.log('date => ',date)

  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
  }
  
  let newTime = convertTime12to24( $("#dueTime").val())
  let formatedTime = new Date(`${date} ${newTime}`)
  
  $.ajax({
    method: "POST",
    url: `${baseURL}/todos`,
    data: {
      title: $("#title").val(),
      description: $("#description").val(),
      dueDate: formatedTime,
      userId: id
    },
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .then(response => {
      console.log(response);
      response.status == "completed"
        ? (todoStatus = "checked='checked'")
        : (todoStatus = "");

      toastr.success("new task has been added to your list!");
      $("#list").append(`
        <tr>
          <td><b>${response.title}</b>
            <br> <br>
            <a href=""><i class="material-icons">edit</i></a></li>
            <a href=""><i class="material-icons">delete</i></a></li> <br>
            edit | delete
          </td>
          <td>${response.description}</td>
          <td>${new Date(response.createdAt).toUTCString()}</td>
          <td>${new Date(response.dueDate).toUTCString()}</td>
          <td>
            <label>
              <input type="checkbox" class="filled-in" ${todoStatus} onclick=editTodo('${
        response._id
      }')/>
              <span>incomplete</span>
            </label>
          </td>
        </tr>
      `);
    })
    .catch(err => {
      console.log(err);

      if (err.responseJSON.errors.dueDate) {
        swal("Oops", err.responseJSON.errors.dueDate.message, "warning");
      }
      console.log(err);
    });
}

function deleteTodo(id) {
  console.log('deleteTodo() invoked');
  event.preventDefault();

  $.ajax({
    method: "DELETE",
    url: `${baseURL}/todos/${id}`,
    headers: {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("id")
    }
  })
    .then(response => {
      console.log('response => ',response)
      showTodo();
      toastr.success("delete success");
    })
    .catch(err => {
      console.log(err);
    });
}

function showDashboard() {
  console.log('showDashBoard() invoked')
  $("#project").hide();
  $("#dashboard").html(`
    <iframe scrolling="no" frameborder="no" clocktype="html5" style="overflow:hidden;border:0;margin:0;padding:0;width:120px;height:40px;"src="https://www.clocklink.com/html5embed.php?clock=043&timezone=GMT0700&color=black&size=120&Title=&Message=&Target=&From=2019,1,1,0,0,0&Color=black"></iframe>
    <h6>Hello, ${localStorage.getItem("name")} ...</h6>
    <br>
    <a class="waves-effect waves-light btn" onclick="showproject()" style="margin-bottom: 10px; width: 150px">See Project</a>
    <a class="waves-effect waves-light btn modal-trigger" data-target="pendingMember" onclick="showPendingProjectModal()" style="width: 150px">Invitation</a>
  `);
}

function cancel(name) {
  $(`#${name}`).closeModal();
}

function showproject() {
  console.log('showproject() invoked');
  $("#content").hide();
  $("#projectDashboard").html(
    `
    <iframe scrolling="no" frameborder="no" clocktype="html5" style="overflow:hidden;border:0;margin:0;padding:0;width:120px;height:40px;"src="https://www.clocklink.com/html5embed.php?clock=043&timezone=GMT0700&color=black&size=120&Title=&Message=&Target=&From=2019,1,1,0,0,0&Color=black"></iframe>
    <h6>Hello, ${localStorage.getItem("name")}</h6>
    <br>
    `
  );
  showProject();
  $("#project").show();
}

function addProject() {
  console.log('addProject() invoked')
  $.ajax({
    url: `${baseURL}/projects`,
    method: "POST",
    data: { name: $("#project_name").val() },
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .then(response => {
      console.log('response => ', response)
      showProject();
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
}

function showProject() {
  $.ajax({
    url: `${baseURL}/projects`,
    method: "GET",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      let data;
      console.log('response => ',response);
      response.forEach((project, idx) => {
        data += `<tr><td class="center-align"><h2>${idx + 1}</h2></td>
               <td class="center-align">${project.name}
               </td><td>`;
        project.members.forEach((member, idx) => {
          if (idx == 0) {
            data += `${member.name} (Owner) <br>`;
          } else {
            data += `${member.name} <br>`;
          }
        });
        data += `<br><br>
        <a class="btn-small grey darken-2 modal-trigger" data-target="modalInviteMember" onclick="addProjectsMember('${
          project._id
        }')" style="width: 150px">Invite Member</a></td>
               <td class="center-align">`;
        project.todoList.forEach((todo, idx) => {
          data += `<b style="font-size:14px">${
            todo.title
          }</b> <a href="" class="modal-trigger" data-target="modal3" onclick="editModals('${ todo._id }')"><i class="material-icons tiny">edit_mode</i></a><br> <small>assigned to: ${
            todo.userId.name
          }</small><br><br>`;
        });
        data += ` <a class="btn-small grey darken-2 modal-trigger" data-target="modalTodoProject" onclick="addProjectsTodoModal('${
          project._id
        }')" style="width: 150px">add task</a></td>`;
        if (localStorage.getItem("id") == project.members[0]._id) {
          data += `
            <td class="center-align">
            <div class="col s6">
            <a class="btn-small modal-trigger tooltipped" data-position="bottom" data-tooltip="Edit Project" data-target="editProject" style="width: 48.8px; height: 32.4px " onclick="editProjectModal('${
              project._id
            }')" ><i class="material-icons">edit_mode</i></a>
            </div>
            <div class="col s6">
            <a class="btn-small red lighten-2 tooltipped" data-position="bottom" data-tooltip="Delete Project" onclick="deleteProject('${
              project._id
            }')"><i class="material-icons">delete_forever</i></a> 
            </div>
            </td>
            `;
        } else {
          data += `<td class="center-align">Read Only ...</td>`;
        }
      });

      data += `</tr>`;
      $("#projectTable").html(data);
      $(".tooltipped").tooltip();
    })
    .fail(err => {
      console.log(err);
    });
}

function editProjectModal(id) {
  console.log('editProjectModal() invoked')
  event.preventDefault();

  $.ajax({
    url: `${baseURL}/projects/${id}`,
    method: "GET",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .then(response => {
      console.log('response => ',response);

      $("#editProject").html(`
      <div class="modal-content">
            <h4>Edit Project</h4>
            <div class="row">
              <form class="col s12">
                  <div class="row">
                      <div class="input-field col s12">
                        <input id="edit_project_name" value="${
                          response.name
                        }" type="text" />
                        <label for="project"></label>
                      </div>
                  </div>
            </div>
          </div>
          <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat"
          onclick="event.preventDefault(); return editProject('${id}')"
              >Edit</a
          >
          <a href="#!" class="modal-close waves-effect waves-green btn-flat"
          onclick="event.preventDefault(); return cancel('editProject')"
              >Cancel</a
          >
          </div>
      </form>
      `);
    })
    .catch(err => {
      console.log(err);
    });
}

function editProject(id) {
  $.ajax({
    url: `${baseURL}/projects/${id}`,
    method: "PUT",
    data: { name: $("#edit_project_name").val() },
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .then(response => {
      showProject();
      console.log('response => ',response);
    })
    .catch(err => {
      console.log(err);
    });
}

function addProjectsMember(id) {
  fetchUser();

  $("#modalInviteMember").html(
    `
    <div class="modal-content">
    <h4>Invite Member</h4>
    <div class="row">
      <form class="col s12">
      <div class="row">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">textsms</i>
              <input type="text" id="autocomplete-input-member" class="autocomplete">
              <label for="autocomplete-input">Email Member</label>
            </div>
          </div>
        </div>
    </div>
    </div>
        <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"
        onclick="event.preventDefault(); return inviteMember('${id}')"
            >Submit</a
        >
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"
        onclick="event.preventDefault(); return cancel('modalInviteMember')"
            >Cancel</a
        >
        </div>
      </form>
    </div>
    `
  );
}

function inviteMember(id) {
  console.log('inviteMember() invoked');
  let email = $("#autocomplete-input-member").val();

  $.ajax({
    url: `${baseURL}/projects/invite/${id}`,
    method: "PUT",
    data: { email },
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .then(response => {
      showProject();
      console.log('response => ',response);
    })
    .catch(err => {
      console.log(err);
    });
}

function addProjectsTodoModal(id) {
  fetchUser();

  $("#modalTodoProject").html(`
  <div class="modal-content">
      <h4>New Todo Project</h4>
      <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s12">
                <input placeholder="" id="todoProjectTitle" type="text" />
                <label for="title">Title</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                <textarea id="todoProjectDescription" class="materialize-textarea"></textarea>
                <label for="description">Description</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                  <input type="text" placeholder="Due Date" id="todoProjectDueDate" class="datepicker">
                </div>
                <div class="input-field col s6">
                  <input type="text" placeholder="Due Time" id="todoProjectDueTime" class="timepicker">
                </div>
            </div>
            <div class="row">
            <div class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">textsms</i>
                  <input type="text" id="autocomplete-input" class="autocomplete">
                  <label for="autocomplete-input">Assign To</label>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
            <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat"
            onclick="event.preventDefault(); return addProjectsTodo('${id}')"
                >Submit</a
            >
            <a href="#!" class="modal-close waves-effect waves-green btn-flat"
            onclick="event.preventDefault(); return cancel('modalTodoProject')"
                >Cancel</a
            >
            </div>
        </form>
  `);
  $(".datepicker").datepicker();
  $(".timepicker").timepicker();
}

function addProjectsTodo(id) {
  let obj = {
    title: $("#todoProjectTitle").val(),
    description: $("#todoProjectDescription").val(),
    dueDate: $("#todoProjectDueDate").val(),
    dueTime: $("#todoProjectDueTime").val(),
    email: $("#autocomplete-input").val(),
    projectId: id
  };

  $.ajax({
    url: `${baseURL}/projects/addTodo/${id}`,
    method: "PUT",
    data: obj,
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .then(response => {
      showProject();
      console.log(response);
    })
    .catch(err => {
      console.log(err);

      if (err.responseJSON.errors.dueDate) {
        swal("Oops!", err.responseJSON.errors.dueDate.message, "warning");
      } else {
        swal("Oops!", err.responseJSON.msg, "warning");
      }
    });
}

function showPendingProjectModal() {
  event.preventDefault();

  $.ajax({
    url: `${baseURL}/projects/pending`,
    method: "GET",
    headers: {
      token: localStorage.getItem("token"),
      id : localStorage.getItem("id")
    }
  })
    .then(response => {
      let data = `  
        <div id="invitation-modal" class="modal-content">
          <h4>Project Invitation</h4>
          <div class="row">
              <div class="row">
                  <div class="input-field col s12">`;
      if (response.length == 0) {
        data += `<h6> There is no invitation ... </h6>`;
      } else {
        response.forEach(project => {
          data += ` <h5>${project.name}</h5>
                      <a class="btn-small modal-close" onclick="joinProject('${
                        project._id
                      }')">Accept</a>
                      <a class="btn-small modal-close" onclick="declineProject('${
                        project._id
                      }')">Decline</a>
                                <hr>`;
        });
      }
      data += `</div>
                </div>
                </div>
              </div>
              `;
      $("#pendingMember").html(data);
    })
    .catch(err => {
      console.log(err);
    });
}

function joinProject(id) {
  $.ajax({
    url: `${baseURL}/projects/join/${id}`,
    method: "PUT",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .then(response => {
      showProject();
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
}

function declineProject(id) {
  $.ajax({
    url: `${baseURL}/projects/decline/${id}`,
    method: "PUT",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .then(response => {
      showProject();
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
}

function deleteProject(id) {
  console.log('deleteProject() invoked')
  event.preventDefault();
  $.ajax({
    url: `${baseURL}/projects/${id}`,
    method: "DELETE",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .then(response => {
      showProject();
      console.log('response => ',response);
    })
    .catch(err => {
      console.log(err);
    });
}