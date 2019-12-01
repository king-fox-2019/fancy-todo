function updateTodo(id,name,description,status,dueDate){
    $.ajax({
        method:"put",
        url:"http://localhost:3000/todo",
        data:{
            id,name,description,status,dueDate
        }
    })
    .done(result=>{
        $('#updateTodoModal').modal('hide')
        location.reload()
    })
    .fail(err=>{
        console.log(err)
    })
}