$( document ).ready(function() {
    setProjectSettingsPage()
    let members = [];

    $('#edit-project-form').on('submit', function(event) {
        event.preventDefault();
        let projectId = localStorage.getItem('project')
        $.ajax({
            type: 'PUT',
            url: `${BASE_URL}/projects/${projectId}`,
            data: $(this).serialize(),
            headers: {
                authorization: localStorage.getItem('jwt_token')
            }
        })
        .done( data => {
            showSuccessMessage("Project Name Updated Successfully.")
            $('#project-title').html(data.name);
        })
        .fail( err => {
            showErrorMessage(err.responseText);
        })
    })

    $('#invite-member-form').on('submit', function(event) {
        event.preventDefault();
        let ProjectId = localStorage.getItem('project')
        let member = JSON.stringify(members)
        $.ajax({
            type: 'POST',
            url: `${BASE_URL}/invitations`,
            data: $(this).serialize(),
            headers: {
                authorization: localStorage.getItem('jwt_token')
            },
            data: {
                member,
                ProjectId
            }
        })
        .done( data => {
            showSuccessMessage(`${data.length} invitations have been sent.`);
        })
        .fail( err => {
            showErrorMessage(err.responseText);
        })
    })

    $('#inviteMembers').bind('keypress', function(e) {
        var index = emails.indexOf(loggedInEmail);
        if (index > -1) {
           emails.splice(index, 1);
        }

        $( "#inviteMembers" ).autocomplete({
            source: emails,
            appendTo : $('#inviteMemberModal')
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

function setProjectSettingsPage() {
    if (!currentProjSettings) {
        $.router.go('home');
    } else {
        $('#project-title').append(`
            ${currentProjSettings.name}
        `)

        $('#inviteButton').append(`
            <button class="btn-box" data-toggle="modal" data-target="#inviteMemberModal">Invite</button>
        `)

        $('#project-settings').append(`
            <h4>Owner: </h4>
            <p>${currentProjSettings.owner.name}</p>
        `)
    
        if (currentProjSettings.members.length != 0) {
            $('#project-settings').append(`
                <h4>Members: </h4>
            `)
        }

        currentProjSettings.members.forEach(user => {
            $('#project-settings').append(`
                <span>
                    ${user.name}  
                </span>
            `)

            if (currentProjSettings.owner.email == localStorage.getItem('email')) {
                $('#project-settings').append(`
                    <span>
                        <button style="margin: 0;" onclick="removeMember('${currentProjSettings._id}','${user._id}')">Remove</button>
                    </span>
                    <br />
                `)
            } else if (user.email == localStorage.getItem('email')) {
                $('#project-settings').append(`
                    <span>
                        <button style="margin: 0;" onclick="removeMember('${currentProjSettings._id}','${user._id}')">Leave</button>
                    </span>
                    <br />
                `)
            }
        });

        $('#edit-buttons').append(`
            <button class="btn-box" style="width: 15%;" data-toggle="modal" data-target="#editProjectModal" onclick="editProject('${currentProjSettings._id}')">Edit</button>
            <button class="btn-box" style="width: 15%;" onclick="deleteProject('${currentProjSettings._id}')">Delete</button>
        `);
    }
}

function deleteProject(id) {
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
                type: 'DELETE',
                url: `${BASE_URL}/projects/${id}`,
                headers: {
                    authorization: localStorage.getItem('jwt_token')
                }
            })
            .done(data => {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                $.router.go("home");
            })
            .fail(err => {
                console.log(err)
            })
        }
    })
    
}

function editProject(id) {
    $.ajax({
        type: 'GET',
        url: `${BASE_URL}/projects/${id}`,
        headers: {
			authorization: localStorage.getItem('jwt_token')
		}
    })
    .done(data => {
        $('#editProjectName').attr("value", `${data.name}`);
    })
    .fail( err => {
        showErrorMessage(err.responseText);
    })
}

function removeMember(projectId, memberId) {
    $.ajax({
        type: 'PUT',
        url: `${BASE_URL}/projects/${projectId}`,
        data: $(this).serialize(),
        headers: {
            authorization: localStorage.getItem('jwt_token')
        },
        data: {
            memberId
        }
    })
    .done( data => {
        showSuccessMessage("Member Removed Successfully.")
    })
    .fail( err => {
        showErrorMessage(err.responseText);
    })
}