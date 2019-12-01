function register(){
    event.preventDefault()
    const data = {
        name : $("#name").val(),
        email : $("#email").val(),
        password : $("#password").val()
    }
    $.ajax({
        method : "POST",
        url : "http://localhost:3000/user/register",
        data
    })
        .done((response) => {
            localStorage.setItem("access_token",response.token)
            $("#register").hide()
            $("#home-page").show()
        })
        .fail((err) => {
            console.log(err)
        })
        .always()
}

function login(){
    event.preventDefault()
    const data = {
        email : $("#email-login").val(),
        password : $("#password-login").val()
    }
    $.ajax({
        method : "POST",
        url : "http://localhost:3000/user/login",
        data
    })
        .done((response) => {
            localStorage.setItem("access_token",response.token)
            toHomePage()
        })
        .fail((err) => {
            console.log(err)
        })
        .always()
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    const data = {
        id_token
    }
    $.ajax({
        method : "POST",
        url : "http://localhost:3000/user/glogin",
        data
    })
        .done((response)=>{
            localStorage.setItem("access_token",response.token)
            toHomePage()
        })
        .fail((err)=>{
            console.log(err)
        })
        .always()
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.clear()
      localStorage.removeItem("access_token")
      toRegisterPage()
    });
}