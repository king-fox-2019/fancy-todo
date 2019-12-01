function showAddMember(id){
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
           <p>Form add member</p>
           <div class="d-flex">
           <form class="form-inline my-2 my-lg-0" id="edit-form">
               <input class="form-control mr-sm-2" type="search" placeholder="Input email member" aria-label="Search" id="new-member">
               <button class="btn btn-outline-success my-2 my-sm-0" type="button" onclick="addMember('${project._id}')">Add Member</button>
           </form>
           <button class="btn btn-outline-danger ml-2" onclick="getProject()">Cancel</button>
           </div>
       `)
    })
    .fail(err => {
       Swal.fire({
           icon: 'error',
           title: 'Show Member',
           text: `${err.responseJSON.message}`
       })
    })
}

function addMember(id){
    let email = $('#new-member').val()
    $.ajax({
        url: `http://localhost:3000/project/member/${id}`,
        method: 'POST',
        data:{
            email
        },
        headers:{
            access_token : localStorage.getItem('token')
        }
    })
    .done(result => {
        Toast.fire({
            icon: 'success',
            title: 'Add Member',
            text: 'Add Member Success!'
        })
        $('#new-member').val('')
    })
    .fail(err => {
        Swal.fire({
            icon: 'error',
            title: 'Add Member',
            text : `${err.responseJSON.message}`
        })
    })
}

function kickMember(id, email){
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
                url: `http://localhost:3000/project/member/${id}?email=${email}`,
                method: 'DELETE',
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .done(result => {
                getDetailProject(id)
                Toast.fire({
                    icon: 'success',
                    title: 'Kick Member',
                    text: `${result.message}`
                })
            })
            .fail(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Kick Member',
                    text: `${err.responseJSON.message}`
                })
            })
        }
      })
}