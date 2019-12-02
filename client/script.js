$(document).ready(e=>{
    $("#emailForm").val(''),
    $('#passwordForm').val('')
   if(localStorage.getItem('token')){
        $('.userIn').show()
        $('.userOut').hide()
        $('.createProject').hide()
        $('.project').hide()
        listMyTodo()
        mytodoChecking()
   } else {
        form()
        $('.userIn').hide()
   }
})

function checkingLogin(){
    if(localStorage.getItem('token')){
        $('.userIn').show()
        $('.userOut').hide()
    } else {
        form()
        $('.userIn').hide()
        $('.userOut').show()
    }
}

function form(){
    $('.loginButton').click(_=>{
        $('.loginform').show('slow')
        $('.registerform').hide('slow')
        $('.signupOn').hide('slow')
    })
    $('.registerButton').click(_=>{
        $('.registerform').show('slow')
        $('.loginform').hide('slow')
        $('.signupOn').show('slow')
    })
}

function mytodoChecking(){
    $('.createMyTodos').click(_=>{
        $('.createdMyTodoPutButton').show('slow')
        $('.updatedMyTodoPutButton').hide('slow')
    })
    $(document).on('click', ".updatedMyTodos", () => {
        $('.createdMyTodoPutButton').hide('slow')
        $('.updatedMyTodoPutButton').show('slow')
    });
}

function checkProject(){
    // e.preventDefault()
    mylistProject()
    $(".cardTodos").empty()
    $('.createProject').show()
    $('.createMyTodos').hide()
    $('.project').show()
    $('.todos').hide()
}

function inviteProject(e,id) {
    e.preventDefault()
    let form = {
        email : $('#emailInvitation').val()
    }
    loading()
    $.ajax({
        url : `http://localhost:3000/project/${id}`,
        method : 'post',
        headers : {
            'token' : localStorage.getItem('token')
        },
        data : form
    })
    .done(response=>{
        loadingClose()
        // console.log(response);
        $('#exampleModalCenter6').modal('hide');
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function cancelInvite(e,id) {
    e.preventDefault()
    loading()
    $.ajax({
        url : `http://localhost:3000/project/cancel/${id}`,
        method : 'get',
        headers : {
            'token' : localStorage.getItem('token')
        },
    })
    .done(response=>{
        console.log(response);
        loadingClose()
        $('.exampleModalLongInvitation').hide()
        checkInvitation(event)
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function acceptInvite(e,id) {
    e.preventDefault()
    loading()
    $.ajax({
        url : `http://localhost:3000/user/${id}/invitation`,
        method : 'get',
        headers : {
            'token' : localStorage.getItem('token')
        },
    })
    .done(response=>{
        loadingClose()
        // console.log(response);
        checkInvitation(event)
        $('#exampleModalLongInvitation').modal('hide');
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function checkInvitation(e) {
    e.preventDefault()
    loading()
    $.ajax({
        url : `http://localhost:3000/user/invitation`,
        method : 'get',
        headers : {
            'token' : localStorage.getItem('token')
        }
    })
    .done(response=>{
        if (response.invitesProject.length == 0) {
            Swal.fire({
                title: 'loading..',
                text: 'no invites',
                imageUrl: 'https://loading.io/mod/spinner/rosary/sample.gif',
                // imageWidth: 400,
                // imageHeight: 200,
                // imageAlt: 'Custom image',
                showConfirmButton: false,
                // showCancelButton: false,
                // confirmButtonText: 'نعم',
                // cancelButtonText: 'لا',
                timer : 3000
            })
        } else {
        loadingClose()
        // console.log(response);
        response.invitesProject.forEach(project=>{
        $('.InvitationProject').append(`
            <div class="modal fade" id="exampleModalLongInvitation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="card text-white mx-auto bg-primary mb-3" style="max-width: 18rem;">
                        <div class="card-header">invitations</div>
                        <div class="card-body">
                          <h5 class="card-title text-center">Project name : ${project.name}</h5>
                            <div class="text-center">
                                <button type="button" class="btn btn-success" onclick="acceptInvite(event,'${project._id}')" > Join </button>
                                <button type="button" class="btn btn-danger" onclick="cancelInvite(event,'${project._id}')" > Delete </button>
                            </div>
                          </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
        `)})
    }})
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function deleteProject(e,id){
    e.preventDefault()
    loading()
    $.ajax({
        url : `http://localhost:3000/project/${id}`,
        method : 'delete',
        headers : {
            'token' : localStorage.getItem('token')
        }
    })
    .done(response=>{
        loadingClose()
        mylistProject()
        $('.navbar-project').empty()
        $('.cardMyTodoProject').empty()
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function updateProject(e,id){
    e.preventDefault()
    loading()
    let form = {
        'name' : $('#projectNameformEdit').val() 
    }
    // console.log($('#projectNameformEdit').val());

    $.ajax({
        url : `http://localhost:3000/project/${id}`,
        method : 'patch',
        headers : {
            'token' : localStorage.getItem('token')
        },
        data : form
    })
    .done(response=>{
        $('.modal-backdrop').remove();
        loadingClose()
        mylistProject()
        $('.navbar-project').empty()
        $('.cardMyTodoProject').empty()
        
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function updateTodoProject(e,id,projectId){
    e.preventDefault()
    const form = {
        title : $(`#titleMyTodoProject${projectId}`).val(),
        description : $(`#descMyTodoProject${projectId}`).val(),
        due_date : $(`#dateMyTodoProject${projectId}`).val(),
    }
    // console.log(form);
    $.ajax({
        url : `http://localhost:3000/project/${id}`,
        method : 'put',
        headers : {
            'token' : localStorage.getItem('token')
        },
        data : form
    })
    .done(response=>{
        // console.log(response);
        $('.modal-backdrop').remove();
        loadingClose()
        goToProject(event, projectId)
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function deleteTodoProject(e,id, projectId){
    e.preventDefault()
    $.ajax({
        url : `http://localhost:3000/todo/${id}`,
        method : 'delete',
        headers : {
            'token' : localStorage.getItem('token')
        }
    })
    .done(response=>{
        loadingClose()
        goToProject(event, projectId)
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function createTodoProject(e,id){
    e.preventDefault()
    const form = {
        title : $('#titleProjectTodo').val(),
        description : $('#descProjectTodo').val(),
        due_date : $('#dateProjectTodo').val(),
    }
    $.ajax({
        url : `http://localhost:3000/todo/${id}`,
        method : 'post',
        data : form,
        headers : {
            'token' : localStorage.getItem('token')
        }
    })
    .done(response=>{
        $('.modal-backdrop').remove();
        // console.log(response);
        loadingClose()
        goToProject(event, id)
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function goToProject(e,id,member){
    $('.navbar-project').empty()
    $(".cardMyTodoProject").empty()
    e.preventDefault()
    $.ajax({
        url : `http://localhost:3000/project/${id}`,
        method : 'get',
        headers : {
            'token' : localStorage.getItem('token')
        }
    })
    .done(({ project, todos })=>{  
        // console.log('==>',project);
        // console.log(todos);
        loadingClose()
        $('.navbar-project').prepend(`
            <div class="row p-3" style="background-color: rgb(238, 238, 238);">
                ${!member ? `<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModalCenter${project._id}"> Edit Project </button>` : '' }
                ${!member ? `<button type="button" class="btn btn-danger ml-3 btn-sm" onclick="deleteProject(event,'${project._id}')"> delete Project </button>` : '' }
                    <div class="ml-auto">
                        <h5> ${project.name} </h5>
                    </div>
                <div class="ml-auto">
                    ${!member ? `<button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#exampleModalCenter6" > Invites </button>` : '' }
                    <button type="button" class="btn btn-sm btn-primary ml-2" data-toggle="modal" data-target="#exampleModalCenter4"> Add Todos </button>
                </div>
            </div>

            <!-- START MODAL -->
            <div class="modal fade" id="exampleModalCenter4" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title ml-auto updatedMyTodoPutButton" id="exampleModalLongTitle">Create Todo</h2>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Title</div>
                                            </div>
                                            <input type="text" class="form-control" id="titleProjectTodo" placeholder="Title">
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <div class="form-group">
                                            <!-- <label for="descriptionMy">Description</label> -->
                                            <textarea class="form-control" name="descriptionMy" id="descProjectTodo" rows="3" placeholder="Description"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">due_date</div>
                                                </div>
                                                <input type="date" class="form-control" id="dateProjectTodo">
                                            </div>
                                        </div>
                                    <div class="container">
                                        <center>
                                            <button type="button"
                                                class="btn btn-primary btn-block createdMyTodoPutButton"
                                                onclick="createTodoProject(event,'${project._id}')" style="color:white;">
                                                Create Todo
                                            </button>
                                        </center>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- START MODAL -->
            <div class="modal fade" id="exampleModalCenter6" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title ml-auto updatedMyTodoPutButton" id="exampleModalLongTitle">Invite Member</h2>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Email</div>
                                            </div>
                                            <input type="text" class="form-control" id="emailInvitation" placeholder="Email">
                                        </div>
                                    </div>
                                    <div class="container">
                                        <center>
                                            <button type="button"
                                                class="btn btn-primary btn-block createdMyTodoPutButton"
                                                onclick="inviteProject(event,'${project._id}')" style="color:white;">
                                                Invite
                                            </button>
                                        </center>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="exampleModalCenter${project._id}" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title ml-auto updatedMyTodoPutButton" id="exampleModalLongTitle">Update Project</h2>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Project Name</div>
                                            </div>
                                            <input type="text" class="form-control" id="projectNameformEdit" placeholder="Name" value="${project.name}">
                                        </div>
                                    </div>
                                    <div class="container">
                                        <center>
                                            <button type="button"
                                                class="btn btn-primary btn-block"
                                                onclick="updateProject(event,'${project._id}')" style="color:white;">
                                                Update Project
                                            </button>
                                        </center>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        `)

        todos.forEach(todo=>{
            let checking = 'on-process'
            if (new Date(todo.due_date) < new Date()) {
                checking = 'failed'
            }
            let updateDate = new Date(todo.due_date).getFullYear()+'-'+('0' + (new Date(todo.due_date).getMonth() + 1)).slice(-2) + '-' + ('0' + new Date(todo.due_date).getDate()).slice(-2)
            $(".cardMyTodoProject").append(`
            <div class="card text-white bg-secondary mb-3 w-75 mx-auto mt-3">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-8">
                                author : ${todo.UserId.name}
                            </div>
                            <div class="col-auto ml-auto">
                                <button type="button" class="btn btn-danger btn-sm" onclick="deleteTodoProject(event,'${todo._id}','${todo.projectId._id}')">Delete</button>
                                <button type="button" class="btn btn-primary btn-sm updatedMyTodos" data-toggle="modal" data-target="#exampleModal${todo._id}">Update</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body text-center">
                        <h3 class="card-title"><u> ${todo.title} </u></h3>
                        <p class="card-text">${todo.description}</p>
                    </div>
                    <div class="card-footer text-center">
                        <button type="button" class="btn btn-light btn-block btn-sm">${ checking }</button>
                    </div>
                </div>

                <div class="modal fade" id="exampleModal${todo._id}" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title ml-auto updatedMyTodoPutButton" id="exampleModalLongTitle">Update Todos</h2>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Title</div>
                                            </div>
                                            <input type="text" class="form-control" id="titleMyTodoProject${todo.projectId._id}" placeholder="Title" value="${todo.title}">
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <div class="form-group">
                                            <!-- <label for="descriptionMy">Description</label> -->
                                            <textarea class="form-control" name="descriptionMy" id="descMyTodoProject${todo.projectId._id}" rows="3" placeholder="Description">${todo.description}</textarea>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">due_date</div>
                                                </div>
                                                <input type="date" class="form-control" value="${updateDate}" id="dateMyTodoProject${todo.projectId._id}">
                                            </div>
                                        </div>
                                    <div class="container">
                                        <center>
                                            <button type="button"
                                                class="btn btn-success btn-block updatedMyTodoPutButton" data-dismiss="modal"
                                                onclick="updateTodoProject(event,'${todo._id}','${todo.projectId._id}')"
                                                style="color:white;">
                                                Update Todo
                                            </button>
                                        </center>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        })
    })
    .fail(({ responseJSON })=>{
        // console.log(responseJSON);
        
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function mylistProjectMember(){
    // $('.cardMyProject').empty()
    $.ajax({
        url : `http://localhost:3000/project/members`,
        method : 'get',
        headers : {
            'token' : localStorage.getItem('token')
        }
    })
    .done(response=>{  
        loadingClose()
        response.forEach(project=>{
            $('.cardMyProject').prepend(`
            <div class="card text-white bg-dark mb-3 mt-3" style="max-width: 18rem;">
            <div class="card-header text-center">${(project.name).toUpperCase()}</div>
                <div class="card-body text-center">
                    <button type="button" class="btn btn-success" onclick="goToProject(event,'${project._id}','member')"> Masuk Forum </button>
                </div>
                <div class="card-footer bg-dark text-center">
                    ${project.members.length + 1} anggota
                </div>
            </div>
            `)
        })
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function mylistProject(){
    $('.cardMyProject').empty()
    $.ajax({
        url : `http://localhost:3000/project/`,
        method : 'get',
        headers : {
            'token' : localStorage.getItem('token')
        }
    })
    .done(response=>{  
        loadingClose()
        // console.log(response);
        response.forEach(project=>{
            $('.cardMyProject').prepend(`
            <div class="card text-white bg-dark mb-3 mt-3" style="max-width: 18rem;">
            <div class="card-header text-center">${(project.name).toUpperCase()}</div>
                <div class="card-body text-center">
                    <button type="button" class="btn btn-success" onclick="goToProject(event,'${project._id}')"> Masuk Forum </button>
                </div>
                <div class="card-footer bg-dark text-center">
                    ${project.members.length + 1} anggota
                </div>
            </div>
            `)
        })
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
        mylistProjectMember()
    })
}

function createProject(e){
    e.preventDefault()
    let form = {
        'name' : $('#projectNameform').val() 
    }
    $.ajax({
        url : `http://localhost:3000/project/`,
        method : 'post',
        data : form,
        headers : {
            'token' : localStorage.getItem('token')
        }
    })
    .done(response=>{  
        loadingClose()
        // console.log(response);
        $('#exampleModalCenter3').modal('hide');
        mylistProject()
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
        $('#projectNameform').val('')
    })
}

function listMyTodoButton(e){
    $('.cardMyProject').empty()
    $('.project').hide()
    $('.todos').show()
    e.preventDefault()
    $('.createProject').hide()
    $('.createMyTodos').show()
    loading()
    $(".cardTodos").empty()
    $.ajax({
        url : `http://localhost:3000/todo`,
        method : 'get',
        headers : {
            'token' : localStorage.getItem('token')
        }
    })
    .done(response=>{
        loadingClose()
        // console.log(response);
        response.todos.forEach(todo=>{
            // console.log(todo);
            if (!todo.projectId) {
            let checking = 'on-process'
            if (new Date(todo.due_date) < new Date()) {
                checking = 'failed'
            }
            let updateDate = new Date(todo.due_date).getFullYear()+'-'+('0' + (new Date(todo.due_date).getMonth() + 1)).slice(-2) + '-' + ('0' + new Date(todo.due_date).getDate()).slice(-2)
            $(".cardTodos").append(`
            <div class="card text-white bg-secondary mb-3 w-75 mx-auto mt-3">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-8">
                                author : ${todo.UserId.name}
                            </div>
                            <div class="col-auto ml-auto">
                                <button type="button" class="btn btn-danger btn-sm" onclick="deleted('${todo._id}')">Delete</button>
                                <button type="button" class="btn btn-primary btn-sm updatedMyTodos" data-toggle="modal" data-target="#exampleModalCenter${todo._id}">Update</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body text-center">
                        <h3 class="card-title"><u> ${todo.title} </u></h3>
                        <p class="card-text">${todo.description}</p>
                    </div>
                    <div class="card-footer text-center">
                        <button type="button" class="btn btn-light btn-block btn-sm">${ checking }</button>
                    </div>
                </div>
                
                <div class="modal fade" id="exampleModalCenter${todo._id}" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title ml-auto updatedMyTodoPutButton" id="exampleModalLongTitle">Update Todos</h2>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Title</div>
                                            </div>
                                            <input type="text" class="form-control" id="titleMyTodo${todo._id}" placeholder="Title" value="${todo.title}">
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <div class="form-group">
                                            <!-- <label for="descriptionMy">Description</label> -->
                                            <textarea class="form-control" name="descriptionMy" id="descMyTodo${todo._id}" rows="3" placeholder="Description">${todo.description}</textarea>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">due_date</div>
                                                </div>
                                                <input type="date" class="form-control" value="${updateDate}" id="dateMyTodo${todo._id}">
                                            </div>
                                        </div>
                                    <div class="container">
                                        <center>
                                            <button type="button"
                                                class="btn btn-primary btn-block updatedMyTodoPutButton" data-dismiss="modal"
                                                onclick="updateMyTodosPut(event,'${todo._id}')" style="color:white;">
                                                Update Todo
                                            </button>
                                        </center>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        }})
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function login(e){
    e.preventDefault();
    const form = {
        email : $("#emailForm").val(),
        password : $('#passwordForm').val()
    }
    loading()
    $.ajax({
        url : `http://localhost:3000/user/signin`,
        method : 'post',
        data : form
    })
    .done(response=>{  
        loadingClose()
        localStorage.setItem('token', response.token)
        $('#exampleModalCenter').modal('hide');
        $('.modal-backdrop').remove();
        $('.userIn').show()
        $('.userOut').hide()
        $('.todos').show()
        $('.createMyTodos').show()
        $('.createProject').hide()
        $('.project').hide()
        checkingLogin()
        listMyTodo()
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
        $("#emailForm").val(''),
        $('#passwordForm').val('')
    })
}

function updateMyTodosPut(e,id){
    e.preventDefault()
    loading()
    const form = {
        title : $(`#titleMyTodo${id}`).val(),
        description : $(`#descMyTodo${id}`).val(),
        due_date : $(`#dateMyTodo${id}`).val(),
    }
    $.ajax({
        url : `http://localhost:3000/todo/${id}`,
        method : 'put',
        headers : {
            'token' : localStorage.getItem('token')
        },
        data : form
    })
    .done(response=>{
        loadingClose()
        listMyTodo()
        $('.modal-backdrop').remove();
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function listMyTodo(){
    loading()
    $(".cardTodos").empty()
    $.ajax({
        url : `http://localhost:3000/todo`,
        method : 'get',
        headers : {
            'token' : localStorage.getItem('token')
        }
    })
    .done(response=>{
        loadingClose()
        // console.log(response);
        response.todos.forEach(todo=>{
            // console.log(todo);
            if (!todo.projectId) {
            let checking = 'on-process'
            if (new Date(todo.due_date) < new Date()) {
                checking = 'failed'
            }
            let updateDate = new Date(todo.due_date).getFullYear()+'-'+('0' + (new Date(todo.due_date).getMonth() + 1)).slice(-2) + '-' + ('0' + new Date(todo.due_date).getDate()).slice(-2)
            $(".cardTodos").append(`
            <div class="card text-white bg-secondary mb-3 w-75 mx-auto mt-3">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-8">
                                author : ${todo.UserId.name}
                            </div>
                            <div class="col-auto ml-auto">
                                <button type="button" class="btn btn-danger btn-sm" onclick="deleted('${todo._id}')">Delete</button>
                                <button type="button" class="btn btn-primary btn-sm updatedMyTodos" data-toggle="modal" data-target="#exampleModalCenter${todo._id}">Update</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body text-center">
                        <h3 class="card-title"><u> ${todo.title} </u></h3>
                        <p class="card-text">${todo.description}</p>
                    </div>
                    <div class="card-footer text-center">
                        <button type="button" class="btn btn-light btn-block btn-sm">${ checking }</button>
                    </div>
                </div>
                
                <div class="modal fade" id="exampleModalCenter${todo._id}" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title ml-auto updatedMyTodoPutButton" id="exampleModalLongTitle">Update Todos</h2>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="col-auto">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Title</div>
                                            </div>
                                            <input type="text" class="form-control" id="titleMyTodo${todo._id}" placeholder="Title" value="${todo.title}">
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <div class="form-group">
                                            <!-- <label for="descriptionMy">Description</label> -->
                                            <textarea class="form-control" name="descriptionMy" id="descMyTodo${todo._id}" rows="3" placeholder="Description">${todo.description}</textarea>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">due_date</div>
                                                </div>
                                                <input type="date" class="form-control" value="${updateDate}" id="dateMyTodo${todo._id}">
                                            </div>
                                        </div>
                                    <div class="container">
                                        <center>
                                            <button type="button"
                                                class="btn btn-primary btn-block updatedMyTodoPutButton" data-dismiss="modal"
                                                onclick="updateMyTodosPut(event,'${todo._id}')" style="color:white;">
                                                Update Todo
                                            </button>
                                        </center>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        }})
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function deleted(id){
    loading()
    $.ajax({
        url : `http://localhost:3000/todo/${id}`,
        method : 'delete',
        headers : {
            'token' : localStorage.getItem('token')
        }
    })
    .done(response=>{
        loadingClose()
        listMyTodo()
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function addMyTodo(e){
    e.preventDefault();
    const form = {
        title : $('#titleMyTodo').val(),
        description : $('#descMyTodo').val(),
        due_date : $('#dateMyTodo').val(),
    }
    loading()
    $.ajax({
        url : `http://localhost:3000/todo`,
        method : 'post',
        data : form,
        headers : {
            'token' : localStorage.getItem('token')
        }
    })
    .done(response=>{
        loadingClose()
        $('#titleMyTodo').val(''),
        $('#descMyTodo').val(''),
        $('#dateMyTodo').val(''),
        listMyTodo()
        // console.log(response);
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
        $('#exampleModalCenter1').modal('hide');
    })
}

function register(e){
    e.preventDefault();
    const form = {
        name : $('#nameForm').val(),
        email : $('#emailForm').val(),
        password : $('#passwordForm').val()
    }
    loading()
    $.ajax({
        url : `http://localhost:3000/user/signup`,
        method : 'post',
        data : form
    })
    .done(response=>{
        loadingClose()
        $("#emailForm").val(''),
        $('#passwordForm').val('')
        // console.log(response);
        $('#exampleModalCenter').modal('show');
        $('.loginform').show('slow')
        $('.registerform').hide('slow')
        $('.signupOn').hide('slow')
    })
    .fail(({ responseJSON })=>{
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(_=>{
    })
}

function onSignIn(googleUser) {
    const { id_token } = googleUser.getAuthResponse();
    loading()
    $.ajax({
        url : `http://localhost:3000/user/signinGoogle`,
        method : 'post',
        data : {id_token}
    })
    .done(response=>{
        localStorage.setItem('token', response.token)
        $('#exampleModalCenter').modal('hide');
        $('.modal-backdrop').remove();
        $('.userIn').show()
        $('.userOut').hide()
        $('.todos').show()
        $('.createMyTodos').show()
        $('.createProject').hide()
        $('.project').hide()
        checkingLogin()
        listMyTodo()
    })
    .fail(({ responseJSON })=>{
        // console.log(responseJSON);
        let allError = ``
        responseJSON.errors.forEach((error,index) => {
            if(index == responseJSON.errors.length -1){
                allError += error
            } else {
                allError += error + ' & '
            }
        });
        errorLoading(allError)
    })
    .always(()=>{
        $("#emailForm").val(''),
        $('#passwordForm').val('')
        loadingClose()
        // swal.close()
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('token')
    checkingLogin()
}

function loading(){
    Swal.fire({
        title: 'loading..',
        // text: '',
        imageUrl: 'https://loading.io/mod/spinner/rosary/sample.gif',
        // imageWidth: 400,
        // imageHeight: 200,
        // imageAlt: 'Custom image',
        showConfirmButton: false,
        // showCancelButton: false,
        // confirmButtonText: 'نعم',
        // cancelButtonText: 'لا',
    })
}

function errorLoading(allError){
    Swal.fire({
        title: 'Error..',
        // toast: true,
        icon: 'error',
        text: allError,
        // imageUrl: 'https://loading.io/mod/spinner/rosary/sample.gif',
        // imageWidth: 400,
        // imageHeight: 200,
        // imageAlt: 'Custom image',
        // showConfirmButton: false,
        // showCancelButton: false,
        confirmButtonText: 'Ok',
        // cancelButtonText: 'لا',
    })
}

function loadingClose(){
    Swal.close()
}

function menuLoad(){
    $('.menuLoad').toggle('slow')
    
}