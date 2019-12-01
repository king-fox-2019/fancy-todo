function createtodoproject() {
    const id = localStorage.getItem('project')
    console.log(id)
    const { value: formValues } = Swal.fire({
        title: 'Created Project TODO',
        html: `
        <label>Title</label>
        <input id="titletodoproject" class="swal2-input" >
        <label>Description</label>
        <input id="descriptiontodoproject" class="swal2-input" >,
        <label>Due Date</label>
        <input id="duedatetodoproject" type="date" class="swal2-input" >`,
        focusConfirm: true,
        preConfirm: () => {
            return {
                title: $('#titletodoproject').val(),
                description: $('#descriptiontodoproject').val(),
                dueDate: $('#duedatetodoproject').val()
            }
        }
    })
        .then(({ value }) => {
            $.ajax({
                method: 'post',
                url: `${baseURL}/project/todo/${id}`,
                data: value,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
        })
        .then(_ => {
            console.log(_);
            swal.fire({
                type: 'success',
                title: 'Success Created Todo Project'
            })
            $('#todolistproject').empty()
            todoproject(id)
        })
        .catch(err => {
            console.log(err);
            swal.fire({
                title: `${err.responseJSON}`,
                showCloseButton: true
            })
        })
}

function editTodoProject(id) {
    const idproject = localStorage.getItem('project')
    $.ajax({
        url: `${baseURL}/todo/${id}`,
        method: `get`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .then(data => {
            return { value: formValues } = Swal.fire({
                title: 'Edit your TODO',
                html: `
            <label>Title</label>
            <input id="title" class="swal2-input" value="${data.title}">
            <label>Description</label>
            <input id="description" class="swal2-input" value="${data.description}">`,
                focusConfirm: false,
                preConfirm: () => {
                    return {
                        title: $('#title').val(),
                        description: $('#description').val(),
                    }
                }
            })
        })
        .then(({ value }) => {
            return $.ajax({
                method: 'patch',
                url: `${baseURL}/project/todo/${idproject}/${id}`,
                data: value,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
        })
        .then(_ => {
            swal.fire({
                type: 'success',
                title: 'Success Todo Project Updated'
            })
            $('#todolistproject').empty()
            todoproject(idproject)
        })
        .catch(err => {
            swal.fire({
                title: `${err.responseJSON}`,
                showCloseButton: true
            })
        })
}

function deleteTodoProject(id) {
    const idproject = localStorage.getItem('project')

    swal.fire({
        title: 'Are you sure to Delete?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
        .then(result => {
            if (result.value) {
                return $.ajax({
                    method: 'delete',
                    url: `${baseURL}/project/todo/${idproject}/${id}`,
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
                'Deleted!',
                'Your Project Todo Deleted',
                'success'
            )
            $('#todolistproject').empty()
            todoproject(idproject)
        })
        .catch(err => {
            swal.fire({
                title: `${err.message}`,
            })
        })
}

function updatedStatusProject(id) {
    const idproject = localStorage.getItem('project')
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
                    method: 'patch',
                    url: `${baseURL}/project/todo/${idproject}/${id}`,
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
                'Your Todo Project Status Updated',
                'success'
            )
            $('#todolistproject').empty()
            todoproject(idproject)
        })
        .catch(err => {
            console.log(err);
            swal.fire({
                title: `${err.message}`,
            })
        })
}


// ========================================================================


function projectList() {
    $.ajax({
        method: 'get',
        url: `${baseURL}/project`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            findAllProject(response)
        })
        .fail(err => {
            console.log(err);
        })
}
function convertDateAgo(date) {
    return moment(date).startOf('hour').fromNow();
}

function findAllProject(projectData) {
    $(`#projectlist`).empty()
    let list = projectData
    if (!list.length) {
        $('#projectlist').append(`<h4 style="text-align: center;">you don't have any project</h4>`)
    } else {
        list.forEach(element => {
            let date = convertDateAgo(element.updatedAt)
            let projectMembers = element.members.map(user => {
                return user.name
            }).join(`, \n`)
            let creatortrue = ''
            console.log(localStorage.getItem('name'), element.creator.name);
            if (localStorage.getItem('name') === element.creator.name) {
                creatortrue = `
          <a onclick="addmemberproject('${element._id}')"
            data-tooltip="Add new collaborator to your project">&nbsp
          <i class=" user plus icon  delete-todo" style="color:#A0A0A0; font-size: 15px;"></i>
          </a>
          <a onclick="deleteproject('${element._id}')" data-tooltip="delete project">
            <i class="trash alternate icon delete-todo" style="color:#A0A0A0; font-size: 15px;"></i>
          </a>`
            } else {
                creatortrue = ``
            }
            $('#projectlist').append(`
            <div class="item">
              <i class="big fort awesome alternate middle aligned icon"></i>
              <div class="content">
                <div class="header" onclick="todoproject('${element._id}')">
                  <span class="basic2">
                    <a>${element.name}</a>
                    <p class="meta" style="font-size:10px;"> creator: ${element.creator.name}</p>
                  </span>
                </div>
                <div class=" description">
                  <p class="meta"> ${element.description}</p>
                </div>
                <div class="todo-link">
                  <p class="meta"><span style="font-size:10px; color:grey;">updated ${date}</span></p>
                  <div>
                    <span class="meta" style="font-size:10px;">
                      <a data-tooltip="${element.members.length} members : ${projectMembers}">
                        <i class="users icon  delete-todo"
                          style="color:#A0A0A0; font-size: 13px;"></i>${element.members.length}&nbsp
                      </a>
                    </span>
                    <span id="creatoronly">
                      ${creatortrue}
                    </span>
                  </div>
                </div>
            
              </div>
            </div>
            `
            )
        });
    }
}

function TEST() {
    $('.ui.dropdown').dropdown('clear');
    $.ajax({
        url: `${baseURL}/project/alluser`,
        method: `get`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(data => {
            // console.log(data);
            let str = ``
            let invitedmember = [];
            let pic = ['jenny', 'elliot', 'stevie', 'christian', 'matt', 'justen', 'jenny', 'elliot', 'stevie', 'christian', 'matt', 'justen']
            for (let i = 0; i < data.length; i++) {
                let id = data[i]._id
                invitedmember.push({ id: data[i].name });
                str += `
                    <div class="item" data-value="${data[i].email}">
                    <img class="ui mini avatar image"
                        src="https://semantic-ui.com/images/avatar/small/${pic[i]}.jpg">
                    ${data[i].name}
                    </div>
                `
            }
            // console.log(invitedmember, str);
            $('.default.text.apalah').before(`
                <div class="menu plis">
                    ${str}
                </div>
            `)
            str = ''
            $('.multiple.search.selection.dropdown.dropdown')
                .dropdown()
                ;
            $('#AddProject').modal('show')
            $('#btn-create-project').on('click', function (e) {
                e.preventDefault()
                createproject1()
            })
        })
        .fail(err => {
            console.log(err);
        })
        .always(_ => {
            $('#pendingmember').val('')
            $('.menu.plis').val("");
            $('#nameproject').val('')
            $('#projectdescription').val('')
            $('.ui.dropdown').dropdown('clear');
            $('.multiple.search.selection.dropdown.dropdown').multiSelect('refresh');
        })
}
// $('#btn-create-project').on('click', function (e) {
//   e.preventDefault()
//   createproject1()
// })


function createproject1() {
    // alert('masuk')
    let pendingmember;
    let name = $('#nameproject').val()
    let description = $('#projectdescription').val()
    let comma = ','
    if ($('#pendingmember').val().indexOf(comma) != -1) {
        let str = String($('#pendingmember').val())
        pendingmember = str.split(',')
    } else {
        pendingmember = $('#pendingmember').val()
    }


    let newProject = { name, description }
    return new Promise((resolve, reject) => {
        $.ajax({
            method: 'post',
            url: `${baseURL}/project`,
            data: newProject,
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .done(project => {
                resolve({ project, pendingmember })
            })
            .fail(err => {
                reject(err)
            })
    })
        .then(({ project, pendingmember }) => {
            let promises = []
            console.log(pendingmember)
            console.log(typeof pendingmember, pendingmember[0]);
            if (Array.isArray(pendingmember)) {
                pendingmember.forEach(email => {
                    promises.push(new Promise((resolve, reject) => {
                        $.ajax({
                            method: 'patch',
                            url: `${baseURL}/project/invite/${project._id}`,
                            data: { email: email },
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        })
                            .done(data => {
                                resolve(data)
                            })
                            .fail(err => {
                                reject(err)
                            })
                    }))
                })
                return Promise.all(promises)
            } else {
                console.log(pendingmember);
                // alert('hmm')
                return new Promise((resolve, reject) => {
                    $.ajax({
                        method: 'patch',
                        url: `${baseURL}/project/invite/${project._id}`,
                        data: { email: pendingmember },
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                        .done(data => {
                            resolve(data)
                        })
                        .fail(err => {
                            reject(err)
                        })
                })
            }
        })
        .then(data => {
            console.log(data);
            $('#AddProject').modal('hide')
            Swal.fire({
                icon: 'success',
                title: 'project created!',
                text: `all members has been invited`,
                showConfirmButton: false,
                timer: 1500
            })
            $('#projectlist').empty()
            projectList()

        })
        .catch(err => {
            console.log(err);
            let msg = err.responseJSON.message.join("")
            swal.fire({
                text: `${msg}`,
                showCloseButton: true
            })
        })
        .finally(_ => {
            $('#pendingmember').val('');
            $('#nameproject').val('')
            $('#projectdescription').val('')
            $('.menu.plis').val("");
            $('.ui.dropdown').dropdown('clear');
        })
}

function addmemberproject(id) {
    $.ajax({
        url: `${baseURL}/project/alluser`,
        method: `get`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .then(users => {
            var options = {};
            users.map(user => {
                options[user.email] = user.name;
            })

            return { value } = Swal.fire({
                title: 'Add new collaborator project',
                input: 'select',
                inputOptions: options,
                inputPlaceholder: 'select new member',
                allowOutsideClick: true,
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: function (email) {
                    return new Promise(function (resolve) {
                        resolve({ email: email })
                    });
                }
            })
        })
        .then(({ value }) => {
            console.log(value);
            if (value.email != '') {
                return $.ajax({
                    method: 'patch',
                    url: `${baseURL}/project/invite/${id}`,
                    data: value,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
            }
            else if (!value) {
                throw { message: 'add member canceled' }
            }
            else if (!value.email == '') {
                throw { message: 'add member canceled' }
            }
        })
        .then(response => {
            swal.fire({
                icon: 'success',
                type: 'success',
                title: `${response.message}`,
                showConfirmButton: false,
                timer: 1000
            })

            $('#projectlist').empty()
            projectList()
        })
        .catch(err => {
            console.log(err);
            let msg = ''
            if (err.message !== undefined) msg = `user not`
            else if (err.responseJSON.message) msg = err.responseJSON.message
            else msg = `add member canceled`
            console.log(err);
            swal.fire({
                icon: 'error',
                text: `${msg}`,
                showConfirmButton: false,
                timer: 1000
            })
        })
}

function deleteproject(id) {
    swal.fire({
        title: 'Are you sure to Delete?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#fdcf0f',
        cancelButtonColor: '#000',
        confirmButtonText: 'Yes, delete it!'
    })
        .then(result => {
            if (result.value) {
                return $.ajax({
                    method: 'delete',
                    url: `${baseURL}/project/${id}`,
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
                title: 'project deleted!'
            })
            $('#projectlist').empty()
            projectList()
        })
        .catch(err => {
            swal.fire({
                title: `${err.message}`,
            })
        })
}

function todoproject(id) {
    projectDetailActive()
    localStorage.removeItem('project')
    localStorage.setItem('project', id)
    $.ajax({
        method: 'get',
        url: `${baseURL}/project/todo/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            console.log(response);
            $('#todolistproject').empty()
            $('#btn-add-todo-project').empty()
            getTodoProject(response)
        })
        .fail(err => {
            console.log(err);
        })
}

function getTodoProject(todos) {

    $(`#todolistproject`).empty()
    if (!todos.length) {
        $('#todolistproject').append(`<h4>This project doesn't have any list, <br> make a new one!</h4>`)
    } else {
        todos.forEach(task => {
            let date = new Date()
            if (todo.dueDate) date = convertDate(todo.dueDate)
            else date = convertDate(new Date().setDate(new Date().getDate() + 1))
            let { title, description, action } = getStatusProject(task.status, task.title, task.description, task._id)
            console.log(convertDateProject(task.createdAt))
            $(`#todolistproject`).append(`
            <div class="item" style="padding: 15px ;">
                <i class="large calendar check outline  middle aligned icon ${(task.status) ? "yellow" : "grey"}"></i>
                <div class="content">      
                <div class='head-todo'>
                    ${title}
                    <p class="date"><strong>Due:</strong> ${convertDateProject(date)}</p>
                </div>         
                    <div class="description" style="font-size: 11px; word-break: break-all;">${description}</div>
                    <div class="todo-link">
                        <a data-tooltip="change status list" id="H${task._id}"><span  style="color:#008080;  font-size:12px;">${!task.status ? "undone" : "done"}</span></a>
                        <div>
                          <span>
                          ${action}
                          <a onclick="deleteTodoProject('${task._id}')" data-tooltip="delete list">
                            <i class="trash alternate outline icon delete-todo" style="color:#A0A0A0"></i>
                          </a>
                          </span>
                        </div>
                    </div>
                </div>
            </div>
        `)

            //HOVER EFFECT
            $(`#H${task._id}`).hover(() => {
                // console.log(`yyyyy`);
                if (!task.status) $(`#H${task._id}`).html("done")
                else $(`#H${task._id}`).html("undone")
            }, () => {
                if (!task.status) $(`#H${task._id}`).html("undone")
                else $(`#H${task._id}`).html("done")
            })

            //CHANGE STATUS AJAX
            const idproject = localStorage.getItem('project')

            $(`#H${task._id}`).on('click', () => {
                !task.status ? task.status = true : task.status = false
                $.ajax({
                    method: 'patch',
                    url: `http://localhost:3000/project/todo/${idproject}/${task._id}`,
                    data: {
                        status: task.status
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                    .done(updated => {
                        getTodoProject(todos)
                    })
                    .fail(err => {
                        console.log(err)
                    })
            })
        });
    }
}

function getStatusProject(status, title, description, id) {
    if (status) return {
        title: `<p class="header" style="color: grey;">${title}</p>`,
        description: `<strike>${description}</strike>`,
        action: ``
    }
    else return {
        title: `<p class="header" >${title}</p>`,
        description,
        action: `
      <a onclick="showmodalupdateproject('${id}')" data-tooltip="edit list" id="showmodalupdateproject">
        <i class="pencil alternate icon delete-todo" style="color:#A0A0A0"></i>
      </a>
      `
    }
}

function createToDoProject() {
    const id = localStorage.getItem('project')
    let title = $('#titletodoproject').val()
    let description = $('#descriptiontodoproject').val()
    let dueDate = $('#duedatetodoproject').val()

    Swal.showLoading();

    $.ajax({
        url: `${baseURL}/project/todo/${id}`,
        method: `post`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title, description, dueDate
        }
    })
        .done(({ data }) => {
            $(".testproject").modal('hide');

            Swal.close()
            Swal.fire('Success!', "Your Todo Project is Created!", 'success')
            $('#todolistproject').empty()
            todoproject(id)
        })
        .fail(err => {
            let error = err.responseJSON
            Swal.fire("Error!", `${error.message}`, "error");
        })
        .always(() => {
            $('#titletodoproject').val('')
            $('#descriptiontodoproject').val('')
            $('#duedatetodoproject').val('')
        })
}

function showmodalupdateproject(id) {
    const idProject = localStorage.getItem('project')

    $('#duedate2').calendar({
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
            $('#updatetitletodoproject').val(`${data.title}`);
            $('#updatedescriptiontodoproject').val(`${data.description}`);
            $('#updateduedatetodoproject').val(`${data.dueDate ? data.dueDate.split("T")[0] : ''}`);
            $("#updateTodoproject").modal('show')
            console.log(data._id);
            let dataid = data._id
            $('#btn-update-todoproject').on('click', function (e, dataid) {
                e.preventDefault()
                editTodoProject(id)
            })
        })
}

function editTodoProject(id) {
    const idproject = localStorage.getItem('project')

    $.ajax({
        method: 'patch',
        url: `${baseURL}/project/todo/${idproject}/${id}`,
        data: {
            title: $('#updatetitletodoproject').val(),
            description: $('#updatedescriptiontodoproject').val(),
            dueDate: $('#updateduedatetodoproject').val()
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(_ => {
            $('#titletodoproject').val(``);
            $('#descriptiontodoproject').val(``);
            $('#duedatetodoproject').val(``);
            $("#updateTodoproject").modal('hide');
            $('#todolistproject').empty()
            todoproject(idproject)
            Toast.fire({
                icon: 'success',
                title: 'task updated!'
            })
        })
        .fail(err => {
            console.log(err);
            swal.fire({
                title: `${err.responseJSON}`,
                showCloseButton: true
            })
        })
}

function deleteTodoProject(id) {
    const idproject = localStorage.getItem('project')

    console.log(id)
    swal.fire({
        title: 'Are you sure to Delete?',
        text: "You won't be able to revert this!",
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#fdcf0f',
        cancelButtonColor: '#000',
        confirmButtonText: 'Yes, delete it!'
    })
        .then(result => {
            if (result.value) {
                return $.ajax({
                    method: 'delete',
                    url: `${baseURL}/project/todo/${idproject}/${id}`,
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
            $('#todolistproject').empty()
            todoproject(idproject)
        })
        .catch(err => {
            Toast.fire({
                title: `${err.message}`,
            })
        })
}

function updatedStatusProject(id) {
    const idproject = localStorage.getItem('project')

    swal.fire({
        title: 'Are you sure to Change Status?',
        text: "You won't be able to revert this!",
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Change it!'
    })
        .then(result => {
            if (result.value) {
                return $.ajax({
                    method: 'patch',
                    url: `${baseURL}/project/todo/${idproject}/${id}`,
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
            $('#todolistproject').empty()
            todoproject(idproject)
        })
        .catch(err => {
            swal.fire({
                title: `${err.message}`,
            })
        })
}

$(function () {
    $("#showModalcreateTodoproject").click(function () {
        $(".testproject").modal('show');
    });

    $(".testproject").modal('hide');


    $('#duedateProject1').calendar({
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


function convertDateProject(date) {
    return moment(date).format('D MMM Y')
}