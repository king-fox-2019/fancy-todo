function fetchMyTodos() {
    $('#myTodos').empty()
    $.ajax({
        type: 'GET',
        url: `${baseUrl}/todos`,
        headers: {
            token: localStorage.getItem('token')
        },
        cache: false
    })
    .done(function(todos) {

        if (todos) {
            todos.forEach(todo => {

                if (todo.status == 'done') {
                    todo.status = '<i class="fa fa-check" style="font-size:28px"></i>'
                  } else {
                    todo.status = '<i class="fa fa-exclamation-triangle" style="font-size:28px"></i>'
                  }

                $('#myTodos').append(`
                <div class="card text-white bg-info mb-3" style="width: 18rem;">
                <div class="card-header"><h4><i class="fa fa-bell"></i><b> ${todo.title}</b><h4></div>
                <div class="card-body">
                  <p class="card-text">${todo.dueDate ? todo.dueDate.split('T')[0] + ' | ': ''} ${todo.status}</i></p>
                  <p class="card-text">${todo.description}</p>
                  <button onclick="deleteTodo('${todo._id}')" class="btn btn-light"><i class="fa fa-remove"></i></button>
                  <button onclick="doneTodo('${todo._id}')" class="btn btn-light"><i class="fa fa-check"></i></button>
                  <button onclick="handleShowModalEdit('${todo._id}')" class="btn btn-light"><i class="fa fa-edit"></i></button>
                </div>
                </div>




                `)
            })
        } else {
            $('#myTodos').append(`
            <p>No data</p>
            `)
        }
    })
    .fail(function() {
        alert('fail')
    })
    .always(function() {
    })
}

function addTodo() {
    $.ajax({
        type: 'POST',
        url: `${baseUrl}/todos`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title: $('#title').val(),
            description: $('#description').val(),
            dueDate: $('#dueDate').val()
        }
    })
    .done(function(){
        $.toast('succes add todo')
        $('#myTodos').empty()
        $('#myTodosTab').click()
        $('#title').val(''),
        $('#description').val(''),
        $('#dueDate').val('')
    })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })
}

function deleteTodo(id) {
    event.preventDefault()
    $.ajax({
        type: 'DELETE',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(){
        $.toast('succes delete todo')
        $('#myTodos').empty()
        $('#myTodosTab').click()
    })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })
}

function doneTodo(id) {
    $.ajax({
        type: 'PUT',
        url: `${baseUrl}/todos/status/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(){
        $('#myTodos').empty()
        $('#myTodosTab').click()
    })
    .fail(function(){
    })
}

let currentTodoId = 0
function handleShowModalEdit(id) {
    currentTodoId = id
    $.ajax({
        type: 'GET',
        url: `${baseUrl}/todos/${currentTodoId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(todo){
        $('body').append(`
        <button style="display: none" data-toggle="modal" data-target="#modalEdit" id="buttonModalEdit"></button>          
        <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="margin-top:200px">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Todo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <form id="edit">
                <div class="modal-body">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" id="titleEdit" value="${todo.title}">                      
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <input type="text" class="form-control" id="descriptionEdit" value="${todo.description}">                      
                        </div>
                        <div class="form-group">
                            <label>Due Date</label>
                            <input type="date" class="form-control" id="dueDateEdit">
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button onclick="editTodo()" type="submit" class="btn btn-info" data-dismiss="modal">Submit</button>
                <div>
                </form>
            </div>
        </div>
        </div>
        `)
        $('#buttonModalEdit').click()
    })
    .fail(function() {

    })
    .always(function() {
    })
}

function editTodo() {
    $.ajax({
        type: 'PUT',
        url: `${baseUrl}/todos/${currentTodoId}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title: $('#titleEdit').val(),
            description: $('#descriptionEdit').val(),
            dueDate: $('#dueDateEdit').val()
        }
    })
    .done(function(){
        $.toast('succes edit todo')
        $('#myTodos').empty()
        $('#myTodosTab').click()
    })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })
    .always(function(){
        // $('#titleEdit').val(''),
        // $('#descriptionEdit').val(''),
        // $('#dueDateEdit').val('') 
    })
}