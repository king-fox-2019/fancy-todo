'use strict';
const BASE_URL = 'http://localhost:3000'

$(document).ready(function(){
    console.log('ready')
    if(!localStorage.token) {
        $('#staticBackdrop').modal({backdrop:'static',keyboard:false, show:true});
        $('#logout-button').hide();
        $('#staticBackdrop').modal('show')
        $('#page-content').hide()
    }
    if(localStorage.token) {
        fetchData()
        $('#page-content').show()
    }
    $('#login-button').hide()
    $('#staticBackdrop').modal('hide')
    $('#signin-button').click(function(e){
        e.preventDefault()
        loginUserCredentials()
    })
    $('#logout-button').click(function(e){
        e.preventDefault();
        signOut()
    })
    $('#register-button').click(function(e){
        e.preventDefault();
        registerUser()
    })
    $('#add-todo').click(function(e){
        e.preventDefault();
        addTodo();
    })
    
})

function addTodo() {
    let name = $('#title-todo').val();
    let description = $('#inputDesc').val();
    let due_date = $('#inputDate').val();
    let token = localStorage.getItem('token')
    $.ajax({
        method: 'post',
        url: `${BASE_URL}/todo`,
        data: {
            name,
            description,
            due_date,
            token
        }
    })
        .done(result=> {
            $('#new-todo').empty().append(`
            <div class="card" id="element-${result._id}">
                <div class="card-header">
                    ${result.name} <span id="success-${result._id}"></span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${result.description}</h5>
                    <p class="card-text">Due Date: ${result.due_date}</p>
                    <a href="#" class="btn btn-primary" id="todo-${result._id}-done">Mark as done</a>
                    <a href="#" class="btn btn-primary" id="todo-${result._id}">Delete</a>
                </div>
            </div>
            `)
            $(`#todo-${result._id}-done`).click( { id: result._id, owner: result.userId._id }, markAsDone )
            $(`#todo-${result._id}`).click({ id: result._id }, removeTodo)
        })
        .fail(err=> {
            console.log(err)
        })
        .always()
}

function removeTodo(e) {
    e.preventDefault()
    let { id } = e.data
    const token = localStorage.getItem('token');
    $.ajax({
        method: 'delete',
        url: `${BASE_URL}/todo`,
        data: {
            id: id,
            token: token
        }
    })
        .done(success=> {
            swal({
                title: "Success",
                text: 'Todo deleted!'
            })
            $(`#element-${id}`).remove()
        })
        .fail(err=> {
            console.log(err)
        })
        .always()

}

function markAsDone(e) {
    e.preventDefault();
    const { id, owner } = e.data
    let validator = localStorage.getItem('token')
    $.ajax({
        method: 'patch',
        url: `${BASE_URL}/todo`,
        data: {
            id: id,
            userId: owner,
            token: validator
        }
    })
        .done(result=> {
            $(`#success-${id}`).append(`
            <span class="badge badge-success">Success</span>
            `)
            $(`#todo-${id}-done`).hide()
        })
        .fail(err=>{
            console.log(err)
        })
        .always()
}
function fetchData() {
    $.ajax({
        method: 'get',
        url: `${BASE_URL}/todo`,
        data: {
            token: localStorage.getItem('token')
        }
    })
        .done(todos=> {
            $('#todos').empty()
            todos.forEach(todo => {
                if(!todo.status) {
                    $('#todos').append(`
                    <div class="card" id="element-${todo._id}">
                    <div class="card-header">
                        ${todo.name} <span id="success-${todo._id}"></span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${todo.description}</h5>
                        <p class="card-text">Due Date: ${todo.due_date}</p>
                        <a href="#" class="btn btn-primary" id="todo-${todo._id}-done">Mark as done</a>
                        <a href="#" class="btn btn-primary" id="todo-${todo._id}">Delete</a>
                    </div>
                    </div>
                    `)
                    $(`#todo-${todo._id}-done`).click( { id: todo._id, owner: todo.userId._id }, markAsDone )
                    $(`#todo-${todo._id}`).click({ id: todo._id }, removeTodo)
                } else {
                    $('#todos').append(`
                    <div class="card" id="element-${todo._id}">
                    <div class="card-header">
                        ${todo.name} <span id="success-${todo._id}"><span class="badge badge-success">Success</span></span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${todo.description}</h5>
                        <p class="card-text"><em>Due Date: ${todo.due_date}</em></p>
                        <a href="#" class="btn btn-primary" id="todo-${todo._id}">Delete</a>
                    </div>
                    </div>
                    `)
                    $(`#todo-${todo._id}`).click({ id: todo._id }, removeTodo)
                }
            });
            
        })
        .fail(err=>{
            console.log(err)
        })
        .always()
}

function registerUser(){
    let userData = {
        name: $('#NameRegister').val(),
        email: $('#EmailRegister').val(),
        password: $('#PasswordRegister').val()
    }
    $.ajax({
        method: 'post',
        url: `${BASE_URL}/user`,
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password
        }
    })
        .done(userData=> {
            swal({
                title: 'Register Success',
                text: 'Register success, please login to access Fancy To-Do'
            })
        })
        .fail(err=> {
            swal({
                title: `Status: ${err.responseJSON.code}`,
                text: `${err.responseJSON.message}`
            })
        })
        .always()
}

function loginUserCredentials(){
    const email = $('#Email').val();
    const password = $('#Password').val();
    $.ajax({
        method: 'post',
        url: `${BASE_URL}/user/login`,
        data: {
            email,
            password
        }
    })
        .done(accessToken=> {
            localStorage.setItem('token', accessToken)
            fetchData()
            $('#staticBackdrop').modal('hide')
            $('#page-content').show()
            $('#logout-button').show();
            $('#login-button').hide()

        })
        .fail(err=> {
            swal({
                title: 'Error',
                text: `${err.responseJSON}`
            })
        })
        .always();
}

function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.removeItem('token');
    $('#staticBackdrop').modal('show')
    $('#logout-button').hide();
    $('#page-content').hide()
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'post',
        url: `${BASE_URL}/user/login-google`,
        data: {
            idToken: id_token
        }
    })
        .done(token=> {
            localStorage.setItem('token', token)
            fetchData()
            $('#staticBackdrop').modal('hide')
            $('#logout-button').show();
            $('#login-button').hide()
            $('#page-content').show()
        })
        .fail(err=> {
            console.log(err)
        })
        .always()
  }