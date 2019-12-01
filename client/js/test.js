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
          <h5 class="modal-title" id="exampleModalLongTitle">Invite a member</h5>
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
            <ul><li>None</li></ul>
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
        $('#only-member').append(renderRemoveMemberButton(project, project.members[0]))
      }
    })
    .fail(err => console.log(err))
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

function renderRemoveMemberButton(project, member) {
  let rendering =
    `
    <td>
      <div 
        id="${project._id}_${member._id}_remove"
        onclick="showRemoveMemberAlert(event)" 
        class="btn btn-dark"
        >
        <h6>< Remove ></h6>
      </div>
    </td>
  `
  return rendering
}