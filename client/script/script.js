$(document).ready(function() {
  if(!localStorage.getItem('token')){
    $('.login').show()
    $('.register').hide()
    $('.home').hide()
  }else{
    $('.login').hide()
    $('.register').hide()
    $('.home').show()
  }
  getAllTodo()

  // $('#logout').click(function(){
  //     localStorage.removeItem('token')
  //     localStorage.removeItem('userId')
  //     location.reload()
  // })

  $('.form-signin').submit(signin)

  $('#register').click(function(){
    event.preventDefault()
    $('.login').hide()
    $('.register').show()
  })

  $("#addTask").click(function() {
    event.preventDefault();
    $("#addTodoModal").modal();
  })

  $('#submitTask').click(function(){
    addTodo()
  })
})