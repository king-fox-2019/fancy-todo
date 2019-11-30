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
  $("#btn-backsignin").click(function() {
    renderModalSignin();
  });
  $("#btn-signup").click(function(event) {
    signUp(event);
  });
  $("#btn-signin").click(function(event) {
    signIn(event);
  });
  $("#btn-signout").click(function() {
    signOut();
  });
  $("#sign-check").click(function() {
    checked();
  });
  //end
});
