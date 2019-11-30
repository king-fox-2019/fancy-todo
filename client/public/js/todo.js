function renderModalCreateTodo() {
  $("#modal-create-todo").modal("show");
  $("#btn-create-todo").click(function(event) {
    event.preventDefault();
    createTodo();
  });
}

function createTodo() {
  let name = $("#createTodo-name").val();
  let description = $("#createTodo-description").val();
  let due = $("#createTodo-due").val();
  console.log(name, description, due);
}
