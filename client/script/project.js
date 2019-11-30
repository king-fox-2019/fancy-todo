const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function getProject(){
    $.ajax({
      url: 'http://localhost:3000/project/user',
      method: 'GET',
      headers:{
          access_token: localStorage.getItem('token')
      }
    })
    .done(projects => {
        $('.project-detail').empty()
        $('.project-list').empty()
        if(projects.length === 0){
            $('.project-list').append(`
          <div class="empty-project">
            <p style="font-size: 24px">It seems you dont have any project<span style="font-size: 24px; color: green"><i class="fas fa-frown ml-2"></i></span></p>
            <p>Create project and let's collaboration with others</p>
          </div>
            `)
        }else{
            $('.project-list').append(`
            <table class="table">
            <thead class="thead-light text-left">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Project Name</th>
                <th scope="col">Members</th>
                <th scope="col">Creator</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody id="table-body">
            </tbody>
          </table>
            `)

            $('#table-body').empty()
            projects.forEach((data,index) => {
            $('#table-body').append(`
                <tr>
                    <th scope="row">${index+1}</th>
                    <td id="project-name" onclick="getDetailProject('${data._id}')">${data.title}</td>
                    <td onclick="showAddMember('${data._id}')">
                        <span style="color:green"><i class="fas fa-user-plus"></i></i></span>
                    </td>
                    <td>${data.creator.username}</td>
                    <td>
                        <span class="mr-2" style="color:blue" onclick="showTitleProject('${data._id}')"><i class="fas fa-pen"></i></span>
                        <span style="color:red" onclick="deleteProject('${data._id}')"><i class="fas fa-trash"></i></span>
                    </td>
                </tr>
            `)
            });
        }
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Fetchdata Error',
            text: `${err.responseJSON.message}`
        })
    })
}

function createProject(){
    let title = $('#project-title').val()
    $.ajax({
        url: 'http://localhost:3000/project',
        method: 'POST',
        data:{
            title
        },
        headers:{
            access_token: localStorage.getItem('token')
        }
    })
    .done(project => {
        Toast.fire({
            icon: 'success',
            title: 'Create Project',
            text: `${project.message}`
        })
        $('#project-title').val('')
        getProject()
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Create Project',
            text: `${err.responseJSON.message}`
        })
    })
}

function showTitleProject(id){
    $.ajax({
        url: `http://localhost:3000/project/${id}`,
        method: 'GET',
        headers:{
            access_token: localStorage.getItem('token')
        }
    })
    .done(project => {
        $('.project-detail').empty()
        $('.project-detail').append(`
            <p>Project Title : ${project.title}</p>
            <div class="d-flex">
            <form class="form-inline my-2 my-lg-0" id="edit-form">
                <input class="form-control mr-sm-2" type="search" placeholder="Input new title" aria-label="Search" id="edit-title-project">
                <button class="btn btn-outline-success my-2 my-sm-0" type="button" onclick="editTitleProject('${project._id}')">Submit</button>
            </form>
            <button class="btn btn-outline-danger ml-2" onclick="getProject()">Cancel</button>
            </div>
        `)
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Detail Project',
            text: `${err.responseJSON.message}`
        })
    })
}

function getDetailProject(id){
    $.ajax({
        url: `http://localhost:3000/project/${id}`,
        method: 'GET',
        headers:{
            access_token: localStorage.getItem('token')
        }
    })
    .done(project => {
        $('.project-detail').empty()
        $('.project-list').empty()
        $('.project-list').append(`
            <div class="card">
                <h5 class="card-header">Project Title : ${project.title} (Creator : ${project.creator.username})</h5>
                <div class="card-body d-flex flex-column">
                    <div id="member-table">
                    <div>
                    <div class="d-flex flex-wrap justify-content-center">
                        <div id="todo-project-wrap">
                        </div>
                    </div>
                </div>
            </div>
        `)

        $('#member-table').empty()
        $('#member-table').append(`
        <h5 id="members-table">Members</h5>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody id="member-list">
            </tbody>
        </table>
        `)

        let members = project.members
        $('#member-list').empty()

        if(members.length === 0){
            $('#member-list').append(`
                <p>There is no member yet, Lets invite your teammates!</p>
            `)
        }else{
            members.forEach((data,index) => {
                $('#member-list').append(`
                    <tr>
                        <th scope="row">${index+1}</th>
                        <td>${data.username}</td>
                        <td>${data.email}</td>
                        <td><span onclick="kickMember('${id}','${data.email}')" id="kick-member"><i class="fas fa-user-times"></i></span></td>
                    </tr>
                `)  
            })
        }

        getAllTask(id)
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Detail Project',
            text: `${err.responseJSON.message}`
        })
    })
}

function deleteProject(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
            $.ajax({
                url: `http://localhost:3000/project/${id}`,
                method: 'DELETE',
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .done(result => {
                Toast.fire({
                    icon: 'success',
                    title: 'Delete',
                    text: 'Delete Project Success!'
                })
                getProject()
            })
            .fail(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Delete Project',
                    text: 'Error!'
                })
            })
        }
      })
}

function editTitleProject(id){
    let title = $('#edit-title-project').val()
    $.ajax({
        url: `http://localhost:3000/project/${id}`,
        method: 'PUT',
        data:{
            title
        },
        headers:{
            access_token: localStorage.getItem('token')
        }
    })
    .done(result => {
        Toast.fire({
            icon: 'success',
            title: 'Edit Title Project',
            text: 'Success !'
        })
        getProject()
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Edit Project',
            text: `${err.responseJSON.message}`
        })
    })
}