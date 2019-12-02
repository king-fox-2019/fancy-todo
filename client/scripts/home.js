$( document ).ready(function() {
    let loggedInEmail;
    let members = [];

    showProjects();
    getAllUsers();

    $('#add-project-form').on('submit', function(event) {
        event.preventDefault();
        let name = document.getElementById("inputProjectName").value;
        $.ajax({
            type: 'POST',
            url: `${BASE_URL}/projects`,
            data: {
                name,
                members
            },
            headers: {
                authorization: localStorage.getItem('jwt_token')
            }
        })
            .done( data => {
                $('#all-projects').append(`
                    <div class="card col-3" onclick="showTodos('${data._id}')">
                        <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${data.members.length + 1} Members</h6>
                            <button class="btn btn-box" onclick="editProject('${data._id}')">Edit Project Settings</button>
                        </div>
                    </div>
                `)  
                showSuccessMessage('You have created a project!')
            })
            .fail( err => {
                console.log(err);
            })
    })

    $('#inviteMembers').bind('keypress', function(e) {
        var index = emails.indexOf(loggedInEmail);
        if (index > -1) {
           emails.splice(index, 1);
        }

        $( "#inviteMembers" ).autocomplete({
            source: emails,
            appendTo : $('#addProjectModal')
          });
        if (e.which == 32) {
            if( !validateEmail(this.value) || this.value === '') {
                showErrorMessage('input must be email format')
            } else {
                members.push(this.value);
                $('#members-added').append(`
                    <p>${this.value}</p>
                `)
                
                this.value = ''
            }
        }
    });
});

function getAllUsers() {
    $.ajax({
        type: 'GET',
        url: `${BASE_URL}/users`,
        headers: {
            authorization: localStorage.getItem('jwt_token')
        }
    })
    .done( datas => {
        emails = datas.map(function(i) {
            return i.email;
        });
    })
    .fail( err => {
        showErrorMessage(err)
    })
}

function showProjects(){
    $.ajax({
        type: 'GET',
        url: `${BASE_URL}/projects`,
        headers: {
			authorization: localStorage.getItem('jwt_token')
		}
    })
    .done( datas => {
        loggedInEmail = datas[0].owner.email;
        for (let project in datas) {
            $('#all-projects').append(`
                <div class="card col-3" onclick="showTodos('${datas[project]._id}')">
                    <div class="card-body">
                        <h5 class="card-title">${datas[project].name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${datas[project].members.length + 1} Members</h6>
                        <button class="btn btn-box" onclick="editProject('${datas[project]._id}')">Edit Project Settings</button>
                    </div>
                </div>
            `)
        }
    })
    .fail( err => {
        console.log(err);
    })
}

function editProject(id) {
    event.stopPropagation();

    localStorage.setItem('project', id)

    $.ajax({
        type: 'GET',
        url: `${BASE_URL}/projects/${id}`,
        headers: {
			authorization: localStorage.getItem('jwt_token')
		}
    })
    .done(data => {
        currentProjSettings = data;
        localStorage.setItem('project', id)
        $.router.go("project");
    })
    .fail(err => {
        showErrorMessage(err.responseText)
    })
}

function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( email );
}