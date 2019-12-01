const baseURL = `http://localhost:3000`
let updateId = ''
const colors = ['green lighten-3', 'teal lighten-3', 'lime lighten-3', 'amber lighten-2', 'deep-orange lighten-3', 'brown lighten-3', 'blue-grey lighten-1']
let projectId = ''

// created() section
$(document).ready(function() {
  $('.collapsible').collapsible();
  $('.modal').modal();
  $('.datepicker').datepicker();
  $('.timepicker').timepicker();
  M.updateTextFields();
  console.log('ready');
  
  // initial toggle flow
  if (!localStorage.getItem('jwtToken')) {
    $('.login').show()
    $('.homepage').hide()
    toggleCornerOff()
  } else {
    $('.fixed-action-btn').floatingActionButton();
    $('.fixed-action-btn').show();
    $('.login').hide()
    $('.homepage').show()
    whoAmI()
    toggleCornerOn()
    showTodoList()
  }
  // end initial toggle flow

  // bundle corner off
  function toggleCornerOff() {
    $('#module-todo').hide()
    $('#signout').hide()
    $('#hi').hide()
    $('#exclamation').hide()
  }
  // end bundle corner off

  // bundle corner on
  function toggleCornerOn() {
    $('#module-todo').show()
    $('#signout').show()
    $('#hi').show()
    $('#exclamation').show()
  }
  // end bundle corner on

  // register form
  $('#register-form').submit(function( event ) {
    event.preventDefault()
    $.ajax({
      url: `${baseURL}/user/register`,
      method: "POST",
      data : {
        email : $('#email-register').val(),
        password : $('#password-register').val()
      }
    })
    .done(payload => {
      M.toast({html: 'Register success!', classes: 'indigo lighten-2 rounded', displayLength: 2000, inDuration: 150, outDuration: 150});
    localStorage.setItem('jwtToken', payload.token)
    localStorage.setItem('user', payload.email)
    console.log(localStorage)
    whoAmI()
    toggleCornerOn()
    $('.register-form').hide()
    $('.homepage').show()
    $('#email-register').val('')
    $('#password-register').val('')
    // $('.login-form').show()
    })
    .fail(errorHandler)
    .always(() => {
      console.log(`complete`);
    })
  })
  // end register form

  // login form
  $('#login-form').submit(function( event ) {
    event.preventDefault()
    $.ajax({
      url: `${baseURL}/user/login`,
      method: "POST",
      data : {
        email : $('#email-login').val(),
        password : $('#password-login').val()
      }
    })
    .done(payload => {
      M.toast({html: 'Login success!', classes: 'indigo lighten-2 rounded', displayLength: 2000, inDuration: 150, outDuration: 150});  
      localStorage.setItem('jwtToken', payload.token)
      localStorage.setItem('user', payload.email)
      console.log(payload)
      whoAmI()
      toggleCornerOn()
      $('.login').hide()
      $('.homepage').show()
      showTodoList()
      $('#email-login').val('')
      $('#password-login').val('')
    })
    .fail(errorHandler)
    .always(() => {
      console.log(`complete`);
    })
  })
  // end login form
})
// end created() section


// functions


// assign update id
function showUpdateForm(id, title, description, dueDate) {

  console.log("rrrrrrrrrrrr");
  console.log("a", description, "desccccccccc");
  
  // console.log(`${title}`);
  $('.label-update').addClass('active')
  
  $('#update-todo-id').val(id)
  $('#update-todo-title').val(title)
  if ($('#update-todo-description').val(description)) {
    $('#update-todo-description').val(description)
  } else {
    $('#update-todo-description').removeClass('active')
  }
  //nguli date ove here, modular method
  $('#update-todo-date').val(dueDate)
  $('#update-todo-time').val(dueDate)
}
// end assign update id


// assign update id for project todo
function showProjectTodoUpdateForm(id, title, description, dueDate) {

  console.log("rrrrrrrrrrrr");
  console.log("a", description, "desccccccccc");
  
  // console.log(`${title}`);
  $('.label-update').addClass('active')
  
  $('#update-project-todo-id').val(id)
  $('#update-todo-title').val(title)
  if ($('#update-todo-description').val(description)) {
    $('#update-todo-description').val(description)
  } else {
    $('#update-todo-description').removeClass('active')
  }
  //nguli date ove here, modular method
  $('#update-todo-date').val(dueDate)
  $('#update-todo-time').val(dueDate)
}
// end assign update id for project todo

// user who
function whoAmI() {
  $('.who-am-i').empty()
  let user = localStorage.getItem('user').split('@')[0]
  let newUser = `${user[0].toUpperCase() + user.slice(1)}`
  $('.who-am-i').append(`${newUser}`)
}
// end user who

// redrect to login
function toLogin() {
  $('.register-form').hide()
  $('.login-form').show()
}
// end redirect to login

// redirect to register
function toRegister() {
  $('.register-form').show()
  $('.login-form').hide()
}
// end redirect to register

// google sign in
function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token

  $.ajax({
    url: `http://localhost:3000/user/google-signin`,
    method: `POST`,
    data : {
      idToken : id_token
    }
  })
  .done(result => {
    // console.log(result);
    localStorage.setItem('jwtToken', result.token)
    $('.homepage').show()
    $('.login').hide()
  })

  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
// end google sign in


// sign out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });  
    M.toast({html: 'Logged Out!', classes: 'indigo lighten-2 rounded', displayLength: 2000, inDuration: 150, outDuration: 150});  
    $('.who-am-i').empty()
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    $('.login').show()
    $('.homepage').hide()
    $('.alltodos').empty()
}
// end sign out

// fetch all todo
function showTodoList() {
  $.ajax({
    url: `${baseURL}/todo`,
    method : `GET`,
    headers : {
      access_token: localStorage.getItem('jwtToken')
    }
  })
  .done(todos => {
    console.log(todos);
    //${todo.dueDate}
    $('.alltodos').empty()
    todos.forEach(todo => {
      if (todo.status) {
        $('.alltodos').append(`

        <li>
          <div class="collapsible-header">
            <div class="row">
              <div class="col s2">
                <div clickable  class="chip teal darken-2">
                personal
                </div>
              </div>
              <div class="col s9">
                <span  class="crossed">${todo.title}</span>
              </div>
              <div class="col s1">
                <i class="clickable material-icons teal-text text-darken-2" onclick="remove('${todo._id}')">delete</i>
              </div>
            </div>
          </div>
          <div class="collapsible-body clickable" onclick="done('${todo._id}')" ><span>${todo.description}</span></div>
        </li>

      `)
      } else 
      $('.alltodos').append(`

        <li>
          <div class="collapsible-header" >
            <div class="row">
              <div class="col s2">
                <div class="chip teal lighten-3" onclick="done('${todo._id}')">
                personal
                </div>
              </div>
              <div class="col s9">
                ${todo.title}
              </div>
              <div class="col s1">
                <i data-target="modal-update" class="material-icons teal-text text-darken-2 modal-trigger" onclick="showUpdateForm( '${todo._id}', '${todo.title}', '${todo.description ? todo.description : ''}', '${todo.dueDate}' )">edit</i>
              </div>
            </div>
          </div>
          <div class="collapsible-body"><span>${todo.description ? todo.description : 'This is a description generator. Click the edit icon to update! \n You might want to break down and specify the task, who does this task assign to, or change the deadline.'}</span></div>
        </li>

      `)
    })
  })
  .fail(errorHandler)
}
// end fetch all todo

// fetch all project todo
function showProjectTodoList() {
  console.log(`masuk show project to do list`);
  
  $.ajax({
    url: `${baseURL}/project/${projectId}`,
    method : `GET`,
    headers : {
      access_token: localStorage.getItem('jwtToken')
    }
  })
  .done(project => {
    // $('.fixed-action-btn').hide();
    console.log(project, 'dari show project todo list');
    //${todo.dueDate}
    $('.allProjectTodos').empty()
    project.todos.forEach(todo => {
      if (todo.status) {
        $('.allProjectTodos').append(`

        <li>
          <div class="collapsible-header">
            <div class="row">
              <div class="col s1">
                <div clickable  class="chip teal darken-2">
                group
                </div>
              </div>
              <div class="col s10">
                <span  class="crossed">${todo.title}</span>
              </div>
              <div class="col s1">
                <i class="clickable material-icons teal-text text-darken-2" onclick="removeProjectTodo('${todo._id}')">delete</i>
              </div>
            </div>
          </div>
          <div class="collapsible-body clickable" onclick="done('${todo._id}')" ><span>${todo.description}</span></div>
        </li>

      `)
      } else 
      $('.allProjectTodos').append(`

        <li>
          <div class="collapsible-header" >
            <div class="row">
              <div class="col s1">
                <div class="chip teal lighten-3" onclick="doneProjectTodo('${todo._id}')">
                group
                </div>
              </div>
              <div class="col s10">
                ${todo.title}
              </div>
              <div class="col s1">
                <i data-target="modal-project-todo-update" class="material-icons teal-text text-darken-2 modal-trigger" onclick="showProjectTodoUpdateForm( '${todo._id}', '${todo.title}', '${todo.description ? todo.description : ''}', '${todo.dueDate}' )">edit</i>
              </div>
            </div>
          </div>
          <div class="collapsible-body"><span>${todo.description ? todo.description : 'This is a description generator. Click the edit icon to update! \n You might want to break down and specify the task, who does this task assign to, or change the deadline.'}</span></div>
        </li>

      `)
     
    })
    $(`.member-list`).empty()
    project.members.forEach(member => {
      $(`.member-list`).append(`
      <p>${member.email}</p>
      `)
    })
  })
  .fail(errorHandler)
}
// end fetch all project todo


// todo finish
function done(id) {
  console.log('called')
  $.ajax({
    url: `${baseURL}/todo/${id}`,
    method: 'patch',
    data: {
      status: true
    },
    headers: {
      access_token: localStorage.getItem('jwtToken')
    }
  })
    .done(todo => {
      console.log(todo, "<<<<<<<<<<<<")
      showTodoList()
    })
    .fail(errorHandler)
}
// end todo finish


// project todo done 

function doneProjectTodo(id) {
  console.log('called done project todo')
  $.ajax({
    url: `${baseURL}/project/${projectId}/todos/${id}`,
    method: 'PATCH',
    data: {
      status: true
    },
    headers: {
      access_token: localStorage.getItem('jwtToken')
    }
  })
    .done(todo => {
      console.log(todo, "<<<<<<<<<<<<")
      showProjectTodoList()
    })
    .fail(errorHandler)
}

// end project todo finish

// delete todo
function remove(id) {
  $.ajax({
    url: `${baseURL}/todo/${id}`,
    method: `DELETE`,
    headers : {
      access_token: localStorage.getItem('jwtToken')
    }
  })
  .done(() => {
    M.toast({html: 'Todo deleted!', classes: 'indigo lighten-2 rounded', displayLength: 2000, inDuration: 150, outDuration: 150});  
    showTodoList()
  })
  .fail(errorHandler)
  .always(() => {
    console.log(`complete`);
  })
}
// end delete todo

// delete project todo
function removeProjectTodo(id) {
  $.ajax({
    url: `${baseURL}/project/${projectId}/todos/${id}`,
    method: `DELETE`,
    headers : {
      access_token: localStorage.getItem('jwtToken')
    }
  })
  .done(() => {
    M.toast({html: 'Todo deleted!', classes: 'indigo lighten-2 rounded', displayLength: 2000, inDuration: 150, outDuration: 150});  
    showProjectTodoList()
  })
  .fail(errorHandler)
  .always(() => {
    console.log(`complete`);
  })
}
// end delete project todo

// show project page
function toProject(event) {
  console.log('prjcttttttttttttttttttt');
  event.preventDefault()
  $('.fixed-action-btn').show()
  $('.login').hide()
  $('.homepage').hide()
  $('.projectpage').show()
  $('.project-cards').show()

  fetchProject()
}
// end show project page

// show project page
// function toProjectCard(event) {
//   console.log('prjcttttttttttttttttttt');
//   event.preventDefault()
//   $('.login').hide()
//   $('.homepage').hide()
//   $('.projectpage').hide()
//   $('.project-cards').show()
//   $('.fixed-action-btn').hide();

//   fetchProject()
// }
// end show project page


// show home page
function toHomepage(event) {
  event.preventDefault()
  $('.login').hide()
  $('.homepage').show()
  $('.projectpage').hide()
  $('.project-cards').hide()

  
}
// end show home page

// show project 

function showProjectForm(event) {
  event.preventDefault()
  $('.login').hide()
  $('.homepage').hide()
  $('.projectpage').show()
  $('.remark').hide()
  $('.project-cards').hide()

}

// end of show project 


// show project inside

function showProjectFormInside(event) {
  event.preventDefault()
  $('.login').hide()
  $('.homepage').hide()
  $('.projectpage').show()
  $('.remark').hide()
  $('.project-cards').show()
  $('.form-add-project').show()
}

// end of show project inside

// fetch project 

function fetchProject() {
  $.ajax({
    url: `${baseURL}/project`,
    method: 'GET',
    headers : {
      access_token : localStorage.getItem('jwtToken')
    }
  })
  .done(projects => {
    
    console.log(projects, 'fetch project');
    if (projects.length > 0) {
      $('.fixed-action-btn').show()
      $('.remark').hide()
      $('.project-cards').show()
      $('.detailed-project').hide()
      $('.project-cards').empty()
      projects.forEach(project => {
        // console.log(project, 'dari for each fetch');
        // console.log(project._id, 'dr fetch nyari id prjct ada gakkk');
        
        //   <i class="material-icons" style="color: orange;">delete</i>

        $('.project-cards').append(`
        
          <div class="col s4">
            <div class="card cyan darken-4">
              <div class="card-content white-text">
                <div class="project-title">
                <span style="font-size: 35px; margin-bottom: 30px;" class="card-title">${project.title}</span>
                </div>
                <p>“Focus on being productive instead of busy.” <br>
                – Tim Ferriss</p>
              </div>
              <div class="card-action">
                <div>
                  <a href="#"><i class="fas fa-users"></i>&nbsp;5</a>
                  <a href="#"><i class="far fa-list-alt"></i>&nbsp;${project.todos.length}</a>
                </div>
                <div>
                  <i onclick="showDetailProject('${project._id}')" class="material-icons clickable" style="color: orange;">navigate_next</i>
                </div>
              </div>
            </div>
          </div>
        
        `)
      })
    } else {
      $('.remark').show()
      $('.project-cards').hide()
      $('.detailed-project').hide()
      $('.fixed-action-btn').hide()
    }
  })
  .fail(err => {
    console.log(`failed to fetch project`);
    
  })
  .always(() => {
    console.log(`complete`);
    
  })
}
// end fetch project

// create project

function createProject(event) {
  event.preventDefault()
  $.ajax({
    url: `${baseURL}/project`,
    method: 'POST',
    data : {
      title : $(`#add-project-title`).val()
    },
    headers : {
      access_token : localStorage.getItem('jwtToken')
    }
  })
  .done(project => {
    $('.projectpage').show()
    $('.remark').hide()
    $('.form-add-project').hide()
    $('.project-cards').show()

    console.log(`dapet project dr create project`, project)
    fetchProject()
  })
  .fail(err => {
    console.log(`failed to add project`);
    
  })
  .always(() => {
    console.log(`complete`);
    
  })
}
// end create project

// detail project 
function showDetailProject(id) {
  projectId = id
  console.log(id, `mau find one plssss ini project id`);
  
  event.preventDefault()
  $.ajax({
    url: `${baseURL}/project/${id}`,
    method: 'GET',
    headers : {
      access_token : localStorage.getItem('jwtToken')
    }
  })
  .done(project => {
    //onclick="showUpdateTitle() updateProject(${project._id})" 
    showProjectTodoList()
    console.log(`masuk find one`, project)
    $('.fixed-action-btn').hide();
    $('.project-cards').hide()
    $('.detailed-project').show()
    $('.project-collection-header').empty()
    $('.project-collection-header').append(`
      <B><i>${project.title}</i></B>
           
      </div>
      <div class="project-edit">
        <div style="padding-left: 20px; margin-top: 1px;">
        <i data-target="modal-update-project-title" class="material-icons modal-trigger clickable">edit</i>
        </div>
        <div style="padding-right: 20px; margin-top: 1px;">
        <i onclick="deleteProject('${project._id}')" class="material-icons clickable">delete</i>
        </div>
        
      </div>
    `)
  })
  .fail(err => {
    console.log(`failed to find project`);
    
  })
  .always(() => {
    console.log(`complete`);
    
  })

}
// end detail project 

 // delete project 
function deleteProject(id) {
  $.ajax({
    url: `${baseURL}/project/${id}`,
    method: 'DELETE',
    headers : {
      access_token: localStorage.getItem('jwtToken')
    }
  })
  .done(() => {
    M.toast({html: 'Project deleted!', classes: 'indigo lighten-2 rounded', displayLength: 2000, inDuration: 150, outDuration: 150});  
    showProjectTodoList()
    toProject(event)
  })
  .fail(errorHandler)
  .always(() => {
    console.log(`complete`);
  })
}
  // end delete project 

// show update title form
// function showUpdateTitle() {
//   data-target="modal-update"
// }
// end show update title form 

// update project 
function updateProject(id) {
  $.ajax({
    url: `${baseURL}/project/${id}`,
    method: 'PATCH',
    data: {
      title : $('#update-project-todo-title').val()
    },
    headers: {
      access_token: localStorage.getItem('jwtToken')
    }
  })
  .done(project => {
    console.log(project, 'ke update gak nii title project nyaaaa');
    // showProjectTodoList()
    $('.detailed-project').show()
  })
}
// end update project 


// end functions


// ajax

// create todo
$('#addtodo').submit(e => {
  e.preventDefault()
  $.ajax({
    url: `${baseURL}/todo`,
    method: `POST`,
    data : {
      title : $(`#add-todo`).val()
    },
    headers : {
      access_token : localStorage.getItem('jwtToken')
    }
  })
  .done(todo => {
    // console.log(todo, "ini todo nyaaaaaaaaaaaaaa");
    
    console.log(`Adding new todo on your list`, todo);
    $(`#add-todo`).val('')
    $(`#add-project-title`).val('')
    showTodoList()
    
  })
  .fail(err => {
    console.log(`Failed to add todo`, err);
  })
  .always(() => {
    console.log(`complete`);
  })
})
// end create todo

// create project todo
$('#addProjectTodo').submit(e => {
  e.preventDefault()
  $.ajax({
    url: `${baseURL}/project/${projectId}/todos`,
    method: `PATCH`,
    data : {
      title : $(`#add-project-todo`).val()
    },
    headers : {
      access_token : localStorage.getItem('jwtToken')
    }
  })
  .done(todo => {
    console.log(todo, "ini project todo nyaaaaaaaaaaaaaa");
    
    console.log(`Adding new todo on your list`, todo);
    $(`#add-project-todo`).val('')
    showProjectTodoList()
    
  })
  .fail(err => {
    console.log(`Failed to add todo`, err);
  })
  .always(() => {
    console.log(`complete`);
  })
})
// end create project todo

// add member to project 
$('#inviteMember').submit(e => {
  e.preventDefault()
  $.ajax({
    url: `${baseURL}/project/${projectId}/invite`,
    method: 'PATCH',
    data: {
      email : $('#add-member').val()
    },
    headers : {
      access_token : localStorage.getItem('jwtToken')
    }
  })
  .done(member => {
    console.log(member, 'mambernya dapet gak niiiii mo masukin ke projecttt');
    $('#add-member').val('')
    showProjectTodoList()
  })
  .fail(errorHandler)
  .always(() => {
    console.log(`complete`);
  })
})
// end add member to project


// show member list

// end show member list

// update todo 
$('#form-update-todo').submit(function(event) {
  event.preventDefault()
  const updateId = $('#update-todo-id').val()
   $.ajax({
    url: `${baseURL}/todo/${updateId}`,
    method: 'PATCH',
    data: {
      title: $('#update-todo-title').val(),
      description: $('#update-todo-description').val(),
      date: $('#update-todo-date').val(),
      time: $('#update-todo-time').val()
    },
    headers: {
      access_token: localStorage.getItem('jwtToken')
    }
  })
    .done(todo => {
      console.log(todo, "hasil update");
      M.toast({html: 'Update success!', classes: 'indigo lighten-2 rounded', displayLength: 2000, inDuration: 150, outDuration: 150});

      showTodoList()
    })
    .fail(errorHandler)

})
// done update todo 


// update project todo 
$('#form-update-project-todo').submit(function(event) {
  
  event.preventDefault()
  const updateId = $('#update-project-todo-id').val()
   $.ajax({
    url: `${baseURL}/project/${projectId}/todos/${updateId}`,
    method: 'PATCH',
    data: {
      title: $('#update-project-todo-title').val(),
      description: $('#update-project-todo-description').val(),
      date: $('#update-project-todo-date').val(),
      time: $('#update-project-todo-time').val()
    },
    headers: {
      access_token: localStorage.getItem('jwtToken')
    }
  })
    .done(todo => {
      console.log(todo, "hasil update");
      M.toast({html: 'Update success!', classes: 'indigo lighten-2 rounded', displayLength: 2000, inDuration: 150, outDuration: 150});

      showProjectTodoList()
    })
    .fail(errorHandler)

})// end update project todo 

// end ajax


/*
utk date


let dt = new Date();

console.log(`${dt.getDate()} ${dt.toLocaleString('id-ID', {month: 'short'})} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()} `)
*/


  // client err-toast
  function errorHandler(err) {
    console.log(err, "==================");
    
    if (!err.responseJSON) {
      M.toast({
        html: `connection error due to server down`,
        classes: 'orange darken-2 rounded',
        displayLength: 2000,
        inDuration: 150,
        outDuration: 150});
    } else {
      if (err.responseJSON.message) {
        M.toast({
          html: err.responseJSON.message.join('<br>'),
          classes: 'indigo lighten-2 rounded',
          displayLength: 2000,
          inDuration: 150,
          outDuration: 150});
      } 
      else {
        M.toast({
          html: `${err.responseJSON}`,
          classes: 'orange darken-2 rounded',
          displayLength: 2000,
          inDuration: 150,
          outDuration: 150});
      }
    }
  }
  // end client err-toast