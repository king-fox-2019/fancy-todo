const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

function toDoList() {
  $.ajax({
    method: 'get',
    url: `${baseURL}/todo`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done((response) => {
      getTodo(response)
    })
    .fail(err => {
      console.log(err);
    })
}

function getTodo(todos) {
  $(`#todo`).empty()
  if (!todos.length) {
    $('#todo').append(`<h4>You have an empty list!</h4>`)
  } else {
    todos.forEach(todo => {
      let date = new Date()
      if (todo.dueDate) date = convertDate(todo.dueDate)
      else date = convertDate(new Date().setDate(new Date().getDate() + 1))
      let { title, description, action } = getStatus(todo.status, todo.title, todo.description, todo._id)
      // console.log(convertDate(todo.createdAt))
      $(`#todo`).append(`
          <div class="item" style="padding: 15px ;">
              <i class="large calendar check outline  middle aligned icon ${(todo.status) ? "yellow" : "grey"}"></i>
              <div class="content">      
              <div class='head-todo'>
                  ${title}
                  <p class="date"><strong>Due:</strong> ${convertDate(date)}</p>
              </div>         
                  <div class="description" style="font-size: 11px; word-break: break-all;">${description}</div>
                  <div class="todo-link">
                      <a data-tooltip="change status list" ><span id="${todo._id}" style="color:#008080;  font-size:12px;">${!todo.status ? "undone" : "done"}</span></a>
                      <div>
                        <span>
                        ${action}
                        <a onclick="deleteTodo('${todo._id}')" data-tooltip="delete list">
                          <i class="trash alternate outline icon delete-todo" style="color:#A0A0A0"></i>
                        </a>
                        </span>
                      </div>
                  </div>
              </div>
          </div>
      `)

      //HOVER EFFECT
      $(`#${todo._id}`).hover(() => {
        if (!todo.status) $(`#${todo._id}`).html("done")
        else $(`#${todo._id}`).html("undone")
      }, () => {
        if (!todo.status) $(`#${todo._id}`).html("undone")
        else $(`#${todo._id}`).html("done")
      })

      //CHANGE STATUS AJAX
      $(`#${todo._id}`).on('click', () => {
        !todo.status ? todo.status = true : todo.status = false
        $.ajax({
          method: 'patch',
          url: `http://localhost:3000/todo/${todo._id}`,
          data: {
            status: todo.status
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .done(updated => {
            getTodo(todos)
          })
          .fail(err => {
            console.log(err)
          })
      })
    });
  }
}



function createToDo() {
  let title = $('#titletodo').val()
  let description = $('#descriptiontodo').val()
  let dueDate = $('#duedatetodo').val()
  Swal.showLoading();

  $.ajax({
    url: `${baseURL}/todo`,
    method: `post`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      title, description, dueDate
    }
  })
    .done(({ data }) => {
      // $('.ui.modal')
      //   .modal('hide')
      //   ;
      $(".test").modal('hide');

      Swal.close()
      Swal.fire('Success!', "Your Todo is Created!", 'success')
      toDoList()
    })
    .fail(err => {
      let error = err.responseJSON
      Swal.fire("Error!", `${error.message}`, "error");
    })
    .always(() => {
      $('#titletodo').val('')
      $('#descriptiontodo').val('')
      $('#duedatetodo').val('')
    })
}

function showmodalupdate(id) {
  $('#duedate1').calendar({
    type: 'date',
    monthFirst: false,
    formatter: {
      date: function (date, settings) {
        if (!date) return '';
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return year + '-' + month + '-' + day;
      }
    }
  });
  $.ajax({
    url: `${baseURL}/todo/${id}`,
    method: "GET",
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      $('#updatetitletodo').val(`${data.title}`);
      $('#updatedescriptiontodo').val(`${data.description}`);
      $('#updateduedatetodo').val(`${data.dueDate ? data.dueDate.split("T")[0] : ''}`);
      $("#updateTodo").modal('show')
      console.log(data._id);
      let dataid = data._id
      $('#btn-update-todo').on('click', function (e, dataid) {
        e.preventDefault()
        editTodo(id)
      })
    })
}

function editTodo(id) {
  $.ajax({
    method: 'patch',
    url: `${baseURL}/todo/${id}`,
    data: {
      title: $('#updatetitletodo').val(),
      description: $('#updatedescriptiontodo').val(),
      dueDate: $('#updateduedatetodo').val()
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(_ => {
      $('#titletodo').val(``);
      $('#descriptiontodo').val(``);
      $('#duedatetodo').val(``);
      $("#updateTodo").modal('hide');
      $('#todo').empty()
      toDoList()
      Toast.fire({
        icon: 'success',
        title: 'task updated!'
      })
      // swal.fire('success')

    })
    .fail(err => {
      console.log(err);
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })


  // html
  // return { value: formValues } = Swal.fire({
  //   title: 'Edit your TODO',
  //   html: `
  //     <label>Title</label>
  //     <input id="title" class="swal2-input" value="${data.title}">
  //     <label>Description</label>
  //     <input id="description" class="swal2-input" value="${data.description}">`,
  //   focusConfirm: false,
  //   preConfirm: () => {
  //     return {
  //       title: $('#title').val(),
  //       description: $('#description').val(),
  //     }
  //   }
  // })

}

function deleteTodo(id) {
  console.log(id)
  swal.fire({
    title: 'Are you sure to Delete?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#fdcf0f',
    cancelButtonColor: '#000',
    confirmButtonText: 'Yes, delete it!'
  })
    .then(result => {
      if (result.value) {
        return $.ajax({
          method: 'delete',
          url: `${baseURL}/todo/${id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
      } else {
        throw { message: 'canceled' }
      }
    })
    .then(() => {
      Toast.fire({
        icon: 'success',
        title: 'Task deleted!'
      })
      $('#todo').empty()
      toDoList()
    })
    .catch(err => {
      Toast.fire({
        title: `${err.message}`,
      })
    })
}

function updatedStatus(id) {
  swal.fire({
    title: 'Are you sure to Change Status?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Change it!'
  })
    .then(result => {
      if (result.value) {
        return $.ajax({
          method: 'put',
          url: `${baseURL}/todo/${id}`,
          data: { status: true },
          headers: {
            token: localStorage.getItem('token')
          }
        })
      } else {
        throw { message: 'canceled' }
      }
    })
    .then(() => {
      Swal.fire(
        'Updated!',
        'Your Todo Status Updated',
        'success'
      )
      $('#todo').empty()
      toDoList()
    })
    .catch(err => {
      swal.fire({
        title: `${err.message}`,
      })
    })
}

$(function () {
  $("#showmodal").click(function () {
    $(".test").modal('show');
  });

  $(".test").modal('hide');


  $('#duedate').calendar({
    type: 'date',
    monthFirst: false,
    formatter: {
      date: function (date, settings) {
        if (!date) return '';
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return year + '-' + month + '-' + day;
      }
    }
  });
})


function convertDate(date) {
  return moment(date).format('D MMM Y')
}

function getStatus(status, title, description, id) {
  if (status) return {
    title: `<p class="header" style="color: grey;">${title}</p>`,
    description: `<strike>${description}</strike>`,
    action: ``
  }
  else return {
    title: `<p class="header" >${title}</p>`,
    description,
    action: `
    <a onclick="showmodalupdate('${id}')" data-tooltip="edit list" id="showmodalupdate">
      <i class="pencil alternate icon delete-todo" style="color:#A0A0A0"></i>
    </a>
    `
  }
}
