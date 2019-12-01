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
