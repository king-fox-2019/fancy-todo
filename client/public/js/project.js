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
      <a class="dropdown-item" onclick="addMember('${response._id}')" href="#"
        >Add Member</a
      >
      <a class="dropdown-item" onclick="kickMember('${response._id}')" href="#"
        >Kick Member</a
      >
      <div class="dropdown-divider"></div>
      <a id="btn-go-create-todo" class="dropdown-item" href="#"
        >Add Todo</a
      >
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
