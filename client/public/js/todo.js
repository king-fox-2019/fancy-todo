function renderModalCreateTodo() {
  $("#modal-create-todo").modal("show");
}

function createTodo() {
  let name = $("#createTodo-name").val();
  let description = $("#createTodo-description").val();
  let due = $("#createTodo-due").val();
  console.log(name, description, due);
}
