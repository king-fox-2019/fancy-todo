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
            $("#todos").empty()
            todos.forEach(todo => {
                $("#todos").append(`
			    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 d-flex justify-content-center">
					<div class="box-part text-center border">
                        <i style="color : #FEBD0A" class="fa ${todo.status === "completed" ? "fa-calendar-check" : "fa-calendar-times"} fa-3x mb-4" aria-hidden="true"></i>
						<div class="title">
							<h4>${todo.name}</h4>
						</div>
						<div class="text">
							<span>${todo.description}</span>
                        </div>
                        <div class="text">
							<span>${todo.status}</span>
                        </div>
                        <div class="text">
							<span>${todo.dueDate.slice(0,"yyyy-mm-dd".length).split("-").reverse().join("-")}</span>
                        </div>
                        <div class="row justify-content-center">
                            <button type="button" id="edit-todo-page-${todo._id}" class="mt-4 btn btn-outline-warning mr-1 col-5">Edit</button>
                            <button type="button" id="delete-todo-${todo._id}" class="mt-4 btn btn-outline-warning ml-1 col-5">Delete</button>
                        </div>
                        <button type="button" id="change-status-${todo._id}" class="mt-2 btn-block btn btn-outline-warning">${todo.status === "completed" ? "Uncomplete" : "Complete"}</button>
					 </div>
				</div>
                `)
                $(`#edit-todo-page-${todo._id}`).click(todo,editPage)
                $(`#change-status-${todo._id}`).click(todo,changeStatus)
                $(`#delete-todo-${todo._id}`).click(todo,deleteTodo)
            });
        })
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


function createPage(){
    event.preventDefault()
    $("#create-todo-modal").modal("show")
}

function deleteTodo(e){
    e.preventDefault()
    const todo = e.data
    const id = todo._id
    const headers = {
        access_token : localStorage.getItem("access_token")
    }
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
            getAllTodo()
        })
        .fail((err)=>{
            console.log(err)
        })
        .always()

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
    }
    $.ajax({
        method : "PUT",
        url : `http://localhost:3000/todos/${id}`,
        data,
        headers
    })
        .done((todo) => {
            $("#edit-todo-modal").modal("hide")
            getAllTodo()
        })
        .fail((err) => {
            console.log(err)
        })
        .always()
}

function createTodo(){
    event.preventDefault()
    const data = {
        name : $("#name-todo-create").val(),
        description : $("#description-todo-create").val(),
        dueDate : $("#dueDate-todo-create").val()
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
            $("#create-todo-modal").modal("hide")
            getAllTodo()
            $("#name-todo-create").val("")
            $("#description-todo-create").val("")
            $("#dueDate-todo-create").val("")
        })
        .fail((err)=>{
            console.log(err)
        })
        .always()
}

// function searchPage(){
//     $("#form-search-modal").modal("show")
// }

// function searchTodo(){
//     const todos = []
//     const keys = ["name", "description","status"]
//     keys.forEach(key => {
//         const headers = {
//             access_token : localStorage.getItem("access_token")
//         }
//         const data = {
//             [key] : $("#form-search").val()
//         }
//         $.ajax({
//             method : "GET",
//             url : "http://localhost:3000/todos",
//             headers,
//             data
//         })
//             .done((result)=>{
//                 todos.concat(result)
//             })
//     });
// }