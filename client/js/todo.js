function fetchTodos() {
  $.ajax({
    method: "get",
    url: `${baseUrl}/todo`,
    headers: { access_token: localStorage.getItem('access_token') }
  }).done(todosArr => {
    console.log(todosArr)
    showTodos(todosArr);
  }).fail(err => {
    console.log(err)
  })
}

function showTodos(todos) {
  for (let todo of todos) {
    $("#tes").append(
      `<p>
        Name: ${todo.name}, Desc: ${todo.description}, Status: ${todo.status}, Due Date: ${todo.due_date}
      </p>`
    );
  }
}

// ----------------------------

function showTodo(e) {
  if (e) e.preventDefault();
  $("li").data("id")
}