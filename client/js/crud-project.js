function displayProjectsPage(event) {
  event.preventDefault()
  $('#project-create').show()
  $('#project-container').show()
  getProjects()

  $('#notifications').hide()
  $('#registration-form').hide()
  $('#todo-container').hide()
  $('#signin-form').hide()
  $('#todo-input').hide()
  $('#todo-input-update').hide()
  $('.squiggly-home').hide()
}

function createProject(event) {
  event.preventDefault()
  if ($('#project-add-name').val().length < 1) {
    Swal.fire('Oops..', 'Input cannot be empty!')
    return
  }

  $.ajax({
    method: 'post',
    url: baseUrl + '/projects',
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      name: $('#project-add-name').val()
    }
  })
    .done(function (response) {
      $('#project-add-name').val('')
      $('#collapse-add-project').removeClass('show')
      Swal.fire('Success', response.message)
      getProjects()
    })
    .fail(err => {
      console.log('error when creating a project', err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function inviteProjectMember(event) {
  event.preventDefault()
  // console.log('project id pas invite', event.target.id)
  // console.log('email member yg mau diinvite', $(`#project-${event.target.id}-invite`).val())
  if ($(`#project-${event.target.id}-invite`).val().length < 1) {
    Swal.fire('Oops..', 'Input cannot be empty!')
    return
  } else if (!$(`#project-${event.target.id}-invite`).val().includes('@') && !$(`#project-${event.target.id}-invite`).val().includes('.')) {
    Swal.fire('Oops..', 'Please input a valid email address!')
    return
  }

  $.ajax({
    method: 'post',
    url: baseUrl + '/projects/' + event.target.id + '/invite-member',
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      memberEmail: $(`#project-${event.target.id}-invite`).val()
    }
  })
    .done(function (response) {
      Swal.fire('Success', response.message)
      $('.modal-backdrop').remove()
      getProjects()
    })
    .fail(err => {
      console.log('error when inviting a project member', err)
      Swal.fire('Oops..', err.responseJSON.messages[0])
    })
}

function deleteProject(event) {
  // console.log('ini event target id pas deleteProject', event.target.id);
  $.ajax({
    method: 'delete',
    url: baseUrl + '/projects/' + event.target.id,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
  })
    .done(function (response) {
      Swal.fire('Success', response.message)
      $('.modal-content').remove()
      $('.modal-backdrop').remove()
      getProjects()
    })
    .fail(err => {
      console.log('error when deleting a project', err)
      Swal.fire('Oops..', err.responseJSON.messages[0])
    })
}

function showDeleteProjectAlert(event) {
  const targetId = event.currentTarget.id.split('_')
  // console.log('ini targetId pas showDeleteProjectAlert', event.currentTarget.id)
  const projectId = targetId[0]
  event.preventDefault()
  $('#modal-container').html(renderDeleteProjectAlert(projectId))
  $(`#${projectId}_delete-project-alert`).modal('show')
}

function showRemoveProjectMemberAlert(event) {
  const targetId = event.currentTarget.id.split('_')
  // console.log('ini targetId pas showDeleteProjectAlert', event.currentTarget.id)
  const projectId = targetId[0]
  const memberId = targetId[1]
  event.preventDefault()
  $('#modal-container').html(renderRemoveProjectMemberAlert(event))
  $(`#${projectId}_${memberId}_remove-project-membert-alert`).modal('show')
}

function getProjects() {
  $('#project-container').hide()
  $('#project-items').show()

  return $.ajax({
    url: baseUrl + '/projects/user',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function (projects) {
      // console.log('ini response dari getProjects', projects);
      $('#project-items').empty()

      projects.forEach(project => {
        $('#project-container').show()
        $('#project-items').append(renderProject(project))
        $(`#card-body-${project._id}`).append(renderProjectTodoTable(project))

        fetchCurrentUserData()
          .done(function (user) {
            // console.log('ini email user yang di fetch', user.email)
            // console.log('ini project-nya', project.owner.email)
            
            if (user.email === project.owner.email) {
              // console.log('user.email === project.owner.email');
              // $(`${project._id}_delete-container`).empty()
              $(`#${project._id}_delete-container`).html(renderDeleteProjectButton(project))
            }
          })
          .fail(err => {
            console.log('error when fetching a user', err)
            // Swal.fire('Oops..', 'Something went wrong.')
          })
        project.todos.forEach((todo, index) => {
          let params = { index: index + 1, ...todo }
          // console.log($(`#project-${project._id}-todo-items`));
          $(`#project-${project._id}-todo-items`).append(renderProjectTodoList(params))
        })
        
        $(function () {
          var dtToday = new Date();

          var month = dtToday.getMonth() + 1;
          var day = dtToday.getDate();
          var year = dtToday.getFullYear();
          if (month < 10)
            month = '0' + month.toString();
          if (day < 10)
            day = '0' + day.toString();

          var maxDate = year + '-' + month + '-' + day;
          // $('#todo-input-datepicker').attr('min', maxDate);
          $('#todo-update-datepicker').attr('min', maxDate);
          $('.datepicker').attr('min', maxDate);
        })

        $('.collapse').on('show.bs.collapse', function(e) {
          // console.log('this pas collapse show', this);
          var $card = $(this).closest('.card');
          var $open = $($(this).data('parent')).find('.collapse.show');
        
          var additionalOffset = 0;
          if($card.prevAll().filter($open.closest('.card')).length !== 0)
          {
                additionalOffset =  $open.height();
          }
          $('html,body').animate({
            scrollTop: $card.offset().top - additionalOffset
          }, 500);
        })
      })
    })
    .fail(err => {
      console.log('Error when getting projects', err.statusText)
      Swal.fire('Oops..', err.statusText)
    })
}

function getProjectsAfterUpdate(showProjectId) {
  $('#project-container').hide()
  // console.log('ini url get projects', );
  return $.ajax({
    url: baseUrl + '/projects/user',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function (projects) {
      // console.log('ini response dari getProjects', projects);
      $('#project-items').empty()

      projects.forEach(project => {
        $('#project-container').show()
        $('#project-items').append(renderProject(project))
        $(`#collapse${showProjectId}`).addClass('show')
        $(`#card-body-${project._id}`).append(renderProjectTodoTable(project))

        project.todos.forEach((todo, index) => {
          let params = { index: index + 1, ...todo }
          // console.log($(`#project-${project._id}-todo-items`));
          $(`#project-${project._id}-todo-items`).append(renderProjectTodoList(params));
        })
      })

      $('.collapse').on('show.bs.collapse', function(e) {
        console.log('this pas collapse show', this);
        
        var $card = $(this).closest('.card');
        var $open = $($(this).data('parent')).find('.collapse.show');
      
        var additionalOffset = 0;
        if($card.prevAll().filter($open.closest('.card')).length !== 0)
        {
              additionalOffset =  $open.height();
        }
        $('html,body').animate({
          scrollTop: $card.offset().top - additionalOffset
        }, 500);
      })
    })
    .fail(err => {
      console.log('Error when getting projects', err.statusText)
      Swal.fire('Oops..', err.statusText)
    })
}

function fetchCurrentUserData() {
  return $.ajax({
    method: 'get',
    url: baseUrl + '/users',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
}

function removeProjectMember(event) {
  const targetId = event.target.id.split('_')
  const projectId = targetId[0]
  const memberId = targetId[1]
  $.ajax({
    method: 'patch',
    url: baseUrl + '/projects/' + projectId + '/remove/' + memberId,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
  })
    .done(function (response) {
      Swal.fire('Success', response.message)
      $('.modal-content').remove()
      $('.modal-backdrop').remove()
      getProjects()
    })
    .fail(err => {
      console.log('error when deleting a project', err)
      Swal.fire('Oops..', err.responseJSON.messages[0])
    })
}

// TODOS

function createTodoProject(event) {
  event.preventDefault()

  if ($(`#project-todo_${event.target.id}_add-title`).val().length < 1 ||
    $(`#project-todo_${event.target.id}_add-description`).val().length < 1 ||
    $(`#project-todo_${event.target.id}_add-date`).val().length < 1) {
    Swal.fire('Oops..', 'All fields must be filled!')
    return
  }

  if (new Date($(`#project-todo_${event.target.id}_add-date`).val()) < today) {
    Swal.fire('Oops..', 'The due date can\'t be before today!')
    return
  }

  $.ajax({
    url: `${baseUrl}/projects/${event.target.id}/todo`,
    method: 'post',
    data: {
      title: $(`#project-todo_${event.target.id}_add-title`).val(),
      description: $(`#project-todo_${event.target.id}_add-description`).val(),
      dueDate: $(`#project-todo_${event.target.id}_add-date`).val(),

    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (response) {
      console.log('project todo created', response)
      $('.modal-backdrop').remove()
      getProjectsAfterUpdate(response.project._id)
    })
    .fail(err => {
      console.log('error when creating a task', err)
      Swal.fire('Oops..', err.responseJSON.messages[0])
    })
}

function completeTodoProject(event) {
  event.preventDefault()
  const targetId = event.target.id.split('_')
  const projectId = targetId[0]
  const todoId = targetId[1]

  $.ajax({
    url: `${baseUrl}/projects/${projectId}/todo/${todoId}/complete`,
    method: 'patch',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (response) {
      // console.log(response);
      $('.modal-backdrop').remove()
      getProjectsAfterUpdate(projectId)
    })
    .fail(err => {
      console.log('error when completing a task', err)
      Swal.fire('Oops..', err.responseJSON.messages[0])
    })
}

function updateImportanceTodoProject(event) {
  event.preventDefault()
  const targetId = event.target.id.split('_')
  const projectId = targetId[0]
  const todoId = targetId[1]

  $.ajax({
    url: `${baseUrl}/projects/${projectId}/todo/${todoId}/important`,
    method: 'patch',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (response) {
      // console.log(response);
      $('.modal-backdrop').remove()
      getProjectsAfterUpdate(projectId)
    })
    .fail(err => {
      console.log('error when marking a task as important', err)
      Swal.fire('Oops..', err.responseJSON.messages[0])
    })
}

function deleteTodoProject(event) {
  event.preventDefault()
  const targetId = event.target.id.split('_')
  const projectId = targetId[0]
  const todoId = targetId[1]

  $.ajax({
    url: `${baseUrl}/projects/${projectId}/todo/${todoId}`,
    method: 'delete',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (response) {
      // console.log(response);
      $('.modal-backdrop').remove()
      getProjectsAfterUpdate(projectId)
    })
    .fail(err => {
      console.log('error when marking a task as important', err)
      Swal.fire('Oops..', err.responseJSON.messages[0])
    })
}

function findTodoProject(projectId, todoId) {
  // console.log('ini todoId pas findTodo', todoId)
  return $.ajax({
    url: `${baseUrl}/projects/${projectId}/todo/${todoId}`,
    method: 'get',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
}

function showUpdateTaskForm(event) {
  const targetId = event.target.id.split('_')
  const projectId = targetId[0]
  const todoId = targetId[1]

  findTodoProject(projectId, todoId)
    .done(todo => {
      console.log('todo found for update', todo)
      $('#modal-container').html(renderUpdateTaskForm(todo))
      $(`#project_${projectId}_todo_${todoId}_update-task-form`).modal('show')
      $(function () {
        var dtToday = new Date();

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if (month < 10)
          month = '0' + month.toString();
        if (day < 10)
          day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        // $('#todo-input-datepicker').attr('min', maxDate);
        $('#todo-update-datepicker').attr('min', maxDate);
        $('.datepicker').attr('min', maxDate);
      })
    })
    .fail(err => {
      console.log('error when showing update task form', err)
    })
}

function updateTodoProject(event) {
  event.preventDefault()
  const targetId = event.target.id.split('_')
  const projectId = targetId[0]
  const todoId = targetId[1]

  if ($(`#${projectId}_${todoId}_title`).val().length < 1 ||
    $(`#${projectId}_${todoId}_description`).val().length < 1 ||
    $(`#${projectId}_${todoId}_due-date`).val().length < 1) {
    Swal.fire('Oops..', 'All fields must be filled!')
    return
  }

  if (new Date($(`#${projectId}_${todoId}_due-date`).val()) < today) {
    Swal.fire('Oops..', 'The due date can\'t be before today!')
    return
  }

  $.ajax({
    url: `${baseUrl}/projects/${projectId}/todo/${todoId}`,
    method: 'put',
    data: {
      title: $(`#${projectId}_${todoId}_title`).val(),
      description: $(`#${projectId}_${todoId}_description`).val(),
      dueDate: $(`#${projectId}_${todoId}_due-date`).val()
    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (response) {
      $(`#project_${projectId}_todo_${todoId}_update-task-form`).modal('hide')
      $('.modal-backdrop').remove()
      getProjectsAfterUpdate(projectId)
      $(function () {
        var dtToday = new Date();

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if (month < 10)
          month = '0' + month.toString();
        if (day < 10)
          day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        // $('#todo-input-datepicker').attr('min', maxDate);
        $('#todo-update-datepicker').attr('min', maxDate);
        $('.datepicker').attr('min', maxDate);
      })
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

// RENDERINGS

function renderProject(project) {
  let memberNames = []

  project.members.forEach(member => {
    memberNames.push(`${member.name} (${member.email})`)
  })

  let table = renderMemberList(memberNames, project)

  // console.log('ini table member pas render project', table);

  let rendering =
    `
    <div class="modal fade" id="project_${project._id}_invite-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Invite a member</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="col my-3">
            <input type="email" class="text-center form-control" id="project-${project._id}-invite" placeholder="Email" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
          <button id="${project._id}" type="submit" class="inside btn-dark btn" onclick="inviteProjectMember(event)">Submit</button>
        </div>
      </div>
    </div>
  </div>

  <div 
    class="modal fade" 
    id="project_${project._id}_add-task-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            Add a new task
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form>
          <div class="modal-body">
            <div class="col my-3">
              <input type="text" class="text-center form-control" id="project-todo_${project._id}_add-title" placeholder="Title" required>
            </div>

            <div class="col my-3">
              <input type="text" class="text-center form-control" id="project-todo_${project._id}_add-description" placeholder="Description"
                required>
            </div>

              <div id="date-form" class="col my-3">
                <div class="col text-center">
                  Due date:
                </div>
                <input id="project-todo_${project._id}_add-date" type="date" class="datepicker text-center pl-5 form-control">
              </div>

            <div class=" text-center submit-button mt-4 mb-3">
              <button id="${project._id}" type="submit" class="inside btn-dark btn" onclick="createTodoProject(event)">Submit</button>
              <br>
            </div>

            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
            </div>
          </form>
      </div>
    </div>
  </div>

  <div class="project-item container">
    <div id="accordion">
      <div class="card">
        <div onclick="location.href='#';" style="cursor: pointer;" class="card-header bg-dark"
          data-toggle="collapse" data-target="#collapse${project._id}" id="heading${project._id}">
          <h5 class="text-center mb-0">
            <button 
              class=" btn btn-link text-white" 
              data-toggle="collapse" 
              data-target="#collapse${project._id}"
              aria-expanded="true"
              aria-controls="collapse${project._id}">
              ${project.name}
            </button>
          </h5>
        </div>

        <div 
          id="collapse${project._id}" 
          class="collapse project-collapse"
          aria-labelledby="heading${project._id}" data-parent="#accordion">
          <div id="project-${project._id}-actions" class="project-actions text-center container">
            <div class="container-fluid justify-content-center">
              <div id="owner-container" class ="container">
                <div class="row">
                  <div class="col-3 text-right bg-light pt-3">
                    <p>Project owner:</p>
                  </div>
                  <div class="col pt-3 bg-white">
                    <ul class="pl-4">
                      <li>${project.owner.name} (${project.owner.email})</li>
                    <ul>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3 text-right bg-white pt-3">
                    <p>Members:</p>
                  </div>
                  <div class="col pt-3 bg-light">
                    ${table}
                  </div>
                </div>
              </div>
              <div 
                id="${project._id}_invite" 
                class="col btn btn-light p-3 mt-3" 
                data-toggle="modal"
                data-target="#project_${project._id}_invite-form">
                <h6>< Invite a member ></h6>
              </div>
              <div 
                id="${project._id}_add-task" 
                class="col btn btn-light p-3" 
                data-toggle="modal"
                data-target="#project_${project._id}_add-task-form">
                <h6>< Add a new task ></h6>
              </div>
              <div id="${project._id}_delete-container"></div>
            </div>
          </div>
          <div id="card-body-${project._id}" class="container">
          </div>
        </div>
      </div>
    </div>
  </div>
  `
  return rendering
}

function renderMemberList(memberNames, project) {
  // console.log ('ini member names pas render member list', memberNames)
  if (memberNames.length < 1) {
    let table =
      `
    <table class="table table-hover">
      <tbody>
        <tr>
          <td>
            <ul><li>none</li></ul>
          </td>
        </tr>
      </tbody>
    </table>
    `
    return table
  } else if (memberNames.length === 1) {
    let table =
      `
    <table class="table table-hover">
      <tbody>
        <tr id="only-member">
          <td><ul><li>${memberNames[0]}</li></ul></td>
        </tr>
      </tbody>
    </table>
    `
    fetchCurrentUserData()
    .done(user => {
      if (user._id === project.owner._id) {
        $('#only-member').append(renderRemoveProjectMemberButton(project, project.members[0]))
      }
    })
    .fail(err => console.log('failed to fetch current user data', err))
    return table
  }

  let table = ''
  memberNames.forEach((name, i) => {
    if (i === 0 && memberNames.length !== 1) table +=
      `
      <table class="table table-hover">
        <tbody>
          <tr>
            <td><ul><li>${name}</li></ul></td>
          </tr>
      `
    else if (i === memberNames.length - 1 &&  memberNames.length !== 1) table +=
      `   <tr>
            <td><ul><li>${name}</li></ul></td>
          </tr>
        </tbody>
      </table>
      `
    else table += `<tr><td><ul><li>${name}</li></ul></td></tr>`

    fetchCurrentUserData()
    .done(user => {
      if (user._id === project.owner._id) {

      }
    })
    .fail(err => console.log(err))
  })
  return table
}

function renderRemoveProjectMemberButton(project, member) {
  let rendering =
    `
    <td>
      <div 
        id="${project._id}_${member._id}_remove"
        onclick="showRemoveProjectMemberAlert(event)" 
        class="btn btn-dark"
        >
        Remove
      </div>
    </td>
  `
  return rendering
}

function renderRemoveProjectMemberAlert(event) {
  // console.log('masuk render remove project member alert', event.target);
  const currentTarget = event.currentTarget.id.split('_')
  const projectId = currentTarget[0]
  const memberId = currentTarget[1]

  let rendering =
    `
  <div 
    id="${projectId}_${memberId}_remove-project-membert-alert" 
    class="modal fade" 
    tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Confirm deletion</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body text-center px-5">
          <p>Are you sure you want to remove a project member? You cannot undo it once it's done.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
          <button id="${projectId}_${memberId}" type="button" class="btn btn-dark" onclick="removeProjectMember(event)">Remove</button>
        </div>

      </div>
    </div>
  </div>
  `
  return rendering
}

function renderDeleteProjectButton(project) {
  let rendering =
    `
  <div 
    id="${project._id}_delete"
    onclick="showDeleteProjectAlert(event)" 
    class="col btn btn-light p-3"
    >
    <h6>< Delete project ></h6>
  </div>
  `
  return rendering
}

function renderProjectTodoTable(project) {
  let rendering =
    `
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center font-weight-normal">Title</th>
          <th scope="col" class="text-center font-weight-normal">Description</th>
          <th scope="col" class="text-center font-weight-normal">Due Date</th>
          <th scope="col" class="text-center font-weight-normal">Completed</th>
          <th scope="col" class="text-center font-weight-normal">Options</th>
        </tr>
      </thead>
      <tbody id="project-${project._id}-todo-items">
      </tbody>
    </table>
    `
  return rendering
}

function renderProjectTodoList(todo) {
  // console.log('masuk renderProjectTodoList', (new Date(todo.dueDate)).toDateString());
  let rendering

  if (!todo.completed && !todo.important) {
    rendering =
      `
    <tr>
      <th class="text-center m-2" scope="row">
        ${todo.index}
      </th>
      <td class="text-center m-2">
        ${todo.title}
      </td>
      <td class="text-center m-2">
        ${todo.description}
      </td>
      <td class="text-center m-2">
        ${(new Date(todo.dueDate)).toDateString()}
      </td>
      <td class="text-center">
        <div class="squaredThree">
          <input 
            id="${todo.project}_${todo._id}_complete" 
            class="m-2 squaredThree" 
            type="checkbox" 
            value="project-${todo._id}" 
            id="check-complete" 
            onclick="completeTodoProject(event)"
            />
          <label for="${todo.project}_${todo._id}_complete"></label>
        </div>
      </td>
      <td class="text-center">
        <input 
          id="${todo.project}_${todo._id}_delete"
          type="button" 
          class="btn btn-dark m-2" value="Delete" 
          onclick="deleteTodoProject(event)"
          > 
          | 
        <input 
          id="${todo.project}_${todo._id}_edit"
          type="button" 
          class="btn btn-dark m-2" 
          value="Edit"
          onclick="showUpdateTaskForm(event)"
          data-toggle="modal"
          data-target="#project_${todo.project}_update-task-form"
          >
          | 
        <input 
          id="${todo.project}_${todo._id}_important" 
          type="button" 
          class="btn btn-dark m-2" 
          value="Mark as important" onclick="updateImportanceTodoProject(event)"
          >
      </td>
    </tr>
    `
  }
  else if (!todo.completed && todo.important) {
    // console.log("condition2")
    rendering =
      `
    <tr>
      <th class="text-center" scope="row">
        ${todo.index}
      </th>
      <td class="text-center">
        <strong><em>${todo.title}</em></strong>
      </td>
      <td class="text-center">
        <strong><em>${todo.description}</em></strong>
      </td>
      <td class="text-center">
        <strong><em>${(new Date(todo.dueDate)).toDateString()}</em></strong>
      </td>
      <td class="text-center">
        <div class="squaredThree">
          <input 
            id="${todo.project}_${todo._id}_complete" 
            class="m-2 squaredThree" 
            type="checkbox" 
            value="project-${todo._id}" 
            id="check-complete" 
            onclick="completeTodoProject(event)"
            />
          <label for="${todo.project}_${todo._id}_complete"></label>
        </div>
      </td>
      <td class="text-center">
        <input 
          id="${todo.project}_${todo._id}_delete"
          type="button" 
          class="btn btn-dark m-2" value="Delete" 
          onclick="deleteTodoProject(event)" id="project-${todo._id}"> 
          | 
        <input type="button" class="btn btn-dark m-2" value="Edit" onclick="findTodo(event)" id="project-${todo._id}"> | 
        <input 
          id="${todo.project}_${todo._id}_important" 
          type="button" 
          class="btn btn-dark m-2" 
          value="Unmark as important" onclick="updateImportanceTodoProject(event)"
          >
      </td>
    </tr>
    `
  }
  else if (todo.completed && !todo.important) {
    // console.log("condition3")
    rendering =
      `
    <tr>
      <th scope="row" class="text-center m-2">
        <strike>${todo.index}</strike>
      </th>
      <td class="text-center m-2">
        <strike>${todo.title}</strike>
      </td>
      <td class="text-center m-2">
        <strike>${todo.description}</strike>
      </td>
      <td class="text-center m-2">
        <strike>${(new Date(todo.dueDate)).toDateString()}</strike>
      </td>
      <td class="text-center">
        <div class="squaredThree">
          <input 
            id="${todo.project}_${todo._id}_complete" 
            class="m-2 squaredThree" 
            type="checkbox" 
            value="project-${todo._id}" 
            id="check-complete" 
            onclick="completeTodoProject(event)"
            checked />
          <label for="${todo.project}_${todo._id}_complete"></label>
        </div>
      </td>
      <td class="text-center">
        <input 
          id="${todo.project}_${todo._id}_delete"
          type="button" 
          class="btn btn-dark m-2" value="Delete" 
          onclick="deleteTodoProject(event)" id="project-${todo._id}"> 
          |  
        <input type="button" class="btn btn-dark m-2" value="Edit" onclick="findTodo(event)" id="project-${todo._id}"> |
        <input 
          id="${todo.project}_${todo._id}_important" 
          type="button" 
          class="btn btn-dark m-2" 
          value="Mark as important" onclick="updateImportanceTodoProject(event)"
          >
      </td>
    </tr>
    `
  }
  else {
    // console.log("condition4")
    rendering =
      `
    <tr>
      <th scope="row" class="text-center m-2">
        <strike>${todo.index}</strike>
      </th>
      <td class="text-center m-2">
        <strike>${todo.title}</strike>
      </td>
      <td class="text-center m-2">
        <strike>${todo.description}</strike>
      </td>
      <td class="text-center m-2">
        <strike>${(new Date(todo.dueDate)).toDateString()}</strike>
      </td>
      <td class="text-center">
        <div class="squaredThree">
          <input 
            id="${todo.project}_${todo._id}_complete" 
            class="m-2 squaredThree" 
            type="checkbox" 
            value="project-${todo._id}" 
            id="check-complete" 
            onclick="completeTodoProject(event)"
            checked />
          <label for="${todo.project}_${todo._id}_complete"></label>
        </div>
      </td>
      <td class="text-center">
        <input 
          id="${todo.project}_${todo._id}_delete"
          type="button" 
          class="btn btn-dark m-2" value="Delete" 
          onclick="deleteTodoProject(event)" id="project-${todo._id}"> 
          |  
        <input type="button" class="btn btn-dark m-2" value="Edit" onclick="findTodo(event)" id="project-${todo._id}"> |
        <input 
          id="${todo.project}_${todo._id}_important" 
          type="button" 
          class="btn btn-dark m-2" 
          value="Unmark as important" onclick="updateImportanceTodoProject(event)"
          >
      </td>
    </tr>
    `
  }
  return rendering
}

function renderDeleteProjectAlert(projectId) {
  let rendering =
    `
  <div 
    id="${projectId}_delete-project-alert" 
    class="modal fade" 
    tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Confirm deletion</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body text-center px-5">
          <p>Are you sure you want to delete this project? You cannot undo it once it's done.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
          <button id="${projectId}" type="button" class="btn btn-dark" onclick="deleteProject(event)">Delete</button>
        </div>

      </div>
    </div>
  </div>
  `
  return rendering
}

function renderUpdateTaskForm(todo) {
  var initialDueDate = new Date(todo.dueDate)

  var day = ("0" + initialDueDate.getDate()).slice(-2);
  var month = ("0" + (initialDueDate.getMonth() + 1)).slice(-2);

  var dateToUpdate = initialDueDate.getFullYear() + "-" + (month) + "-" + (day)

  let rendering =
    `
  <div 
    id="project_${todo.project}_todo_${todo._id}_update-task-form" 
    class="modal fade" 
    tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Update task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form>
          <div class="modal-body">
            <div class="col my-3">
              <input 
                type="text" 
                class="text-center form-control" 
                id="${todo.project}_${todo._id}_title" 
                placeholder="Title"
                value="${todo.title}" 
                required>
            </div>

            <div class="col my-3">
              <input 
                type="text" 
                class="text-center form-control" 
                id="${todo.project}_${todo._id}_description" placeholder="Description"
                value="${todo.description}"
                required>
            </div>

              <div id="date-form" class="col my-3">
                <div class="col text-center">
                  Due date:
                </div>
                <input 
                  id="${todo.project}_${todo._id}_due-date" 
                  type="date"
                  value="${dateToUpdate}" 
                  class="datepicker text-center pl-5 form-control">
              </div>

            <div class=" text-center submit-button mt-4 mb-3">
              <button 
                id="${todo.project}_${todo._id}_update" 
                type="submit" 
                class="inside btn-dark btn" 
                onclick="updateTodoProject(event)">Submit</button>
              <br>
            </div>

            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
            </div>
          </form>
      </div>
    </div>
  </div>
  `
  return rendering
}