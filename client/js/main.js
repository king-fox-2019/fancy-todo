$( document ).ready(function() {
    console.log( "ready!" );
    $('[data-toggle="offcanvas"]').click(function () {
        $('.fixed-nav-inner').toggleClass('open-nav')
    });
    $("#login-page").hide()
    $("#register-page").show()
    $("#home-page").hide()
    $("#sidebar").hide()
    if(localStorage.getItem("access_token")){
        $("#register-page").hide()
        $("#login-page").hide()
        getAllTodo()
        $("#home-page").show()
        $("#sidebar").show()
    }
});

function toRegisterPage(){
    event.preventDefault()
    $("#login-page").hide()
    $("#register-page").show()
    $("#home-page").hide()
    $("#sidebar").hide()
}

function toLoginPage(e){
    e.preventDefault()
    $("#login-page").show()
    $("#register-page").hide()
    $("#home-page").hide()
    $("#sidebar").hide()
}

function toHomePage(){
    $("#register-page").hide()
    $("#login-page").hide()
    $("#home-page").show()
    getAllTodo()
    $("#sidebar").show()
}