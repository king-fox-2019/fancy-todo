$( document ).ready(function() {
    console.log( "ready!" );
});

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method : "POST",
        url : "http://localhost:3000/user/login",
    })
}