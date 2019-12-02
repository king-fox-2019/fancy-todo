$(document).ready( () => {
    ceckStatus()         
    $('#toLoginPage').click(toLogin)
    $('#login-button').click(toLogin)    
    $('#register-button').click(toRegister)
    
    $('#register').submit(registerMember)
    $('#login').submit(loginMember)
    $('#logout-button').click(signOut)

    $('#form-fetch-data').submit(event => {
        event.preventDefault()
        fetchDataFilm()
    })
})



function ceckStatus() {
    if(localStorage.getItem('token')){
        $('#mainPage').show()
        $('#loginForm').hide()
        $('#registerForm').hide() 
        $('#login-button').hide()  
        $('#register-button').hide()
        $('#logout-button').show()
        showProfile(localStorage.getItem('token'))   

    } else {
        $('#registerForm').show()
        $('#mainPage').hide()
        $('#loginForm').hide()

        $('#login-button').show()  
        $('#register-button').show()
        $('#logout-button').hide()        
    } 
}

function toLogin(event) {
    event.preventDefault()
    $('#loginForm').show()
    $('#registerForm').hide() 
    $('#mainPage').hide()

}

function toRegister(event) {
    event.preventDefault()
    $('#loginForm').hide() 
    $('#registerForm').show()
    $('#mainPage').hide()

}

function registerMember(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    $.ajax({
        url : `http://localhost:3000/register`,
        method : 'POST',
        data : {
            email : email,
            password : password,
        }
    }).done( result => {
        Swal.fire(
            'Register Success!',
            'You have been registered in our web!',
            'success'
          )
          toLogin(event)
    }).fail( err => {
        Swal.fire({
            title: 'error',
            type: 'error',
            text: err.responseJSON.message.join(', ')
        })
    })    
}

function loginMember(event) {
    event.preventDefault()        
    let email = $('#email_login').val()
    let password = $('#password_login').val()
    $.ajax({
        url : `http://localhost:3000/login`,
        method : 'POST',
        data : {
            email : email,
            password : password
        }
    })
    .done( data => {
        Swal.fire(
            'Loggin Success!',
            'You are now loggin in our web!',
            'success'
            )
            localStorage.setItem("token", data.token)
            ceckStatus()   
        })
        .fail( err => {
            Swal.fire({
                title: 'Ops...',
        type: 'error',
        text: err.responseJSON.message
    })
})    
}


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url : `http://localhost:3000/login-google`,
        method : "POST",
        data : {
            google_token : id_token,
            email : profile.U3
        }
    })
    .done( data => {
        Swal.fire(
            'Loggin Success!',
            'You are now loggin in our web!',
            'success'
            )
            localStorage.setItem("token", data.token)
            ceckStatus() 
    })
    .fail(err=> {
        Swal.fire({
            title: 'Ops...',
    type: 'error',
    text: err.responseJSON.message
        })
    })
}

function signOut() {
    localStorage.removeItem("token")
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        ceckStatus()
    });

}

function showProfile(token){
    $.ajax({
        url : `http://localhost:3000/one`,
        method : "GET",
        headers : {
          token : token
        }
    })
    .done( data => {
        console.log(data)
        $('#profile').empty()
        $('#profile').append(`
          User:  ${data.email}
        `);
        showMytodo()
    })
}

function showMytodo(){
    $.ajax({
        url : `http://localhost:3000/todo`,
        method : "GET",
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data=>{
        $('#myTodo').empty()
        data.forEach(element => {
            let dueDate = 'no Due Date'
            if(element.dueDate){
            let date = element.dueDate.split('T')
            dueDate = date[0]
            }
            
            $('#myTodo').append(`
            <div class="card">
            <div class="card-header">
              ${element.title}
            </div>
            <div class="card-body">
              <h5 class="card-title">${element.description}</h5>
              <p class="card-text">${dueDate}</p>
              <button type="button" class="btn btn-primary btn-sm">update</button>
              <button class="btn btn-outline-success btn-sm" onclick="del('${element._id}')">delete</button>
            </div>
          </div>
            `)
        });
    })
}

function addTodo(event){
    event.preventDefault() 
    $('#detail').empty()
    $('#detail').append(`
  <div class="form-group">
    <label for="formGroupExampleInput">Title</label>
    <input type="text" class="form-control" id="title">
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Description</label>
    <textarea class="form-control" id="description" rows="3"></textarea>
  </div>
  <div class="form-group col-md-8">
      <label for="inputZip">Due Date</label>
      <input type="text" class="form-control" id="dueDate"  placeholder="year - month - date">
  </div>
  <button  class="btn btn-primary mb-2" onclick="add()">Confirm</button>
    `)
}

function add(){
    let title = $('#title').val()
    let description = $('#description').val()
    let dueDate = $('#dueDate').val()

    $.ajax({
        url : `http://localhost:3000/todo`,
        method : "POST",
        headers : {
            token : localStorage.getItem('token')
        },
        data :{
            title,
            description,
            dueDate,
        }
    })
.done(data=>{
    $('#detail').empty()
    showMytodo()
})
}

function del(id){
    $.ajax({
        url : `http://localhost:3000/todo/${id}`,
        method : "delete",
        headers : {
            token : localStorage.getItem('token')
        }
    })
.done(data=>{
    $('#detail').empty()
    showMytodo()
})
.fail(err=>{
    console.log(err)
})  
}