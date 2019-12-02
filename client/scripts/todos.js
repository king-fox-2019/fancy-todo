$( document ).ready(function() {
    $('#add-todo-form').on('submit', function(event) {
        event.preventDefault();
        // let groupId = $('input[name=project]').val();
        let projectId = localStorage.getItem('project')
        $.ajax({
            type: 'POST',
            url: `${BASE_URL}/projects/${projectId}/todos`,
            data: $(this).serialize(),
            headers: {
                authorization: localStorage.getItem('jwt_token')
            }
        })
        .done( data => {
            showSuccessMessage('Todo created successfully!')
            let date = new Date(data.dueDate)
            let displayedDate = date.toDateString();
            let id = data._id;
            let description = data.description || 'No Description';
            let dueDate = displayedDate || 'No Due Date';
            let isDone = (data.status == true) ? 'checked' : '';

            $('#all-todos').prepend(`
                <tr class="list-box">
                    <th scope="row">
                        <input type="checkbox" name="status" value="${data.status}" ${isDone} onclick="checkThis('${id}', '${data.status}')">
                    </th>
                    <td onclick="editTodo('${id}')" data-toggle="modal" data-target="#editTodoModal"> ${data.name}</td>
                    <td onclick="editTodo('${id}')" data-toggle="modal" data-target="#editTodoModal">${description}</td>
                    <td onclick="editTodo('${id}')" data-toggle="modal" data-target="#editTodoModal">${dueDate}</td>
                    <td onclick="editTodo('${id}')" data-toggle="modal" data-target="#editTodoModal">${data.user.name}</td>
                    <td class="delete-todo" onclick="deleteTodo('${id}')">DELETE</td>
                    <td>Add To Calendar</td>
                </tr>
            `)
        })
        .fail( err => {
            console.log(err);
        })
    })

    $( "#inputDate" ).datepicker({
        minDate: '0d'
    }); 

    $('#edit-todo-form').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            type: 'PUT',
            url: `${BASE_URL}/todos/${todoId}`,
            data: $(this).serialize(),
            headers: {
                authorization: localStorage.getItem('jwt_token')
            }
        })
        .done( data => {
            ajaxShowTodos(data.project);
        })
        .fail( err => {
            showErrorMessage(err.responseText);
        })
    })
});

function checkThis(id, status){
    $.ajax({
        type: 'PATCH',
        url: `${BASE_URL}/todos/${id}`,
        headers: {
			authorization: localStorage.getItem('jwt_token')
        },
        data: {status}
    })
        .done( data => {
        })
        .fail( err => {
            console.log(err)
        })
}

function deleteTodo(id){
    $.ajax({
        type: 'DELETE',
        url: `${BASE_URL}/todos/${id}`,
        headers: {
			authorization: localStorage.getItem('jwt_token')
		}
    })
    .done( data => {
        $("#all-todos").empty();
        ajaxShowTodos(data.project);
    })
    .fail( err => {
        showErrorMessage(err.responseText);
    })
}

function editTodo(id) {
    $.ajax({
        type: 'GET',
        url: `${BASE_URL}/todos/${id}`,
        headers: {
			authorization: localStorage.getItem('jwt_token')
		}
    })
        .done(data => {
            $('#editTodoName').attr("value", `${data.name}`);
            $('#editTodoDescription').attr("value", `${data.description}`);
            $( "#editDate" ).datepicker({
                minDate: '0d'
            }); 
            let date = new Date(data.dueDate)
            $( "#editDate" ).datepicker("setDate", date)
            todoId = data._id;
        })
        .fail( err => {
            showErrorMessage(err.responseText);
        })
}
