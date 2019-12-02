const url_server = "http://localhost:3000";
const api_user = "/api/user";
const api_todo = "/api/todo";
let isLogin = false;

$(document).ready(function () {
    if (localStorage.token) {
        isLogin = true;
        $('#form-login').hide();
        $('main').show();
        $('#profile-email').html(localStorage.email);
        listTodo();
    } else {
        $('#form-login').show();
        $('main').hide();
    }

    $('#form-login').submit(function (event) {
        login(
            $('#userName').val(),
            $('#password').val()
        );
        event.preventDefault();
    });

    $('#signout').click(function () {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            localStorage.clear();
            isLogin = false;
            window.location.replace('http://localhost:8080');
        });
    })

    $('#newTask').click(function () {
        newTaskShow('show');
    });

    $('#newTask-cancel').click(function () {
        newTaskShow('hide');
    });

});

function newTaskShow(command) {
    if (command === 'show'){
        $('#newTask-container').show();
    } else {
        $('#newTask-container').hide();
    }
}

function login(username, password) {
    $.ajax({
        type: 'POST',
        url: url_server + api_user + '/login',
        data: {
            userName: username,
            password: password
        }
    }).done(data => {
        localStorage.token = data.token;
        localStorage.email = data.email;
        window.location.replace('http://localhost:8080');
    }).fail(err => {
        console.log(err);
        $('#login-message').html(err.responseJSON.message);
    })
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile()
    let email = profile.getEmail();
    let userName = email.split("@")[0];

    $.ajax({
        type: 'POST',
        url: url_server + api_user + '/oauth2/google',
        data: {
            userName: userName,
            email: email
        }
    }).done(data => {
        localStorage.token = data.token;
        localStorage.email = data.email;
        if (!isLogin) window.location.replace('http://localhost:8080');
    }).fail(err => {
        console.log(err);
    })

    // let id_token = googleUser.getAuthResponse().id_token;
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function listTodo() {
    $.ajax({
        type: 'GET',
        url: url_server + api_todo + "/",
        headers: {
            token: localStorage.token
        }
    }).done(todo => {
        todo.data.forEach(e => {
            $('card').append(`
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${e.name}</h5>
                    <p class="card-text">${e.description}</p>
                    <div>
                        <i class='fa fa-bell-o'></i>
                        <small><code>${e.due_date}</code></small>
                    </div>
                </div>
            </div>
            `)
        })
    }).fail(err => {
        console.log(err);
    })
}