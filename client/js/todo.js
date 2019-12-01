
function getAllTodo(){
    const headers = {
        access_token : localStorage.getItem("access_token")
    }
    $.ajax({
        method : "GET",
        url : "http://localhost:3000/todos",
        headers
    })
        .done((todos)=>{
            todos.forEach(todo => {
                $("#todos").append(`
                <div class="card" style="width: 18rem;">
                    <img src="https://miro.medium.com/max/1024/1*Er24qsvJdqLofK-sK0QzpA.jpeg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${todo.name}</h5>
                        <p class="card-text">Description : ${todo.description}</p>
                        <p class="card-text">Status : ${todo.status}</p>
                        <p class="card-text">Due Date : ${todo.dueDate}</p>
                        <button type="button" id="edit-todo-page-${todo._id}" class="btn btn-primary">Edit</button>
                        <button type="button" id="change-status-${todo._id}" class="btn btn-primary">${todo.status === "completed" ? "Uncomplete" : "Complete"}</button>
                        <button type="button" id="delete-todo-${todo._id}" class="btn btn-primary">Delete</button>
                    </div>
                </div>
                `)
                $(`#edit-todo-page-${todo._id}`).click(todo,editPage)
                $(`#change-status-${todo._id}`).click(todo,changeStatus)
                $(`#delete-todo-${todo._id}`).click(todo,deleteTodo)
            });
        })
}

function deleteTodo(e){
    e.preventDefault()
    const todo = e.data
    const id = todo._id
    const headers = {
        access_token : localStorage.getItem("access_token")
    }
    console.log('insecure di client')
    $.ajax({
        method : "DELETE",
        url : `http://localhost:3000/todos/${id}`,
        headers
    })
        .done((result)=>{
            console.log(result)
        })
        .fail((err)=>{
            console.log(err)
        })
        .always()
}

function changeStatus(e){
    e.preventDefault()
    const todo = e.data
    const status = todo.status === "completed" ? "uncompleted" : "completed"
    const headers = {
        access_token : localStorage.getItem("access_token")
    }
    const id = todo._id
    const data = {
        status,
    }
    $.ajax({
        method : "PUT",
        url : `http://localhost:3000/todos/${id}`,
        data,
        headers
    })
        .done((todo)=>{
            // console.log(todo)
        })
        .fail((err)=>{
            // console.log(err)
        })
        .always()

}

function editPage(e){
    e.preventDefault()
    const todo = e.data
    $("#name-todo-edit").val(todo.name)
    $("#description-todo-edit").val(todo.description)
    $("#dueDate-todo-edit").val(todo.dueDate.slice(0,("yyyy-mm-dd").length))
    $("#id-todo-edit").val(todo._id)
    $("#edit-todo-modal").modal("show")
}

function editTodo(){
    const headers = {
        access_token : localStorage.getItem("access_token")
    }
    const id = $("#id-todo-edit").val()
    const data = {
        name : $("#name-todo-edit").val(),
        description : $("#description-todo-edit").val(),
        dueDate : $("#dueDate-todo-edit").val(),
        // UserId :  
    }
    $.ajax({
        method : "PUT",
        url : `http://localhost:3000/todos/${id}`,
        data,
        headers
    })
        .done((todo) => {
            console.log(todo)
        })
        .fail((err) => {
            console.log(err)
        })
        .always()
}

function createTodo(){
    event.preventDefault()
    const data = {
        name : $("#name-todo").val(),
        description : $("#description-todo").val(),
        dueDate : $("#dueDate-todo").val()
    }
    const headers = {
        access_token : localStorage.getItem("access_token")
    }
    $.ajax({
        method : "POST",
        url : "http://localhost:3000/todos",
        data,
        headers
    })
        .done((todo) => {
            $("#result").append(`
            <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${todo.name}</h5>
                    <p class="card-text">Description : ${todo.description}</p>
                    <p class="card-text">Status : ${todo.status}</p>
                    <p class="card-text">Due Date : ${todo.dueDate}</p>
                    <a href="" class="btn btn-primary">Edit</a>
                    <a href="" class="btn btn-primary">Delete</a>
                </div>
            </div>
            `)
        })
        .fail((err)=>{
            console.log(err)
        })
        .always()
}