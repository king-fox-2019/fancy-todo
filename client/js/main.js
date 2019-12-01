$( document ).ready(function() {
    console.log( "ready!" );
    $("#register").show()
    $("#home-page").hide()
    if(localStorage.getItem("access_token")){
        $("#register").hide()
        $("#home-page").show()
        getAllTodo()
    }
});
