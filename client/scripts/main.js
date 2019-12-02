var routes = {},
    defaultRoute = 'home';

routes['home'] = {
    url: '#/',
    templateUrl: 'templates/home.html'   
}

routes['login'] = {
    url: '#/login',
    templateUrl: 'templates/login.html'
};

routes['todos'] = {
    url: '#/todos',
    templateUrl: 'templates/todos.html'
};

routes['project'] = {
    url: '#/project',
    templateUrl: 'templates/project.html'
};

$.router
.setData(routes)
.setDefault(defaultRoute);

$.when($.ready)
.then(function() {
    $.router.run('.my-view','login');

    if (localStorage.getItem('jwt_token')) {
        $.router.go("home");
    } else {
        $.router.go("login")
    }
});


// const BASE_URL="http://localhost:3000";
const BASE_URL="http://fancytodoserver.angelavanessa.com";

let todoId, currentProjSettings;

$( document ).ready(function() {
    let isLoggedIn = localStorage.getItem('jwt_token');
    
    if (isLoggedIn) {
        $(".logged-out").hide()
        getAllInvitations();
    } else {
        $(".logged-in").hide()
    }

    $('#login-form').on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: `${BASE_URL}/users/signin`,
            data: $(this).serialize()
        })
            .done( data => {
                localStorage.setItem('jwt_token', data.token);
                event.preventDefault();

                $(".logged-in").hide()
                $(".logged-out").show()
            })
            .fail( err => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    type: 'error',
                    confirmButtonText: 'Cool'
                })
                showErrorMessage(err.responseText);
            })
    }); 

    e = $('#auth-button');
    let options = {
        'client_id': 'uAyYOKPij5IKlITDKty9OrJ9RlkjbXw0_e__CH26YwyXSTy6',
        'scope': 'google_calendar'
    };

    Kloudless.auth.authenticator(e, options, function (result) {
        if (result.error) {
            console.error('An error occurred:', result.error);
        } else {
            localStorage.setItem('calendar', result.access_token)
        }
    });
});

function getAllInvitations() {
    $.ajax({
        type: 'GET',
        url: `${BASE_URL}/invitations`,
        headers: {
            authorization: localStorage.getItem('jwt_token')
        }
    })
    .done( datas => {
        $('#dropdownItemsMenu').empty();
        let recipient = datas.asRecipient;
        if (recipient.length == 0) {
            $('#dropdownItemsMenu').append(`
            <div class="dropdown-item">
                <span>No Invitations</span>
            </div>
            `)
        } else {
            for (let inv in recipient) {
                $('#dropdownItemsMenu').append(`
                    <div class="dropdown-item" href="#">
                        <span>${recipient[inv].sender.name} has sent you an invitation
                        to join ${recipient[inv].project.name}!</span>
                        <span class="float-right">
                            <button onclick="acceptInvitation('${recipient[inv]._id}')">Accept</button>
                            <button onclick="declineInvitation('${recipient[inv]._id}')">Decline</button>
                        </span>  
                    </div>
                    
                `)
            }
        }  
    })
    .fail( err => {
        showErrorMessage(err)
    })
}

function acceptInvitation(id) {
    $.ajax({
        type: 'PATCH',
        url: `${BASE_URL}/invitations/${id}`,
        headers: {
            authorization: localStorage.getItem('jwt_token')
        }
    })
    .done(data => {
        $('#all-projects').prepend(`
            <div class="card col-3" onclick="showTodos('${data._id}')">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${data.members.length + 1} Members</h6>
                    <button class="btn btn-box" onclick="editProject('${data._id}')">Edit Project Settings</button>
                </div>
            </div>
        `)
        getAllInvitations();
        showSuccessMessage(`You have accepted an invitation!`)
    })
    .fail(err => {
        showErrorMessage(err.responseText)
    })
}

function declineInvitation(id) {
    $.ajax({
        type: 'DELETE',
        url: `${BASE_URL}/invitations/${id}`,
        headers: {
            authorization: localStorage.getItem('jwt_token')
        }
    })
    .done(data => {
        showErrorMessage(`You have declined an invitation!`)
    })
    .fail(err => {
        showErrorMessage(err.responseText)
    })
}

function showTodos(projectId){
    // console.log(projectId)
    $.router.go("todos");
    localStorage.setItem('project', projectId)
    // $('<input>', {
    //     type: 'hidden',
    //     id: 'add-todo-form',
    //     name: 'project',
    //     value: projectId
    // }).appendTo('form');
    // let groupId = $('input[name=project]').val();
    // console.log(groupId)
    ajaxShowTodos(projectId)
        .then( datas => {
            
        })
        .catch( err => {
            showErrorMessage(err.responseText);
        })
    
}

function addToCalendar (name, date) {
    let projectId = localStorage.getItem('project');

    if (!localStorage.getItem('calendar')) {
        showErrorMessage('You have to connect your calendar first!')
    } else {
        $.ajax({
            type: 'POST',
            url: `${BASE_URL}/projects/${projectId}/todos/calendar`,
            headers: {
                authorization: localStorage.getItem('jwt_token')
            },
            data: { 
                token: localStorage.getItem('calendar'),
                name,
                date 
            }
        })
        .done(data => {
            showSuccessMessage('Success added to calendar')
        })
        .fail(err => {
            showErrorMessage('Something went wrong!')
        })
    }
    
}

function ajaxShowTodos(projectId) {
    $("#all-todos").empty();
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: `${BASE_URL}/projects/${projectId}/todos`,
            headers: {
                authorization: localStorage.getItem('jwt_token')
            }
        })
        .done( datas => {
            for (let todo in datas) {
                let date = new Date(datas[todo].dueDate)
                let displayedDate = date.toDateString();
                let id = datas[todo]._id;
                let description = datas[todo].description || 'No Description';
                let dueDate = displayedDate || 'No Due Date';
                let isDone = (datas[todo].status == true) ? 'checked' : '';
                
                $('#all-todos').append(`
                    <tr class="list-box">
                        <th scope="row">
                            <input type="checkbox" name="status" value="${datas[todo].status}" ${isDone} onclick="checkThis('${id}', '${datas[todo].status}')">
                        </th>
                        <td onclick="editTodo('${id}')" data-toggle="modal" data-target="#editTodoModal"> ${datas[todo].name}</td>
                        <td onclick="editTodo('${id}')" data-toggle="modal" data-target="#editTodoModal">${description}</td>
                        <td onclick="editTodo('${id}')" data-toggle="modal" data-target="#editTodoModal">${dueDate}</td>
                        <td onclick="editTodo('${id}')" data-toggle="modal" data-target="#editTodoModal">${datas[todo].user.name}</td>
                        <td class="delete-todo" onclick="deleteTodo('${id}')">DELETE</td>
                        <td onclick="addToCalendar('${datas[todo].name}','${dueDate}')">Add To Calendar</td>
                    </tr>
                `)
            }
            resolve(datas)
        })
        .fail( err => {
            reject(err)
        })
    })
}

function showErrorMessage(str){
    Swal.fire({
        title: 'Error!',
        text: str,
        type: 'error',
        confirmButtonText: 'Cool'
    })
}

function showSuccessMessage(str) {
    Swal.fire(
        'Success!',
        str,
        'success'
      )
}

function logOut() {
    event.preventDefault();
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('project');
    localStorage.removeItem('email');
    localStorage.removeItem('calendar');
    $.router.go("login");
}

function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax(`${BASE_URL}/gSignIn`, {
        method: "POST",
        data: {
            id_token
        }
    })
    .done( data => {
        localStorage.setItem('email', data.email);
        localStorage.setItem('jwt_token', data.token);
        $.router.go("home");
        return;   
    })
    .fail( err => {
        console.log(err)
    })
}

function signOut() {
    onLoad()
    var auth2 = gapi.auth2.getAuthInstance();
    
    auth2.signOut().then(function () {
      logOut()
    });
}