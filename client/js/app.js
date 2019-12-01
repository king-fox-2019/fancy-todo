$(document).ready(function () {
  if (localStorage.getItem('access_token')) fetchTodos()
  else showSignin()
  $('#logo').click(function() {
    $('.all').hide();
    $('#main-todo').show();
  });

  $(".all").hide()
  // $(".navbar").show()
  $("#signin").show()
});