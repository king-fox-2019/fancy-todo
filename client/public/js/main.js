const baseUrl = "http://localhost:3000";

$(document).ready(function() {
  //form signin/signup
  if (localStorage.getItem("token")) {
    $(".all-page").show();
    $(".page-beforesignin").hide();
  } else {
    $(".all-page").hide();
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
});
