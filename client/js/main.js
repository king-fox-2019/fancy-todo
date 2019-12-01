const baseURL = "http://localhost:3000";

$(document).ready(function() {
  islogin()

  $("#btn-register").on("click", function(e) {
    e.preventDefault();
    getRegister();
  });

  $('#btn-login').on('click', function (e) {
    e.preventDefault()
    getLogin()
  })

  $('#btn-add').on('click', function (e) {
    e.preventDefault()
    addtodos()
  })

  $('#createTodo').on('click', function (e) {
    e.preventDefault()
    createTodo()
  })
});

function createTodo() {
  let name = $("#title").val();
  let description = $("#description").val();
  let due_date = $("#dueDate").val();

  $.ajax({
    url: `${baseURL}/todo`,
    method: `post`,
    data: {
      name,
      description,
      due_date
    },
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(() => {
      islogin()
    })
    .fail(err => {
    
    })
    .always(() => {
      $("#title").val("");
      $("#description").val("");
      $("#dueDate").val("");
    });
}

function islogin() {
  if (localStorage.getItem("token")) {
    $("#notlogin").hide();
    $("#home").show();
    $("#addtodo").hide();
    populateTodo()
  } else {
    $("#notlogin").show();
    $("#home").hide();
    $("#addtodo").hide();
  }
}

function populateTodo(){
  $.ajax({
    url: `${baseURL}/todo`,
    method: `get`,
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(( todos ) => {
      let rawHtml = ''
      todos.forEach(todo => {

        rawHtml += `
        <li>
          <span class="text">${todo.name}</span>
          <small class="label label-danger">
            <i class="fa fa-clock-o"></i> ${todo.description}
          </small>
          <small class="label label-danger">
            <i class="fa fa-clock-o"></i> ${todo.due_date}
          </small>
          <div class="tools">
            <i class="fa fa-check"></i>
            <i class="fa fa-trash-o"></i>
          </div>
        </li>
        `
      })
      $('#listTodo').html(rawHtml)
    })
    .fail(err => {
    
    })
}

function addtodos() {
  $("#notlogin").hide();
  $("#home").hide();
  $("#addtodo").show();
}
