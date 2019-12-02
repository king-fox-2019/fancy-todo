"use strict"
$('#inner-html').hide()

$(document).ready(function () {
    $(window).bind('unload', function () {
        localStorage.clear()
    })
    console.log('masuk')

    if (localStorage.getItem('token')) {
        $('.form').hide()
        $('#inner-html').show()
    }
    changeForm()

    // getRegister()
    $('.register-form').submit(function (e) {

        e.preventDefault();

        $.ajax({
            method: "post",
            url: `http://localhost:3000/user/register`,
            data: {
                username: $('.username_register').val(),
                email: $('.email_register').val(),
                password: $('.password_register').val()
            }
        })
            .done((data) => {
                // console.log(data);
                // askLogin(data.username)
                localStorage.setItem('token', data.token)
                $(`.form`).hide()
                $('#inner-html').show()
                inner()
            })
            .fail((data) => {
                console.log(data);
                Swal.fire(data.responseJSON.message)
            })
    });

    // getLogin()
    $('.login-form').submit(function (e) {

        e.preventDefault();

        $.ajax({
            method: "post",
            url: `http://localhost:3000/user/login`,
            data: {
                email: $('.email_login').val(),
                password: $('.password_login').val()
            },
            success: function (data) {
                console.log('Submission was successful.');
                // console.log(data);
                localStorage.setItem('token', data.token)
                $(`.form`).hide()
                $('#inner-html').show()
                inner()
            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
                Swal.fire(data.responseJSON.message)
            },
        })
    });


    // pages

});

function inner() {
    $.ajax({
        url: `http://localhost:3000/todo`,
        method: "get",
        headers: {
            id_token: localStorage.getItem('token')
        }
    })

        .done((data) => {
            data.forEach(element => {
                $('#inner-html').append(`
                <h2>hello</h2>
                <div>
                <p>${element.name}</p>
                <p>${element.description}</p>
                <p>${element.due_date}</p>
                <p>${element.status}</p>
                </div>
                `)
            });
        })
        .fail()
        .always() 
}

function changeForm() {
    $('.sign-btn').on('click', function () {
        $('.form').each(function () {
            if ($(this).hasClass('hidden')) {
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
            // console.log('hallo');
        })
    })
}
 
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/user/google-signin',
        data: {
            id_token: id_token
        }
    })
        .done(userCredentials => {
            localStorage.setItem('token', userCredentials)
            console.log(userCredentials)
            // $('#loginModal').modal('hide')
            // $('#sign-in').hide()
            $(`.form`).hide()
            $('#inner-html').show()
            inner()
        });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        $(`.form`).show()
        $('#inner-html').hide()
        localStorage.clear()
    });
}
