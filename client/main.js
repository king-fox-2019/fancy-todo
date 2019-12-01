$(document).ready(function (){
    if(localStorage.getItem('token')){
        isLogin(true)
        fetchTodo()
      }else{
        isLogin(false)
      }

    $('#register-form').submit(function(event){
        event.preventDefault()
        register()
    })


    $('#login-form').submit(function(event){
        event.preventDefault()
        login()
    })
    

    $('#inputNewEntryForm').submit(function(event){
        event.preventDefault()
        createTodo()
    })
})

function isLogin(status){
    if(status){
      $('#login').hide()
      $('#register').hide()
      $('#signOut').show()
      $('#inputNewEntryForm').show()
      $('#tableOfTodos').show()
      fetchTodo()

    }else{
      $('#login').show()
      $('#register').hide()
      $('#signOut').hide()
      $('#inputNewEntryForm').hide()
      $('#tableOfTodos').hide()
    }
  }



function setToLogin(){
    $('#register').hide()
    $('#login').show()
}

function setToRegister(){
  $('#register').show()
  $('#login').hide()
}



function register()
{
    const username = $('#nameReg').val()
    const email = $('#emailReg').val()
    const password = $('#passReg').val()
    
    console.log(username)
    console.log(email)
    console.log(password)
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/user/register',
        data:{
            username,
            email,
            password
        }
    })
    .done(result=>{
        console.log(result)

        $('#nameReg').val('')
        $('#emailReg').val('')
        $('#passReg').val('')

        Swal.fire({
            text:"Success to Register User"
        })
    })
    .fail(err=>{
        console.log(err)
        Swal.fire({
            text:"error happened"
        })
    })

}




function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    Swal.fire({
        text: `Succesfull Login, 
        welcome ${profile.getName()}`,
        timer:2000
    })


    // The ID token you need to pass to your backend:
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("TCL: onSignIn -> googleUser.getAuthResponse()", googleUser.getAuthResponse())
    console.log("ID Token: " + id_token);

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/signin/google',
        data: {
            id_token
        }
    })
    .done(result=>{
        console.log('success nih')
        console.log(result)
        localStorage.setItem('token', result.access_token)
        localStorage.setItem('userData', result.userData)
        
        isLogin(true)
    })
    .fail(err=>{
        console.log(err)
        Swal.fire({
            text:'Error nih'
        })
    })
}



function login()
{
    const email = $('#emailLog').val()
    const password = $('#passLog').val()

    // Swal.fire( email, password)
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data :{ email, password }
    })
    .done(result=>{
        localStorage.setItem('token', result.access_token)
        localStorage.setItem('userData', result.userData)
        $('#emailLog').val('')
        $('#passLog').val('')

        Swal.fire({
            text:'Successfull Login'
        })
        isLogin(true)

    })
    .fail(err=>{
        console.log(err)
        Swal.fire({
            text:'Error login nih'
        })
    })

}



function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      localStorage.clear()
      console.log('User signed out.');
    });
    $('#content-table').empty()
    $('#todoLog').val('')
    $('#descriptionLog').val('')
    $('#inputDateLog').val('')
    isLogin(false)
}


function createTodo()
{
    const todo = $('#todoLog').val()
    const description = $('#descriptionLog').val()
    const due_date = $('#inputDateLog').val()
    const status = false
    
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/user/getuser',
        headers:{
            token:localStorage.getItem('token')
        }
    })
    .done(result=>{
        // console.log(result)
        // console.log('idnih', result._id)
        $.ajax({
            method:'post',
            url: `http://localhost:3000/todo/createtodo/${result._id}`,
            data:{
                name: todo,
                description,
                status,
                due_date
            }
        })
        .done(result=>{
            Swal.fire({
                text:"success to submit new todo"
            })
            fetchTodo()
        })
        .fail(err=>{
            console.log(err)
            Swal.fire({
                text:"error happened"
            })  
        })
    })
    .fail(err=>{
        console.log(err)
        Swal.fire({
            text:"error happened"
        })
    })

}



function fetchTodo()
{
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/user/getuser',
        headers:{
            token:localStorage.getItem('token')
        }
    })
    .done(result=>{
        console.log('idnih' , result._id)
        $.ajax({
            method:'get',
            url: `http://localhost:3000/todo/findall/${result._id}`,
        })
        .done(result=>{
            console.log(result)
            $('#content-table').empty()
            Swal.fire({
                text:"fetching",
                timer: 1000
            })
            
            for (let x = 0; x < result.length; x++)
              {
                $('#content-table').append(`
                <tr>
                    <th scope="row">${x+1}</th>
                    <td>${result[x].name}</td> 
                    <td>${result[x].description}</td>
                    <td>${result[x].due_date}</td>
                    <td>${result[x].status}</td>
                    <td><button type="button" class="btn btn-secondary" onclick="deleteTodo()" >delete</button></td>
                </tr>
                `)
              }
        })
        .fail(err=>{
            console.log(err)
            Swal.fire({
                text:"error happened"
            })  
        })
    })
    .fail(err=>{
        console.log(err)
        Swal.fire({
            text:"error happened"
        })
    })

}


