
function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token
    const profile = googleUser.getBasicProfile()
    const name = profile.getName()
    const email = profile.getEmail()
    
    $.ajax({
        type: 'POST',
        url: `${baseUrl}/users/google`,
        data: {
            name: name,
            email: email
        }
    })
        .done(function(response){
            localStorage.setItem('token', response.token)
            showHomepage()
            $('#v-pills-home-tab').click()
            $.toast(`Welcome ${name}!`)
        })
        .fail(function(){
          $.toast('There is something wrong, try again!')
        })
        .always(function(){
        })
    }
  
  function onFailure(error) {
      $.toast('There is something wrong, try again!')
      console.log(error);
    }
  

function deleteAccount() {
    $.ajax({
        type: 'DELETE',
        url: `${baseUrl}/users`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function() {
        $.toast(`Bye bye!`)
        localStorage.removeItem('token')
        showSignupPage()
    })
    .fail(function() {
        $.toast('There is something wrong, try again!')
    })
}

function showEditProfileForm() {
    $.ajax({
        type: 'GET',
        url: `${baseUrl}/users`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(user) {
        $('#signinPage').hide()
        $('#signupPage').hide()
        $('#navbar').show()
        $('#homepage').hide()
        $('#editEverything').append(`
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Profile</h5>
            </div>
            <form id="editProfile">
            <div class="modal-body">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" id="profileNameEdit" value="${user.name}" >                      
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" id="profileEmailEdit" value="${user.email}">                      
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button onclick="editProfile()" type="submit" class="btn btn-info" data-dismiss="modal">Submit</button>
            <div>
            </form>
        `)

    })
}

function editProfile() {
    $.ajax({
        type: 'PUT',
        url: `${baseUrl}/users`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            name: $('#profileNameEdit').val(),
            email: $('#profileEmailEdit').val()
        }
    })
    .done(function() {
        $.toast('edit succes')
        showHomepage()
    })
    .fail(function() {
        $.toast('There is something wrong, try again!')
    })
    .always(function() {
        $('#profileNameEdit').val(''),
        $('#profileEmailEdit').val('')      
    })
}

function signup() {
    event.preventDefault()
    const name = $('#name').val()
    const email = $('#email').val()
    const password = $('#passwordSignup').val()

    $.ajax({
        type: 'POST',
        url: `${baseUrl}/users/signup`,
        data: { name, email, password}
    })
        .done(function() {
            $.toast('register succes')
            showSigninPage()
        })
        .fail(function() {
            $.toast('register fail')
        })
        .always(function() {
            $('#name').val('')
            $('#email').val('')
            $('#passwordSignup').val('')
        })
}

function signin(event) {
    event.preventDefault()
    const identity = $('#identity').val()
    const password = $('#password').val()

    $.ajax({
        type: 'POST',
        url: `${baseUrl}/users/signin`,
        data: { identity, password}
    })
        .done(function(res) {
            $.toast(`welcome, ${identity}!`)
            localStorage.setItem('token', res.token)
            showHomepage()
            $('#v-pills-home-tab').click()
        })
        .fail(function() {
            $.toast('signin fail')
        })
        .always(function() {
            $('#identity').val('')
            $('#password').val('')
        })
}

function logout() {
    $('#projectInvitationPage').empty()
    if (gapi.auth2) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
    }
    $.toast('Bye bye')
    localStorage.removeItem('token')
    $('#editEverything').empty()
    $('#projectInvitationPage').empty()
    $('#signinPage').show()
    $('#signupPage').hide()
    $('#navbar').hide()
    $('#homepage').hide()}
