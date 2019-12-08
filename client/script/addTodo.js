function addTodo(){
    let userId = localStorage.getItem('userId')
    let userEmail = localStorage.getItem('userEmail')
    $.ajax({
        method: "post",
        url: "http://localhost:3000/todo",
        data: {
          name: $("#formTaskName").val(),
          description: $("#formTaskDescription").val(),
          dueDate: $("#formTaskDueDate").val(),
          userId,
          userEmail
        }
      }).done(result => {
        $("#addTodoModal").modal('hide');
        location.reload()
      })
      .fail(error =>{
        console.log(error)
      })
}