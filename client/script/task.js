function getAllTask(id){
    $.ajax({
        url: `http://localhost:3000/project/task/${id}`,
        method: 'GET',
        headers:{
            access_token: localStorage.getItem('token')
        }
    })
    .done(tasks => {
        $('.project-detail').empty()
        if(tasks.length === 0){
            $('.project-detail').append(`
            <div class="d-flex justify-content-between">
                <span class="content-title">Your Task List</span>
                <span id="add-task" data-toggle="modal" data-target="#exampleModalCenter2"><i class="fas fa-plus-circle"></i></span>
            </div>
            <div>
                <p style="font-size: 24px">It seems you dont have any task yet<span style="font-size: 24px; color: green"><i class="fas fa-frown ml-2"></i></span></p>
                <p>Create task and let's collaboration with others</p>
            </div>
            `)
        }else{
            $('.project-detail').append(`
            <div class="d-flex justify-content-between">
                <span class="content-title">Your Task List</span>
                <span id="add-task" data-toggle="modal" data-target="#exampleModalCenter2"><i class="fas fa-plus-circle"></i></span>
            </div>
            <div id="task-card" class="w-100 d-flex flex-wrap">
            </div>
            `)
            $('#task-card').empty()
            tasks.forEach(task => {
                $('#task-card').append(`
                <div class="card mr-3 mt-3" style="width: 18rem;">
                <div class="card-body ${task.status}" id="${task._id}">
                    <h5 class="card-title">${task.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Due : ${moment(task.dueDate).format('LL')}</h6>
                    <p class="card-text">${task.desc}</p>
                    <p class="text-muted">${moment(task.createdAt).startOf('minutes').fromNow()}</p>
                    <div class="d-flex justify-content-between">
                        <div>
                            <a href="#" class="card-link" onclick="deleteTask('${task._id}')"><i class="fas fa-trash-alt"></i></a>
                            <a href="#" class="card-link" data-toggle="modal" data-target="#editTodo" onclick="getOneTask('${task._id}')"><i class="far fa-edit"></i></a>
                        </div>
                        <div>
                            <button class="btn btn-outline-success" onclick="doneTask('${task._id}')">Done</button>
                        </div>
                    </div>
                </div>
              </div>
                `)
            });
        }
        $('#task-submit').empty()
        $('#task-submit').append(`
        <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close" onclick="createTask('${id}')">Create</button>
        `)
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Fetching Task',
            text: 'Fethcing Task Error'
        })
    })
}

function createTask(id){
    let title = $('#task-title').val()
    let desc = $('#task-desc').val()
    let duedate = $('#task-duedate').val()
    $.ajax({
        url: `http://localhost:3000/project/task/${id}`,
        method: 'POST',
        data:{
            title,desc,duedate
        },
        headers:{
            access_token: localStorage.getItem('token')
        }
    })
    .done(result => {
        Toast.fire({
            icon: 'success',
            title: 'Create Task',
            text: 'Create Task Success!'
        })
        $('#task-title').val('')
        $('#task-desc').val('')
        $('#task-duedate').val('')
        getDetailProject(id)
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Create Task',
            text: `${err.responseJSON.message}`
        })
    })
}

function doneTask(id){
    $.ajax({
        url: `http://localhost:3000/project/task/${id}`,
        method: 'PUT',
        headers:{
            access_token: localStorage.getItem('token')
        }
    })
    .done(result => {
        Toast.fire({
            icon: 'success',
            title: 'Update Status',
            text: 'Update Status Success!'
        })
        getDetailProject(result.projectId)
    }) 
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Update Status',
            text: `${err.responseJSON.message}`
        })
    })
}

function deleteTask(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: `http://localhost:3000/project/task/${id}`,
            method: 'DELETE',
            headers:{
                access_token: localStorage.getItem('token')
            }
        })
        .done(result => {
            Toast.fire({
                icon: 'success',
                title: 'Delete Task',
                text: 'Delete Task Success!'
            })
            getDetailProject(result.projectId)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Delete Task',
                text: `${err.responseJSON.message}`
            })
        })
        }
      })
}

function getOneTask(id){
    $.ajax({
        url: `http://localhost:3000/project/task/${id}/detail`,
        method: 'GET',
        headers:{
            access_token: localStorage.getItem('token')
        }
    })
    .done(data => {
        $('.project-detail').empty()
        $('.project-detail').append(`
        <div class="container-fluid w-50">
          <form method="submit" id="edit-task">
            <h1 class="content-title mb-3">Edit Task</h1>
            <div class="form-group">
              <label for="todo-title">Title</label>
              <input type="text" class="form-control" id="edit-task-title" aria-describedby="title" placeholder="Enter title" value="${data.title}">
            </div>
            <div class="form-group">
              <label for="todo-desc">Description</label>
              <textarea class="form-control" id="edit-task-desc" placeholder="Description here">${data.desc}</textarea>
            </div>
            <button type="button" class="btn btn-primary" onclick="editTask('${data._id}')">Submit Edit</button>
            <button type="button" class="btn btn-danger" onclick="getDetailProject('${data.projectId}')">Cancel</button>
          </form>
        </div>
        `)
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Show Task',
            text: `${err.responseJSON.message}`
        })
    })
}

function editTask(id){
    let title = $('#edit-task-title').val()
    let desc = $('#edit-task-title').val()
    $.ajax({
        url: `http://localhost:3000/project/task/${id}`,
        method: 'PATCH',
        data: {
            title,desc
        },
        headers:{
            access_token: localStorage.getItem('token')
        }
    })
    .done(result => {
        Toast.fire({
            icon: 'success',
            title: 'Update Task',
            text: 'Update Task Success'
        })
        getDetailProject(result.projectId)
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Update Task',
            text: `${err.responseJSON.message}`
        })
    })
}