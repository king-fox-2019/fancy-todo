const baseURL = `http://localhost:3000`


$(document).ready(function () {
  islogin()
  // TEST()
  $('#btn-register').on('click', function (e) {
    e.preventDefault()
    getRegister()
  })

  $('#btn-login').on('click', function (e) {
    e.preventDefault()
    getLogin()
  })

  $('#btn-add-todo').on('click', function (e) {
    e.preventDefault()
    createToDo()
  })

  $('#btn-add-todoproject').on('click', function (e) {
    e.preventDefault()
    createToDoProject()
  })

  // $('#btn-create-project').on('click', function (e) {
  //   e.preventDefault()
  //   createProject1()
  // })

  $('.dropdown')
    .dropdown()
    ;



})



