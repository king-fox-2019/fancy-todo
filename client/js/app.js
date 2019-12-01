$(document).ready(function () {
  if (localStorage.getItem('access_token')) {
    $("#uname").text(uname)
    $("#signin").hide()
    $("#register").hide()
    fetchTodos()
  } else {
    console.log('loh')
    showSignin()
  }
  $('#logo').click(function() {
    $('.all').hide();
    $('#main-todo').show();
  });

  
  // $(".all").hide()
  // $(".navbar").show()
  // $("#signin").show()

});