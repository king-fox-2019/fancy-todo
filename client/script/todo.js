function createTodo(){
    let title = $('#todo-title').val()
    let desc = $('#todo-desc').val()
    let duedate = $('#todo-duedate').val()
    let token = localStorage.getItem('token')
    $.ajax({
      url: 'http://localhost:3000/todo',
      method: 'POST',
      data: {
        title,desc,duedate
      },
      headers:{ 
        access_token: token
      }
    })
    .done(data => {
      getUserTodo()
      $('#todo-title').val('')
      $('#todo-desc').val('')
      $('#todo-duedate').val('')
      Toast.fire({
        icon: 'success',
        title: 'Created',
        text: 'Create Todo Success!'
      })
    })
    .fail(err => {
      let message = ''
      if(err.responseJSON.message.length > 1){
        for(let msg in err.responseJSON.message){
          message += err.responseJSON.message[msg]
        }
      }else{
        message = err.responseJSON.message[0]
      }
      Swal.fire({
        icon: 'error',
        title: 'Create Error',
        text: `${message}`
      })
    })
  }
  
  function getUserTodo(){
    let token = localStorage.getItem('token')
    $.ajax({
      url: 'http://localhost:3000/todo/mytodo',
      method: 'GET',
      headers:{
        access_token: token
      }
    })
    .done(data => {
      if(data.length === 0){
        $('.card-content').empty()
        $('.card-content').append(`
          <div class="d-flex flex-column empty-todo">
            <p style="font-size: 24px">It seems you dont have any Todo yet !<span style="font-size: 24px; color: green"><i class="fas fa-frown ml-2"></i></span></p>
            <p>Let's create some todo!</p>
          </div>
        `)
      }else{
        $('.card-content').empty()
      data.forEach(todo => {
        $('.card-content').append(`
        <div class="card mr-3 mt-3" style="width: 18rem;">
          <div class="card-body ${todo.status}" id="${todo._id}">
              <h5 class="card-title">${todo.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Due : ${moment(todo.dueDate).format('LL')}</h6>
              <p class="card-text">${todo.desc}</p>
              <p class="text-muted">${moment(todo.createdAt).startOf('minutes').fromNow()}</p>
              <div class="d-flex justify-content-between">
                  <div>
                      <a href="#" class="card-link" onclick="deleteTodo('${todo._id}')"><i class="fas fa-trash-alt"></i></a>
                      <a href="#" class="card-link" data-toggle="modal" data-target="#editTodo" onclick="getOneTodo('${todo._id}')"><i class="far fa-edit"></i></a>
                  </div>
                  <div>
                      <button class="btn btn-outline-success" onclick="doneTodo('${todo._id}')">Done</button>
                  </div>
              </div>
          </div>
        </div>
        `)
        })
      }
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Fetching Data',
        text: 'Error'
      })
    })
  }
  
  function deleteTodo(id){
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
          url: `http://localhost:3000/todo/${id}`,
          method: 'DELETE',
          headers:{
            access_token: localStorage.getItem('token')
          }
        })
        .done(data => {
          getUserTodo()
          Toast.fire({
            icon: 'success',
            title: 'Delete Todo',
            text: 'Delete Success!'
          })
        })
        .fail(err => {
          Swal.fire({
            icon: 'error',
            title: 'Delete Todo',
            text: 'Delete Todo!'
          })
        })
      }
    })
  }
  
  function doneTodo(id){
    $.ajax({
      url: `http://localhost:3000/todo/${id}`,
      method: 'PUT',
      headers:{
        access_token: localStorage.getItem('token')
      }
    })
    .done(data => {
      getUserTodo()
      Toast.fire({
        icon: 'success',
        title: 'Task Done',
        text: 'Success!'
      })
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Update Status',
        text: `${err.responseJSON.message}`
      })
    })
  }
  
  function editTodo(id){
    let title = $('#edit-title').val()
    let desc = $('#edit-desc').val()
    $.ajax({
      url: `http://localhost:3000/todo/edit/${id}`,
      method: 'PUT',
      data:{
        title,desc
      },
      headers:{
        access_token: localStorage.getItem('token')
      }
    })
    .done(data => {
      getUserTodo()
      Toast.fire({
        icon: 'success',
        title: 'Update Content',
        text: `${data.message}`
      })
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Update Content',
        text: `${err.responseJSON.message}`
      })
    })
  }
  
  function getOneTodo(id){
    $.ajax({
      url: `http://localhost:3000/todo/${id}`,
      method: 'GET',
      headers:{
        access_token: localStorage.getItem('token')
      }
    })
    .done(data => {
      $('.card-content').empty()
      $('.card-content').append(`
      <div class="container-fluid w-50">
        <form method="submit" id="edit-todo">
          <h1 class="content-title mb-3">Edit Todo</h1>
          <div class="form-group">
            <label for="todo-title">Title</label>
            <input type="text" class="form-control" id="edit-title" aria-describedby="title" placeholder="Enter title" value="${data.title}">
          </div>
          <div class="form-group">
            <label for="todo-desc">Description</label>
            <textarea class="form-control" id="edit-desc" placeholder="Description here">${data.desc}</textarea>
          </div>
          <button type="button" class="btn btn-primary" onclick="editTodo('${data._id}')">Submit Edit</button>
          <button type="button" class="btn btn-danger" onclick="getUserTodo()">Cancel</button>
        </form>
      </div>
      `)
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Show Todo',
        text: `${err.responseJSON.message}`
      })
    })
  }