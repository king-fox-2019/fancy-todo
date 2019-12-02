$('#myTodo').click(() => {
    myTodoActive()
})

$('#projectTodo').click(() => {
    projectActive()
})

$('#projectDetail').click(() => {
    projectDetailActive()
})


function myTodoActive() {
    $('#personalPage').show()
    $('#projectPage').hide()
    $('#todoInProject').hide()
    $('#myTodo').addClass('active')
    $('#projectTodo').removeClass('active')
}

function projectActive() {
    $('#personalPage').hide()
    $('#projectPage').show()
    $('#todoInProject').hide()
    $('#myTodo').removeClass('active')
    $('#projectTodo').addClass('active')
}

function projectDetailActive() {
    $('#personalPage').hide()
    $('#projectPage').hide()
    $('#todoInProject').show()
    $('#myTodo').removeClass('active')
    $('#projectTodo').addClass('active')
}

