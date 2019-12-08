function showDetail(event,id){
    console.log(id)
    let userId = localStorage.getItem('userId')
    event.preventDefault()
    $.ajax({
        method:"get",
        url:`http://localhost:3000/todo/detail?id=${id}`,
        //data:{id}
    })
    .done(function(result){
        let date = result.dueDate.split("T");
        let dueDate = date[0];
        $('.detailTodo').empty()
        $('.detailTodo').append(`
            <div id="${id}">
            <h3>Detail</h3>
            <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#updateTodoModal">Edit</button>
            <input type="submit" class="btn btn-danger" onclick="deleteTodo(event,\'${id}\')"  value="Delete">
            <h4 style="margin-top: 20px;">${result.name}</h4>
            <p>Description: ${result.description}</p>
            <p>Due Date:&emsp; ${dueDate}</p>
            </div>
        `)
        $('#updateTodoModal').text('')
        $('#updateTodoModal').append(`
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
              <h4 class="modal-title" >Update Todo</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <label for="editTaskName">Task Name</label>
                <input type="email" class="form-control" id="editTaskName" value="${result.name}" placeholder="Input task name">
              </div>
              <div class="form-group">
                <label for="editTaskDescription">Task Description</label>
                <textarea class="form-control" id="editTaskDescription" rows="3">${result.description}</textarea>
              </div>
              <div class="form-group">
                <label for="editTaskStatus">Task Status</label>
                <select id="editTaskStatus">
                    <option value=true>Finished</option>
                    <option value=false>Unfinished</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editTaskDueDate">Due Date</label>
                <input class="form-control" type="date" value="${dueDate}" id="editTaskDueDate">
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onclick="updateTodo('${id}', $('#editTaskName').val(), $('#editTaskDescription').val(), $('#editTaskStatus').val(), $('#editTaskDueDate').val())">Save</button>
          </div>
        </div>
      </div>
        `)
    })
    .fail(err=>{
        console.log(err)
        $('#authorizationError').empty()
        $('#authorizationError').append(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">Something is wrong</div>
        `)
        setTimeout(() => {
            $('#authorizationError').hide()
        }, 1500);
    })
}

{/* <h4>${result.name}</h4>
            <p>Description: ${result.description}</p>
            <p>Due Date:&emsp; ${result.dueDate}</p> */}