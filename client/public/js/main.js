const baseUrl = "http://localhost:3000";

$(document).ready(function() {
  //form signin/signup

  if (localStorage.getItem("token")) {
    // $("#user-nav-signin").empty();
    $("#todo-content").show();
    $(".all-page").show();
    $(".page-beforesignin").hide();
    $("#quote-page").empty();
    getQuote();
    getTodo();
    getProject();
    getInvitation();
  } else {
    $(".all-page").hide();
    $(".project-content").hide();
    $(".page-beforesignin").show();
  }
  $("#btn-go-signin").click(function() {
    renderModalSignin();
  });
  $("#btn-go-signup").click(function() {
    renderModalSignup();
  });
  $("#btn-signup").submit(function(event) {
    event.preventDefault();
    signUp();
  });
  $("#btn-signin").submit(function(event) {
    event.preventDefault();
    signIn();
  });
  $("#btn-signout").click(function() {
    signOut();
  });
  //form end
  //todo
  $("#btn-go-create-todo").click(function() {
    renderModalCreateTodo();
  });
  $("#btn-create-todo").submit(function(event) {
    event.preventDefault();
    createTodo();
  });
  //todo end
  //project
  $("#btn-go-create-project").click(function() {
    renderModalCreateProject();
  });
  $("#btn-create-project").submit(function(event) {
    event.preventDefault();
    createProject();
  });
  //end project
  //menu side
  $("#btn-listtodo").click(function() {
    getTodo();
    $("#todo-content").show();
    $(".project-content").hide();
  });
  //end menu side
});
