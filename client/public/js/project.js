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
