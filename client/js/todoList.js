function getTodoList() {

    $.ajax({
        method: 'get',
        url: `${baseURL}/todo`,
        headers: {"access_token": localStorage.getItem('token')}
    })
    .done(result => {
        $('#todo-list').empty()
        // name, description, due_date, status          
        result.forEach(todo => {

            const date = formatDate(todo.due_date)

            $('#todo-list').append(`
                <li>
                    <input 
                        type="checkbox" 
                        class="todo-check" 
                        value="${todo._id}" 
                        ${todo.status?"checked":""} > 
                    <label>${todo.name}</label>
                    <a href="" class="editTodo" data-id="${todo._id}"><i class="fa fa-pencil"></i></a>
                    <a href="" class="deleteTodo" data-id="${todo._id}"><i class="fa fa-remove"></i></a>
                    <p>${todo.description}</p>
                    <p>Due Date: ${date}</p>
                </li>
            `)
        });       
    })
    .fail(err => {
        console.log(err)
    })
    
}

function updateTodoStatus (id, status) {
    $.ajax({
        method: 'patch',
        url: `${baseURL}/todo/${id}`,
        data:
        {
            status: status
        },
        headers: {"access_token": localStorage.getItem('token')}
    })
    .done(result => {
        // change li background
    })
    .fail(err => console.log(err))
}