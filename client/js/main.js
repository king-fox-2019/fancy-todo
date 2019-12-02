const baseUrl = 'http://localhost:3000'

$(document).ready(function() {
    if (!localStorage.getItem('token')) {
        $('#signinPage').show()
        $('#signupPage').hide()
        $('#navbar').hide()
        $('#homepage').hide()
    } else {
        showHomepage()     
    }
})

function showMyProjectTodoList() {
    $('#myTodoList').hide()
    $('#myProjectTodoList').show()
}


function showHomepage() {
    $('#projectInvitationPage').empty()
    $('#signinPage').hide()
    $('#signupPage').hide()
    $('#navbar').show()
    fetchMyTodos()
    fetchMyProject()
    $('#myProjectTodoList').hide()
    $('#homepage').show() 
}

function showSignupPage() {
    $('#signinPage').hide()
    $('#signupPage').show()
    $('#navbar').hide()
    $('#homepage').hide()
}

function showSigninPage() {
    $('#signinPage').show()
    $('#signupPage').hide()
    $('#navbar').hide()
    $('#homepage').hide()
}

