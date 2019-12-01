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
        })
        .fail((err)=>{
            console.log(err)
        })
        .always()
}