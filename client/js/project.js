function fetchMyProject() {
    $('#projectName').empty()
    $.ajax({
        type: 'GET',
        url: `${baseUrl}/projects`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(projects) {
        projects.forEach(project => {
            $('#projectName').append(`
            <button class="ml-3 mt-3" id="${project._id}" onclick="fetchMyTodosProject('${project._id}')">${project.title}</button>
            <br>
            `)
        });
    })
}

function fetchMyTodosProject(projectId) {
    $('#projectDetail').empty()
    $('#projectAction').empty()
    $('#todosProject').empty()
    $.ajax({
        type: 'GET',
        url: `${baseUrl}/projects/todos/${projectId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(todos) {
        console.log(todos)
        $('#todosProject').append(`
        <div class="container mb-5" style="display: flex; justify-content: flex-end;">
        <button onclick="handleShowModalAddTodoProject('${projectId}')" class="btn btn-light"><i class="fa fa-plus">Add</i></button>
        </div>
        <br>
        <div class="row row-cols-1 row-cols-md-4">
        `)

        if (todos) {
            $('#projectDetail').append(`
            <h2>${todos[0].projectId.title}</h2>
            <h4>${todos[0].projectId.description}</h4>
            <br>
            `)
            todos.forEach(todo => {
                if (todo.status == 'done') {
                    todo.status = '<i class="fa fa-check" style="font-size:28px"></i>'
                  } else {
                    todo.status = '<i class="fa fa-exclamation-triangle" style="font-size:28px"></i>'
                  }

                $('#todosProject').append(`
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
        }
        $('#projectAction').append(`
        <button onclick="handleShowModalAddMember('${projectId}')" class="btn btn-light mt-2">Add member</button>
        <button onclick="handleShowFormEditProject('${projectId}')" class="btn btn-light mt-2">Edit Project</button>
        <button onclick="deleteProject('${projectId}')" class="btn btn-light mt-2">Delete Project</button>
        <button onclick="leftProject('${projectId}')" class="btn btn-light mt-2">Left Project</button>
        `)
    })
    .fail(function() {
    })
    .always(function() {
        showMyProjectTodoList()
    })
}

function showCreateProjectForm() {
    $('#signinPage').hide()
    $('#signupPage').hide()
    $('#navbar').show()
    $('#homepage').hide()
    $('#editEverything').append(`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create Project</h5>
        </div>
        <form id="editTodoProjectForm">
        <div class="modal-body">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" id="titleProject" >                      
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <input type="text" class="form-control" id="descriptionProject" >                      
                </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button onclick="createProject()" type="submit" class="btn btn-info" data-dismiss="modal">Submit</button>
        <div>
        </form>
    `)
}

function createProject() {
    $.ajax({
        type: 'POST',
        url: `${baseUrl}/projects/`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title: $('#titleProject').val(),
            description: $('#desriptionProject').val()
        }
    })
    .done(function(){
        $.toast('succes create project')
        $('#myTodosTab').click()
    })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })
    .always(function(){ 
        $('#editEverything').empty()
    })

}

function showProjectInvitation() {
    $('#projectInvitationPage').empty()
    $('#signinPage').hide()
    $('#signupPage').hide()
    $('#navbar').show()
    $('#homepage').hide()
    $.ajax({
        type: 'GET',
        url: `${baseUrl}/projects/member/invitation`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(projects){
        let string =    `
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Project Name</th>
                <th scope="col">Admin</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            `
        projects.forEach(project => {
        string = string + `   <tr>
            <th >${project.title}</th>
            <td >${project.admin.name}</td>
            <td ><button onclick="approveProject('${project._id}')">Approve</button> | <button onclick="declineProject('${project._id}')">Decline</button></td>
            </tr>
            `
        });
        string = string +    `
                </tbody>
                </table>
        `
        $('#projectInvitationPage').append(string)
        })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })
    .always()
}

function approveProject(projectId) {
    $.ajax({
        type: 'PUT',
        url: `${baseUrl}/projects/member/approve/${projectId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(){
        $.toast('you are project member right now!')
        $('#projectInvitationPage').empty()
        showProjectInvitation()
    })
    .fail(function() {
        $.toast('there is something wrong, please try again')
    })
}

function declineProject(projectId) {
    alert('masuk decline')
    $.ajax({
        type: 'PUT',
        url: `${baseUrl}/projects/member/decline/${projectId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(){
        $.toast('succes delete invitation')
        $('#projectInvitationPage').empty()
        showProjectInvitation()
    })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })
}

function handleShowFormEditProject(projectId) {
    $.ajax({
        type: 'GET',
        url: `${baseUrl}/projects/${projectId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(project){
        $('#signinPage').hide()
        $('#signupPage').hide()
        $('#navbar').show()
        $('#homepage').hide()
        $('#editEverything').append(`
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Project</h5>
                </div>
                <form id="editTodoProjectForm">
                <div class="modal-body">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" id="titleEditProject" value="${project.title}">                      
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <input type="text" class="form-control" id="descriptionEditProject" value="${project.description}">                      
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button onclick="editProject('${projectId}')" type="submit" class="btn btn-info" data-dismiss="modal">Submit</button>
                <div>
                </form>
        `)
    })
    .fail(function() {

    })
    .always(function() {
    })
}

function editProject(projectId) {
    $.ajax({
        type: 'PUT',
        url: `${baseUrl}/projects/${projectId}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title: $('#titleEditProject').val(),
            description: $('#descriptionEditProject').val(),
        }
    })
    .done(function(){
        $.toast('succes edit project')
        $('#myTodosTab').click()
    })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })
    .always(function(){ 
        $('#editEverything').empty()
    })
}

// +++++++++++++


function deleteProject(projectId) {
    $.ajax({
        type: 'DELETE',
        url: `${baseUrl}/projects/${projectId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(){
        $.toast('succes delete project')
        $('#myTodos').empty()
        $('#myTodosTab').click()
    })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })   
}

function handleShowModalAddMember(projectId) {
    alert('modal')
    $('body').append(`
    <button style="display: none" data-toggle="modal" data-target="#modalAddMember" id="buttonModalAddMember"></button>          
    <div class="modal fade" id="modalAddMember" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="margin-top:200px">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Member</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <form id="addMember">
            <div class="modal-body">
                    <div class="form-group">
                        <label>Enter Email</label>
                        <input type="email" class="form-control" id="emailMember">                      
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button onclick="addMember('${projectId}')" type="submit" class="btn btn-info" data-dismiss="modal">Submit</button>
            <div>
            </form>
        </div>
    </div>
    </div>
    `)
    $('#buttonModalAddMember').click()
}

function addMember(projectId) {
    $.ajax({
        type: 'PUT',
        url: `${baseUrl}/projects/member/invite/${projectId}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            email: $('#emailMember').val()
        }
    })
    .done(function(){
        $.toast('succes add member')
        $(`#${projectId}`).click()
    })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })   
}

function leftProject(projectId) {
    $.ajax({
        type: 'PUT',
        url: `${baseUrl}/projects/member/left/${projectId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(){
        $.toast('succes left project. Bye bye')
        $('#myTodos').empty()
        $('#myTodosTab').click()
    })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })
}

function handleShowModalAddTodoProject(projectId) {
        $('body').append(`
        <button style="display: none" data-toggle="modal" data-target="#modalAddTodoProject" id="buttonModalAddTodoProject"></button>          
        <div class="modal fade" id="modalAddTodoProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="margin-top:200px">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Todo Project</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <form id="addTodoProject">
                <div class="modal-body">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" id="titleAdd">                      
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <input type="text" class="form-control" id="descriptionAdd">                      
                        </div>
                        <div class="form-group">
                            <label>Due Date</label>
                            <input type="date" class="form-control" id="dueDateAdd">
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button onclick="addTodoProject('${projectId}')" type="submit" class="btn btn-info" data-dismiss="modal">Submit</button>
                <div>
                </form>
            </div>
        </div>
        </div>
        `)
        $('#buttonModalAddTodoProject').click()
}



function addTodoProject(projectId) {
    $.ajax({
        type: 'POST',
        url: `${baseUrl}/projects/todo/${projectId}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title: $('#titleAdd').val(),
            description: $('#descriptionAdd').val(),
            dueDate: $('#dueDateAdd').val()
        }
    })
    .done(function(){
        $.toast('succes add todo')
        $(`#${projectId}`).click()
        $('#titleAdd').val(''),
        $('#descriptionAdd').val(''),
        $('#dueDateAdd').val('')
    })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })
}

function deleteTodoProject(todoId, projectId) {
    event.preventDefault()
    $.ajax({
        type: 'DELETE',
        url: `${baseUrl}/projects/${projectId}/${todoId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(){
        $.toast('succes delete todo')
        $(`#${projectId}`).click()
    })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })
}

function doneTodoProject(todoId, projectId) {
    $.ajax({
        type: 'PUT',
        url: `${baseUrl}/projects/status/${projectId}/${todoId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(){
        $(`#${projectId}`).click()
    })
    .fail(function(){
    })
}

function handleShowFormEditTodoProject(todoId, projectId) {
    $.ajax({
        type: 'GET',
        url: `${baseUrl}/projects/todo/${projectId}/${todoId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(todo){
        $('#signinPage').hide()
        $('#signupPage').hide()
        $('#navbar').show()
        $('#homepage').hide()
        $('#editEverything').append(`
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Todo Project</h5>
                </div>
                <form id="editTodoProjectForm">
                <div class="modal-body">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" id="titleEditTodoProject" value="${todo.title}">                      
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <input type="text" class="form-control" id="descriptionEditTodoProject" value="${todo.description}">                      
                        </div>
                        <div class="form-group">
                            <label>Due Date</label>
                            <input type="date" class="form-control" id="dueDateEditTodoProject">
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button onclick="editTodoProject('${todoId}', '${projectId}')" type="submit" class="btn btn-info" data-dismiss="modal">Submit</button>
                <div>
                </form>
        `)
    })
    .fail(function() {

    })
    .always(function() {
    })
}

function editTodoProject(todoId, projectId) {
    $.ajax({
        type: 'PUT',
        url: `${baseUrl}/projects/${projectId}/${todoId}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title: $('#titleEditTodoProject').val(),
            description: $('#descriptionEditTodoProject').val(),
            dueDate: $('#dueDateEditTodoProject').val()
        }
    })
    .done(function(){
        $.toast('succes edit todo')
        $(`#${projectId}`).click()
    })
    .fail(function(){
        $.toast('there is something wrong, please try again')
    })
    .always(function(){ 
        $('#editEverything').empty()
    })
}