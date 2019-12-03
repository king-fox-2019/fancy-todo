const baseUri = 'http://localhost:3000'

$(document).ready(function(){
    
    if(localStorage.getItem('token')){
        $('#signout-button').show()
        $('#full-page-intro').hide()
        $('#sidebar-wrapper').show()
        $('#wrapper').show()
        $('#page-content-wrapper-personal').show()
        
        generateTodo('personal')
        generateUserProfile()
    }else{
        $('#wrapper').hide()
    }
})

function register(name,email,password){
    $.ajax({
        method: 'post',
        url: `${baseUri}/users/register`,
        data: { 
            name : name,
            email : email,
            password : password
        }
    })
    .done((data) => {
        localStorage.setItem('token',data.accessToken)
        $('#signout-button').show()
        $('#full-page-intro').hide()
        $('#sidebar-wrapper').show()
        $('#wrapper').show()
        $('#page-content-wrapper-personal').show()
        
        generateTodo('personal')
        generateUserProfile()
        swal(`Hello ${name}!`, "Now you're logged-in", "success");
    })
    .fail(err => {
        console.log(err)
    })
}

function login(email,password){
    console.log(email,password,'<=============')
    $.ajax({
        method: 'post',
        url: `${baseUri}/users/login`,
        data: {
            email: email,
            password: password
        }
    })
    .done((data) => {
        localStorage.setItem('token',data.accessToken)
        $('#signout-button').show()
        $('#full-page-intro').hide()
        $('#sidebar-wrapper').show()
        $('#wrapper').show()
        $('#page-content-wrapper-personal').show()
        
        generateTodo('personal')
        generateUserProfile()

        console.log(data.accessToken)
        swal(`Welcome back!`, "Now you're logged-in", "success");
    })
    .fail(err => {
        console.log(err)
        swal(`Oops!`, "wrong email/password", "error");
    }) 
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    const token = localStorage.getItem('token')

    if(!token){
        $.ajax({
            method: 'post',
            url: `${baseUri}/users/loginGoogle`,
            data : {
                id_token
            }
        })
        .done((data) => {
            localStorage.setItem('token',data.accessToken)
            $('#signout-button').show()
            $('#full-page-intro').hide()
            $('#sidebar-wrapper').show()
            $('#wrapper').show()
            $('#page-content-wrapper-personal').show()
            
            generateTodo('personal')
            generateUserProfile()
            swal(`Welcome back!`, "Now you're logged-in", "success");
        
        })
        .fail(err => {
            console.log(err)
            swal(`Oops!`, "wrong email/password", "error");
        }) 
    }
  }

function signOut(){
    // e.preventDefault()

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    
    $('#signout-button').hide()
    $('#full-page-intro').show()
    $('#wrapper').hide()
    $('.sidebar-profile').empty()
    $('#page-content-wrapper-personal').hide()
    $('#page-content-wrapper-project').hide()
    $('#page-content-wrapper-project-todo').hide()
    localStorage.removeItem('token')
}

$('#updateStatus').on("click",function(event){
    event.preventDefault()
    console.log('clicked')
    $('#todolist').empty()
    $('.project-todos').empty()
    $('.header-project').empty()
    $('#wrapper').show()
    // generateTodo('')
})

function updateStatus(id,page){
    // console.log(id)
    $.ajax({
        method:'patch',
        url: `${baseUri}/todos/${id}/status`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(()=>{
        $('#todolist').empty()
        $('.project-todos').empty()
        $('.header-project').empty()
        $('#wrapper').show()
        generateTodo(page)
        
        // console.log('successfully updated')
    })
    .fail((err)=>{
        console.log(err)
    })
}

function updateStatusTodoProject(id,projectId,title){
    console.log(id,projectId,title)
    $.ajax({
        method:'patch',
        url: `${baseUri}/todos/${id}/status`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(()=>{


        $('#todolist').empty()
        $('.project-todos').empty()
        $('#wrapper').show()
        generateProjectTodo(projectId,title)
        generateTodo()
        console.log('successfully updated',projectId)
    })
    .fail((err)=>{
        console.log(err)
    })
}

function deleteTodo(id,projectId,page){
    // console.log(`ready to delete ${id}`)
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("delete successfully deleted", {
            icon: "success",
          });
          $.ajax({
                method:'delete',
                url: `${baseUri}/todos/${id}`,
                headers: {
                    token : localStorage.getItem('token')
                }
            })
            .done(()=>{
                $('#todolist').empty()
                $('.project-todos').empty()
                $('#wrapper').show()
                generateTodo(page)
                // generateProjectTodo(projectId,title)
                console.log('successfully deleted')
            })
            .fail((err)=>{
                console.log(err)
            })
        } else {
          swal("delete cancelled");
        }
      });
}

function deleteTodoProject(id,projectId,title){
    console.log(`ready to delete project todo ${id},${projectId},${title}`)
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("delete successfully deleted", {
            icon: "success",
          });
          $.ajax({
                method:'delete',
                url: `${baseUri}/todos/${id}`,
                headers: {
                    token : localStorage.getItem('token')
                }
            })
            .done(()=>{
                $('#todolist').empty()
                $('#wrapper').show()
                generateTodo()
                generateProjectTodo(projectId,title)
                console.log('successfully deleted')
            })
            .fail((err)=>{
                console.log(err)
            })
        } else {
          swal("delete cancelled");
        }
      });
}

function toogleUpdate(id,page){
    
    $.ajax({
        method: 'get',
        url: `${baseUri}/todos/${id}`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done((todo)=>{
        console.log(todo.date.slice(10))
        $('#modalUpdateForm').modal('show')
        let todoId = $("#todo-id").val(id)
        let editTitle = $("#edit-title-todo").val(todo.title)
        let editTodo = $("#edit-date-todo").val(todo.date)
        let where = $('#page-now').val(page)
        
    })
    .fail((err)=>{
        console.log(err)
    })
}

function toogleUpdateProjectTodo(id,todoTitle,projectId,projectTitle,projectDescription,projectMembers){
    console.log(projectTitle,projectDescription,projectMembers,'---')
    $('#member-group-todo-project').empty()
    $.ajax({
        method: 'get',
        url: `${baseUri}/todos/${id}`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done((todo)=>{
        // console.log(todo.projectId.members,'<====== from project id')
        let options = ''
        for(let i = 0 ; i < todo.projectId.members.length; i++ ){
            options += `<option>${ todo.projectId.members[i].name}</option>`
        }
        let html = ''
        html += `
        <label for="inputState">Assignee</label>
        <select id="edit-assignee-todo" class="form-control">
          <option selected>Choose...</option>
         ${options}
        </select>`

        $('#member-group-todo-project').append(html)
        $('#modalUpdateForm').modal('show')
        $("#todo-project-id").val(id)
        $("#todo-project-id-value").val(projectId)
        $("#edit-title-todo-project").val(todo.title)
        $("#project-title").val(projectTitle)
        $("#project-description").val(projectDescription)
        $("#project-members").val(projectMembers)
    })
    .fail((err)=>{
        console.log(err)
    })
}

function toogleAddTodoProject(id){
    console.log(id)
    $('#project-members-append').empty()
    
    $.ajax({
        method: 'get',
        url: `${baseUri}/projects/${id}`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done((project)=>{
        console.log(project.members,'<====== from project id')
        let options = ''
        for(let i = 0 ; i < project.members.length; i++ ){
            options += `<option>${ project.members[i].email}</option>`
        }
        console.log(options)
        let html = ''
        html += `
        <label for="inputState">Assignee</label>
        <select id="add-assignee-todo" class="form-control">
          <option selected>Choose...</option>
         ${options}
        </select>`

        $('#project-members-append').append(html)
        $("#project-id").val(id)
        $('#addTodoProject').modal('show')
    })
    .fail((err)=>{
        console.log(err)
    })
}

function toogleEditProject(id,title,description,members){
    $.ajax({
        method: 'get',
        url: `${baseUri}/projects/${id}`,
        headers: {
            token : localStorage.getItem('token')
        },
    })
    .done((project) => {
        let memberInput = []
        for(let i = 0 ; i < project.members.length; i++){
            memberInput.push(project.members[i].email)
        }
        
        $('#edit-project-title').val(title)
        $('#edit-project-description').val(description)
        $('#edit-projectId').val(id)
        // $('#form-member').val(`"${memberInput.toString()}"`)
        $('#form-member').attr('value','irene@mail.com')
        // $('#form-member').val('irene@mail.com')
        $('#template-member').val('dwitama.alfred@gmail.com')
        $('#modalEditProjectForm').modal('show')
    })
    .fail((err) => {
        console.log(err)
    })

}

function nameGetter(){
    console.log($('#edit-project-members').val())
    return $('#edit-project-members').val()
}




function updateTodo(id,title,date,page){
    $.ajax({
        method: 'put',
        url: `${baseUri}/todos/${id}`,
        headers: {
            token : localStorage.getItem('token')
        },
        data : {
            title : title,
            date : date,
            assignee : null
        }
    })
    .done(()=>{
        $('#todolist').empty()
        $('.project-todos').empty()
        $('#wrapper').show()
        generateTodo(page)
        // generateProjectTodo(id,title)
        swal(`Successfully updated!`, "let see your new data", "success");
        console.log('successfully updated')
    })
    .fail((err)=>{
        console.log(err.response)
        swal(`Oops!`, "Please input correct format", "error");
    })
}

function updateTodoProject(id,title,date,assignee,projectId,projectTitle,projectDescription,projectMembers){
    $.ajax({
        method: 'put',
        url: `${baseUri}/todos/${id}`,
        headers: {
            token : localStorage.getItem('token')
        },
        data : {
            title : title,
            date : date,
            assignee : assignee
        }
    })
    .done((project)=>{
        // console.log(project,'---------------')
        $('#todolist').empty()
        $('.project-todos').empty()
        $('#wrapper').show()
        generateTodo()
        generateProjectTodo(projectId,projectTitle,projectDescription,projectMembers)
        console.log('successfully updated')
        swal(`Successfully updated!`, "let see your new data", "success");
    // })
    })
    .fail((err)=>{
        console.log(err)
        swal(`Oops!`, "Please input correct format", "error");
    })
}

function addTodo(title,date){
    $.ajax({
        method: 'post',
        url: `${baseUri}/todos/`,
        headers: {
            token : localStorage.getItem('token')
        },
        data : {
            title : title,
            date : date
        }
    })
    .done(()=>{
        $('#todolist').empty()
        $('#wrapper').show()
        generateTodo('personal')
        swal(`Successfully added!`, "let see your new data", "success");
        console.log('successfully added')
    })
    .fail(function(xhr, status, error){
        swal(`Oops!`, "Please input correct format", "error");
        console.log(error)
        console.log(status)
        console.log(xhr.responseText)
    })
}

    // ----------------------------------------//

function generateUserProfile(){
    $('#todolist').empty()
    $.ajax({
        method:'get',
        url: `${baseUri}/users/profile`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done((user) => {  
        let html = ''
        html += `
            <a href="#" style="display:flex;flex-direction:row;align-items:center">
                <div id="members" style="width: 50px;height: 50px; margin: 5px; background-size: cover; background-position: top center;border-radius: 50%; background-image: url('${user.profilePicture}');"> 
                </div>
                <div>${user.name}</div>
            </a>
                `
    $(`.sidebar-profile`).prepend(html)
    }) 
    .fail(err => {
        console.log(err)
    })
}

function generateTodo(page){
    console.log(page)
    $('#todolist').empty()
        $.ajax({
            method:'get',
            url: `${baseUri}/todos/${page}`,
            headers: {
                token : localStorage.getItem('token')
            }
        })
        .done((todos) => {
            
            for(i = 0 ; i < todos.length; i++){                
    
                if(todos[i].status === false && todos[i].starred === false ){
                    let html = ''
                    html += `
                            <div class="promoting-card" style="background: linear-gradient(148deg, rgba(56,56,56,1) 0%, rgba(47,47,47,1) 100%);">
                                <div class="card-body d-flex flex-row" style="padding-bottom:0px;display:flex;justify-content: space-between;">
                                    <div class="todo-header-part" style="display: flex;">
                                        <div class="todo-star-area" id="todo-starred">
                                            <a href="#">
                                            <i class="fas fa-star" onclick="updateStarred('${todos[i]._id}','${page}')" id='todo-star-part' style="font-size:50px; margin-right:20px; opacity: 0.3;color: #000000;"></i>
                                            </a>
                                        </div>
                                        <div class="task-title">
                                        <h3 class="card-title font-weight-bold mb-2" style="color: white;" >${todos[i].title}</h3>
                                        <p class="card-text" style="color: white;font-size:18px"><i class="far fa-clock pr-2"></i>${todos[i].date.slice(0,10)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <a style="background: transparent; border: none; " onclick="deleteTodo('${todos[i]._id}','${todos[i].projectId}','${page}')">
                                        <i class="fas fa-times" id="edit-button" style="font-size:40px;color:white;"></i>
                                        </a>
                                    </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="bottom" style="display:flex; justify-content: space-between;align-items: center;">
                                            <div class="bottom-right">
                                            <button type="button"  id="updateStatusButton" onclick="updateStatus('${todos[i]._id}','${page}')"  class="btn btn-outline-light">done</button>
                                            <button type="button" data-toggle="modal" data-target="#editTodo" onclick="toogleUpdate('${todos[i]._id}','${page}')" class="btn btn-outline-light">edit</button>
                                            </div>
                                            <div class="bottom-left">
                                            <div class="assignee${i}" style="display:flex; flex-direction:row">
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            `
                $(`#todolist`).prepend(html)
                if(todos[i].projectId){
                    for(let j = 0 ; j < todos[i].projectId.members.length; j++){
                        console.log(todos[i].projectId.members[j].profilePicture)
                        let members = ''
                        members += `<div id="members" style="width: 50px;height: 50px; margin: 5px; background-size: cover; background-position: top center;border-radius: 50%; background-image: url('${todos[i].projectId.members[j].profilePicture}');"></div>`
                        $(`.assignee${i}`).prepend(members)
                    }
                }
            }else if(todos[i].status === false && todos[i].starred === true ){
                let html = ''
                html += `
                        <div class="promoting-card" style="background: linear-gradient(148deg, rgba(56,56,56,1) 0%, rgba(47,47,47,1) 100%);">
                            <div class="card-body d-flex flex-row" style="padding-bottom:0px;display:flex;justify-content: space-between;">
                                <div class="todo-header-part" style="display: flex;">
                                    <div class="todo-star-area" id="todo-starred">
                                        <a href="#">
                                        <i class="fas fa-star" onclick="updateStarred('${todos[i]._id}','${page}')" id='todo-star-part' style="font-size:50px; margin-right:20px;color: #d7c15c;"></i>
                                        </a>
                                    </div>
                                    <div class="task-title">
                                    <h3 class="card-title font-weight-bold mb-2" style="color: white;" >${todos[i].title}</h3>
                                    <p class="card-text" style="color: white;font-size:18px"><i class="far fa-clock pr-2"></i>${todos[i].date.slice(0,10)}</p>
                                    </div>
                                </div>
                                <div>
                                    <a style="background: transparent; border: none; " onclick="deleteTodo('${todos[i]._id}','${todos[i].projectId}','${page}')">
                                    <i class="fas fa-times" id="edit-button" style="font-size:40px;color:white;"></i>
                                    </a>
                                </div>
                                </div>
                                <div class="card-body">
                                    <div class="bottom" style="display:flex; justify-content: space-between;align-items: center;">
                                        <div class="bottom-right">
                                        <button type="button"  id="updateStatusButton" onclick="updateStatus('${todos[i]._id}','${page}')"  class="btn btn-outline-light">done</button>
                                        <button type="button" data-toggle="modal" data-target="#editTodo" onclick="toogleUpdate('${todos[i]._id}','${page}')" class="btn btn-outline-light">edit</button>
                                        </div>
                                        <div class="bottom-left">
                                        <div class="assignee${i}" style="display:flex; flex-direction:row">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        `
            $(`#todolist`).prepend(html)
                if(todos[i].projectId){
                    for(let j = 0 ; j < todos[i].projectId.members.length; j++){
                        console.log(todos[i].projectId.members[j].profilePicture)
                        let members = ''
                        members += `<div id="members" style="width: 50px;height: 50px; margin: 5px; background-size: cover; background-position: top center;border-radius: 50%; background-image: url('${todos[i].projectId.members[j].profilePicture}');"></div>`
                        $(`.assignee${i}`).prepend(members)
                    }
                }
            }else if(todos[i].status === true && todos[i].starred === false ){
                let html = ''
                html += `
                        <div class="promoting-card" style="background: linear-gradient(90deg, rgba(100,171,56,1) 0%, rgba(194,215,28,1) 100%);">
                            <div class="card-body d-flex flex-row" style="padding-bottom:0px;display:flex;justify-content: space-between;">
                                <div class="todo-header-part" style="display: flex;">
                                    <a href="#" >
                                    <i class="fas fa-star" onclick="updateStarred('${todos[i]._id}','${page}')" id='todo-star-part' style="font-size:50px; margin-right:20px; opacity: 0.3;color: #000000;"></i>
                                    </a>
                                    <div class="task-title">
                                    <h3 class="card-title font-weight-bold mb-2" style="color: white;" >${todos[i].title}</h3>
                                    <p class="card-text" style="color: white;font-size:18px"><i class="far fa-clock pr-2"></i>${todos[i].date.slice(0,10)}</p>
                                    </div>
                                </div>
                                <div>
                                    <a style="background: transparent; border: none;" onclick="deleteTodo('${todos[i]._id}','${todos[i].projectId}','${page}')">
                                    <i class="fas fa-times" id="edit-button" style="font-size:40px;color:white"></i>
                                    </a>
                                </div>
                                </div>
                                <div class="card-body">
                                    <div class="bottom" style="display:flex; justify-content: space-between;align-items: center;">
                                        <div class="bottom-right">
                                        <button type="button" id="updateStatus" onclick="updateStatus('${todos[i]._id}','${page}')" class="btn btn-outline-light">on going</button>
                                        <button type="button" data-toggle="modal" data-target="#editTodo" onclick="toogleUpdate('${todos[i]._id}','${page}')" class="btn btn-outline-light">edit</button>
                                        </div>
                                        <div class="bottom-left">
                                        <div class="assignee${i}" style="display:flex; flex-direction:row">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        `
            $(`#todolist`).prepend(html)
                if(todos[i].projectId){
                    for(let j = 0 ; j < todos[i].projectId.members.length; j++){
                        console.log(todos[i].projectId.members[j].profilePicture)
                        let members = ''
                        members += `<div id="members" style="width: 50px;height: 50px; margin: 5px; background-size: cover; background-position: top center;border-radius: 50%; background-image: url('${todos[i].projectId.members[j].profilePicture}');"></div>`
                        $(`.assignee${i}`).prepend(members)
                    }
                }
            }else{
                let html = ''
                html += `
                            <div class="promoting-card" style="background: linear-gradient(90deg, rgba(100,171,56,1) 0%, rgba(194,215,28,1) 100%);">
                                <div class="card-body d-flex flex-row" style="padding-bottom:0px;display:flex;justify-content: space-between;">
                                    <div class="todo-header-part" style="display: flex;">
                                        <a href="#" >
                                        <i class="fas fa-star" onclick="updateStarred('${todos[i]._id}','${page}')" id='todo-star-part' style="font-size:50px; margin-right:20px;color: #d7c15c;"></i>
                                        </a>
                                        <div class="task-title">
                                        <h3 class="card-title font-weight-bold mb-2" style="color: white;" >${todos[i].title}</h3>
                                        <p class="card-text" style="color: white;font-size:18px"><i class="far fa-clock pr-2"></i>${todos[i].date.slice(0,10)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <a style="background: transparent; border: none;" onclick="deleteTodo('${todos[i]._id}','${todos[i].projectId}','${page}')">
                                        <i class="fas fa-times" id="edit-button" style="font-size:40px;color:white"></i>
                                        </a>
                                    </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="bottom" style="display:flex; justify-content: space-between;align-items: center;">
                                            <div class="bottom-right">
                                            <button type="button" id="updateStatus" onclick="updateStatus('${todos[i]._id}','${page}')" class="btn btn-outline-light">on going</button>
                                            <button type="button" data-toggle="modal" data-target="#editTodo" onclick="toogleUpdate('${todos[i]._id}','${page}')" class="btn btn-outline-light">edit</button>
                                            </div>
                                            <div class="bottom-left">
                                            <div class="assignee${i}" style="display:flex; flex-direction:row">
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                `
                $(`#todolist`).prepend(html)
                    if(todos[i].projectId){
                        for(let j = 0 ; j < todos[i].projectId.members.length; j++){
                            console.log(todos[i].projectId.members[j].profilePicture)
                            let members = ''
                            members += `<div id="members" style="width: 50px;height: 50px; margin: 5px; background-size: cover; background-position: top center;border-radius: 50%; background-image: url('${todos[i].projectId.members[j].profilePicture}');"></div>`
                            $(`.assignee${i}`).prepend(members)
                        }
                    }
                }
            }
        })
}


function generateProject(){
    
    console.log('triggred')
    $.ajax({
        method:'get',
        url: `${baseUri}/projects/`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done((project) => {
        
        
        for(i = 0 ; i < project.length; i++){
            let membersProject = []
            for(let j = 0 ; j < project[i].members.length; j++){
                // console.log(project[i].members[j])
                membersProject.push(project[i].members[j].name)
            }

            let background = [
                'linear-gradient(90deg, rgba(17,120,134,0.85) 0%, rgba(58,195,93,0.85) 100%)',
                'linear-gradient(148deg, rgba(100,48,152,0.85) 0%, rgba(209,114,166,0.85) 100%)',
                'linear-gradient(148deg, rgba(50,194,162,0.85) 0%, rgba(91,122,209,0.85) 100%)',
                'linear-gradient(128deg, rgba(190,61,61,0.85) 28%, rgba(185,73,138,0.85) 100%);',
                'linear-gradient(148deg, rgba(112,177,52,0.85) 0%, rgba(91,122,209,0.85) 100%);'
                ]

            let backgroundImage = [
                'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1520694478166-daaaaec95b69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            ]
            let randomizer = Math.floor(Math.random() * Math.floor(5))
            
            let html = ''
            html += `
                <div class="promoting-card-group" style="background: linear-gradient(90deg, rgba(255,118,79,1) 0%, rgba(255,154,101,1) 100%); background-image: url(${backgroundImage[randomizer]});background-size:cover;background-position:center">
                    <div class="card-group-body d-flex flex-row h-100 mask" style="padding-bottom:-20px;display:flex;flex-direction:column;background: ${background[randomizer]};">
                        <div class="first-content align-self-center p-3" style="width:100%">
                            <div class="card-body d-flex flex-row" style="padding-top:0px;margin-bottom:-10px;display:flex;justify-content: space-between;">
                                <div class="task-title">
                                <h2 class="card-title font-weight-bold mb-2" style="color: white;" >${project[i].title}</h2>
                               
                                </div>
                                <div>
                                    
                                    <a style="background: transparent; border: none;" onclick="deleteProject('${project[i]._id}')">
                                    <i class="fas fa-times" id="delete-button" style="font-size:40px;color:white;"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="bottom justify-content-between" style="display:flex;align-items: center;padding-left:20px">
                            <div class="bottom-right">
                            <button type="button" onclick="generateProjectTodo('${project[i]._id}','${project[i].title}','${project[i].description}','${membersProject.toString()}'),generateProjectHeader('${project[i]._id}','${project[i].title}','${project[i].description}','${membersProject.toString()}')" class="btn btn-outline-light">detail</button>
                            <button type="button" onclick="leaveGroup('${project[i]._id}')" class="btn btn-outline-light">leave group</button>     
                            </div> 
                            <div class="project-members${i}" style="margin-left:10px;margin-top:10px;display: flex;">
                            </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            `
            $('.project-page').prepend(html)
            
            for(let j = 0 ; j < project[i].members.length; j++){
                let members = ''
                members += `<div id="members" style="width: 50px;height: 50px; margin: 5px; background-size: cover; background-position: top center;border-radius: 50%; background-image: url('${project[i].members[j].profilePicture}');"></div>`
                $(`.project-members${i}`).prepend(members)
            }
        }
    })
}

function generateProjectHeader(id,title,description,members){
    $(".header-project").empty()
    $(".header-project").empty()
    // $('.project-page').empty()
        $(".header-project").prepend(`
        <h1 style="font-weight: 100;">${title} </h1>
        <hr style="color: white;
            background-color: white;
            height: 0.5px;
        <p style="margin-top:10px"> description :</p> 
        <p style="margin-top:-10px;font-style:italic"> ${description}</p> 
        <p style="margin-top:10px"> members :</p>
        <p style="margin-top:-10px;font-style:italic"> ${members}</p>
        <button type="button" style="margin-bottom:30px;" onclick="toogleEditProject('${id}','${title}','${description}','${members}')" class="btn btn-outline-light">Edit Project</button>
        <button type="button" style="margin-bottom:30px;" data-toggle="modal" data-target="modalAddTodoProjectForm" onclick="toogleAddTodoProject('${id}')" class="btn btn-outline-light">Add Todo</button>
        `)
    }

function generateProjectTodo(id,title,description,members){
    // console.log(title,'=======from generate project todooooooooo=========')
    $('.project-todos').empty()
    
    // $('.project-page').empty()
    $.ajax({
        method:'get',
        url: `${baseUri}/projects/${id}/todos`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done((todos) => {

        for(let i=0 ; i<todos.length; i++){
            if(todos[i].status === true && todos[i].starred === false){
                let html = ''
                html += `
                
                <div class="promoting-card" style="background: linear-gradient(90deg, rgba(100,171,56,1) 0%, rgba(194,215,28,1) 100%)">
                    <div class="card-body d-flex flex-row" style="padding-bottom:0px;display:flex;justify-content: space-between;">
                        <div style="display: flex;">
                            <a href="#" >
                            <i class="fas fa-star" onclick="updateStarredProject('${todos[i]._id}','${todos[i].projectId}','${title}')" style="font-size:50px; margin-right:20px; opacity: 0.3;color: #000000;"></i>
                            </a>
                            <div class="task-title">
                            <h3 class="card-title font-weight-bold mb-2" style="color: white;" >${todos[i].title}</h3>
                            <p class="card-text" style="color: white;font-size:18px"><i class="far fa-clock pr-2"></i>${todos[i].date.slice(0,10)}</p>
                            </div>
                        </div>
                        <div>
                            <a style="background: transparent; border: none; " onclick="deleteTodoProject('${todos[i]._id}','${todos[i].projectId}','${title}')">
                            <i class="fas fa-times" id="edit-button" style="font-size:40px;color:white;"></i>
                            </a>
                        </div>
                        </div>
                        <div class="card-body">
                            <div class="bottom" style="display:flex; justify-content: space-between;align-items: center;">
                                <div class="bottom-right">
                                <button type="button" onclick="updateStatusTodoProject('${todos[i]._id}','${todos[i].projectId}','${title}')" class="btn btn-outline-light">ON GOING</button>
                                <button type="button" data-toggle="modal" data-target="#editTodoProject" onclick="toogleUpdateProjectTodo('${todos[i]._id}','${todos[i].title}','${todos[i].projectId}','${title}','${description}','${members}')," class="btn btn-outline-light">edit</button>
                                </div>
                                <div class="bottom-left">
                                <div class="assignee">
                                    <div id="members" style="width: 50px;height: 50px; margin: 5px; background-size: cover; background-position: top center;border-radius: 50%; background-image: url('${todos[i].assignee.profilePicture}');"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                `
                $('.project-todos').prepend(html)

            }else if(todos[i].status === true && todos[i].starred === true){
                    let html = ''
                    html += `
                    
                    <div class="promoting-card" style="background: linear-gradient(90deg, rgba(100,171,56,1) 0%, rgba(194,215,28,1) 100%)">
                        <div class="card-body d-flex flex-row" style="padding-bottom:0px;display:flex;justify-content: space-between;">
                            <div style="display: flex;">
                                <a href="#" >
                                <i class="fas fa-star" onclick="updateStarredProject('${todos[i]._id}','${todos[i].projectId}','${title}')" style="font-size:50px; margin-right:20px; color: #d7c15c;"></i>
                                </a>
                                <div class="task-title">
                                <h3 class="card-title font-weight-bold mb-2" style="color: white;" >${todos[i].title}</h3>
                                <p class="card-text" style="color: white;font-size:18px"><i class="far fa-clock pr-2"></i>${todos[i].date.slice(0,10)}</p>
                                </div>
                            </div>
                            <div>
                                <a style="background: transparent; border: none; " onclick="deleteTodoProject('${todos[i]._id}','${todos[i].projectId}','${title}')">
                                <i class="fas fa-times" id="edit-button" style="font-size:40px;color:white;"></i>
                                </a>
                            </div>
                            </div>
                            <div class="card-body">
                                <div class="bottom" style="display:flex; justify-content: space-between;align-items: center;">
                                    <div class="bottom-right">
                                    <button type="button" onclick="updateStatusTodoProject('${todos[i]._id}','${todos[i].projectId}','${title}')" class="btn btn-outline-light">ON GOING</button>
                                    <button type="button" data-toggle="modal" data-target="#editTodoProject" onclick="toogleUpdateProjectTodo('${todos[i]._id}','${todos[i].title}','${todos[i].projectId}','${title}','${description}','${members}')," class="btn btn-outline-light">edit</button>
                                    </div>
                                    <div class="bottom-left">
                                    <div class="assignee">
                                        <div id="members" style="width: 50px;height: 50px; margin: 5px; background-size: cover; background-position: top center;border-radius: 50%; background-image: url('${todos[i].assignee.profilePicture}');"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    `
                    $('.project-todos').prepend(html)
            
            }else if(todos[i].status === false && todos[i].starred === false){

                let html = ''
                html += `
                
                    <div class="promoting-card" style="background: linear-gradient(148deg, rgba(56,56,56,1) 0%, rgba(47,47,47,1) 100%);">
                        <div class="card-body d-flex flex-row" style="padding-bottom:0px;display:flex;justify-content: space-between;">
                            <div style="display: flex;">
                                <a href="#" >
                                <i class="fas fa-star" onclick="updateStarredProject('${todos[i]._id}','${todos[i].projectId}','${title}')" style="font-size:50px; margin-right:20px;opacity: 0.3;color: #000000;"></i>
                                </a>
                                <div class="task-title">
                                <h3 class="card-title font-weight-bold mb-2" style="color: white;" >${todos[i].title}</h3>
                                <p class="card-text" style="color: white;font-size:18px"><i class="far fa-clock pr-2"></i>${todos[i].date.slice(0,10)}</p>
                                </div>
                            </div>
                            <div>
                                <a style="background: transparent; border: none; " onclick="deleteTodoProject('${todos[i]._id}','${todos[i].projectId}','${title}')">
                                <i class="fas fa-times" id="edit-button" style="font-size:40px;color:white;"></i>
                                </a>
                            </div>
                            </div>
                            <div class="card-body">
                                <div class="bottom" style="display:flex; justify-content: space-between;align-items: center;">
                                    <div class="bottom-right">
                                    <button type="button" onclick="updateStatusTodoProject('${todos[i]._id}','${todos[i].projectId}','${title}')" class="btn btn-outline-light">DONE</button>
                                    <button type="button" data-toggle="modal" data-target="#editTodoProject" onclick="toogleUpdateProjectTodo('${todos[i]._id}','${todos[i].title}','${todos[i].projectId}','${title}','${description}','${members}')"  class="btn btn-outline-light">edit</button>
                                    </div>
                                    <div class="bottom-left">
                                    <div class="assignee">
                                    <div id="members" style="width: 50px;height: 50px; margin: 5px; background-size: cover; background-position: top center;border-radius: 50%; background-image: url('${todos[i].assignee.profilePicture}');"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                `
                $('.project-todos').prepend(html)
            }else{

                let html = ''
                html += `
                
                    <div class="promoting-card" style="background: linear-gradient(148deg, rgba(56,56,56,1) 0%, rgba(47,47,47,1) 100%);">
                        <div class="card-body d-flex flex-row" style="padding-bottom:0px;display:flex;justify-content: space-between;">
                            <div style="display: flex;">
                                <a href="#" >
                                <i class="fas fa-star" onclick="updateStarredProject('${todos[i]._id}','${todos[i].projectId}','${title}')" style="font-size:50px; margin-right:20px;color: #d7c15c;"></i>
                                </a>
                                <div class="task-title">
                                <h3 class="card-title font-weight-bold mb-2" style="color: white;" >${todos[i].title}</h3>
                                <p class="card-text" style="color: white;font-size:18px"><i class="far fa-clock pr-2"></i>${todos[i].date.slice(0,10)}</p>
                                </div>
                            </div>
                            <div>
                                <a style="background: transparent; border: none; " onclick="deleteTodoProject('${todos[i]._id}','${todos[i].projectId}','${title}')">
                                <i class="fas fa-times" id="edit-button" style="font-size:40px;color:white;"></i>
                                </a>
                            </div>
                            </div>
                            <div class="card-body">
                                <div class="bottom" style="display:flex; justify-content: space-between;align-items: center;">
                                    <div class="bottom-right">
                                    <button type="button" onclick="updateStatusTodoProject('${todos[i]._id}','${todos[i].projectId}','${title}')" class="btn btn-outline-light">DONE</button>
                                    <button type="button" data-toggle="modal" data-target="#editTodoProject" onclick="toogleUpdateProjectTodo('${todos[i]._id}','${todos[i].title}','${todos[i].projectId}','${title}','${description}','${members}')"  class="btn btn-outline-light">edit</button>
                                    </div>
                                    <div class="bottom-left">
                                    <div class="assignee">
                                    <div id="members" style="width: 50px;height: 50px; margin: 5px; background-size: cover; background-position: top center;border-radius: 50%; background-image: url('${todos[i].assignee.profilePicture}');"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                `
                $('.project-todos').prepend(html)

            }
        }
        console.log(todos)
    })
    .fail((err) => {
        console.log(err)
    })
}



function addProject(title,description,members){
    $.ajax({
        method:'post',
        url: `${baseUri}/projects/`,
        headers: {
            token : localStorage.getItem('token')
        },
        data : {
            title : title,
            description : description,
            member : members 
        }
    })
    .done(()=>{
        $('.project-todos').empty()
        $('.project-page').empty()
        generateProject()   
        swal(`Successfully added!`, "let see your new data", "success");
        console.log('successfully added')
    })
    .fail(function(xhr, status, error){
        swal(`Oops!`, JSON.parse(xhr.responseText).message, "error");
        console.log(xhr.responseText)
    })
}

function deleteProject(id){

    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("successfully deleted", {
            icon: "success",
          });

          $.ajax({
              method:'delete',
              url: `${baseUri}/projects/${id}`,
              headers: {
                  token : localStorage.getItem('token')
              },
          })
          .done(()=>{
              $('.project-todos').empty()
              $('.project-page').empty()
              $(`#todolist`).empty()
              generateProject()
              console.log('successfully added')
          })
          .fail(function(xhr, status, error){
              swal(`Oops!`, JSON.parse(xhr.responseText).message, "error");
          
          })
          
        } else {
          swal("delete cancelled");
        }
      });

}

function leaveGroup(id){

    swal({
        title: "Are you sure?",
        text: "All the todo within this group will be deleted!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("you left the project", {
            icon: "success",
          });
        //   console.log('leaving group' + id)
          $.ajax({
              method:'patch',
              url: `${baseUri}/projects/${id}/leave`,
              headers: {
                  token : localStorage.getItem('token')
              },
          })
          .done((response) => {
              $('.project-todos').empty()
              $('.project-page').empty()
              generateProject()   
              swal("you left the group", {
                  icon: "success",
                });
          })
          .fail(function(xhr, status, error){
              swal(`Oops!`, JSON.parse(xhr.responseText).message, "error");
          })
        } else {
          swal("delete cancelled");
        }
      });
   
}

function addTodoProject(title,date,assignee,projectId){
    console.log(title,date,assignee,projectId)
    $.ajax({
        method:'post',
        url: `${baseUri}/projects/${projectId}/todos`,
        headers: {
            token : localStorage.getItem('token')
        },
        data:{
            title : title,
            date : date,
            assignee : assignee
        }
    })
    .done(()=>{
        $('#todolist').empty()
        $('.project-todos').empty()
        $('#wrapper').show()
        generateTodo()
        generateProjectTodo(projectId,title)
        console.log('successfully updated')
        swal(`Successfully updated!`, "let see your new data", "success");
    })
    .fail((err)=>{
        console.log(err)
        swal(`Oops!`, "Please input correct format", "error");
    })
}

function editProject(id,title,description,members){
    console.log(id,title,description,members)
    $.ajax({
        method:'put',
        url: `${baseUri}/projects/${id}`,
        headers: {
            token : localStorage.getItem('token')
        },
        data:{
            title : title,
            description : description
        }
    })
    .done((project)=>{
        $('.project-todos').empty()
        $('.project-page').empty()
        $(".header-project").empty()
        generateProject()
        generateProjectHeader(id,title,description,members)
        generateProjectTodo(id,title,description,members)
        swal(`Successfully updated!`, "let see your new data", "success");
    })
    .fail(function(xhr, status, error){
        swal(`Oops!`, JSON.parse(xhr.responseText).message, "error");
    
    })
}

function updateStarred(id,page){
    $.ajax({
        method:'patch',
        url: `${baseUri}/todos/${id}/starred`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(()=>{
        $('#todolist').empty()
        $('.project-todos').empty()
        $('.header-project').empty()
        $('#wrapper').show()
        // $('.todo-header-part').hide()
        generateTodo(page)
        // $('#todo-star').css('color',"#d7c15c")
        console.log('successfully update star')
    })
    .fail((err)=>{
        console.log(err)
    })
}


function updateStarredProject(todoId,projectId,projectTitle,page){
    console.log(page)
    $.ajax({
        method:'patch',
        url: `${baseUri}/todos/${todoId}/starred`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(()=>{
        $('#todolist').empty()
        $('.project-todos').empty()
        $('#wrapper').show()
        generateTodo(page)
        generateProjectTodo(projectId,projectTitle)
        console.log('successfully updated')
    })
    .fail((err)=>{
        console.log(err)
    })
}