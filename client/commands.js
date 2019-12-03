// import { addTodo } from "../server/controllers/projectController"

$('#register-button').click((e)=>{
    e.preventDefault()
    let name = $('#nameRegister').val()
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()
    register(name,email,password)
    $('#nameRegister').val('')
    $('#emailRegister').val('')
    $('#passwordRegister').val('')
})


$('#add-project-modal').click((e) => {
    e.preventDefault()
    $('#modalAddProjectForm').modal('show')
    // console.log('halo')
})


$('#edit-project-modal').click((e) => {
    e.preventDefault()
    $('#modalAddProjectForm').modal('show')
    // console.log('halo')
})


$('#login-button').click((e) => {
    e.preventDefault()
    let email = $('#emailLogin').val()
    let password = $('#passwordLogin').val()
    login(email,password)
    $('#emailLogin').val('')
    $('#passwordLogin ').val('')
    
})

$('#back-to-login-button').click((e) => {
    e.preventDefault()
    $('#opening-quotes').show()
    $('#register-page').hide()
    $('#login-page').addClass('animated fadeIn')
    $('#login-page').show()
    
})

$('#register-form').click((e) => {
    e.preventDefault()
    $('#opening-quotes').hide()
    $('#opening-quotes').show()
    $('#register-page').show().addClass('animated fadeIn')
    $('#register-page').show()
    $('#login-page').hide()
})

$('#button-submit-addTodo').click((e)=>{
    console.log('function add todo running')
    e.preventDefault()
    let title = $('#add-title-todo').val()
    let date = $('#add-date-todo').val()
    addTodo(title,date)
    $('#add-title-todo').val('')
    $('#add-date-todo').val('')
    // addTodo()
})

$('#button-submit-create-project').click((e)=>{
    console.log('function add project triggered',$('#add-project-members').val())
    e.preventDefault()
    let title = $('#add-project-title').val()
    let description = $('#add-project-description').val()
    let members = $('#add-project-members').val().split(',')
    addProject(title,description,members)
    $('#add-project-title').val('')
})

$('#button-submit-edit-project').click((e)=>{
    console.log('function edit project triggered',$('#add-project-members').val())
    e.preventDefault()
    let title = $('#edit-project-title').val()
    let description = $('#edit-project-description').val()
    let projectId = $('#edit-projectId').val()
    let members = $('#add-project-members').val().split(',')
    // let members = $('#edit-project-members').val()
    
    

    // console.log(title,description)
    editProject(projectId,title,description,members)
    $('#edit-project-title').val('')
    $('#edit-project-description').val('')
})

$('#button-submit-edit-project-todo').click((e)=>{
    e.preventDefault()
    let title = $('#edit-title-todo-project').val()
    let date = $('#edit-date-todo-project').val()
    let id = $('#todo-project-id').val()
    let assignee = $('#edit-assignee-todo').val()
    let projectId = $('#todo-project-id-value').val()
    let projectTitle = $('#project-title').val()
    let projectDescription = $('#project-description').val()
    let projectMembers = $('#project-members').val()
    
    // console.log(projectId)

    
    updateTodoProject(id,title,date,assignee,projectId,projectTitle,projectDescription,projectMembers)
    console.log('edit button triggered')
    $('#edit-title-todo').val('')
    $('#edit-date-todo').val(new Date())
    $('#todo-id').val('')
})


$('#button-submit-add-project-todo').click((e)=>{
    e.preventDefault()
    let title = $('#add-title-todo-project').val()
    let date = $('#add-date-todo-project').val()
    let assignee = $('#add-assignee-todo').val()
    let projectId = $('#project-id').val()
    
    // console.log('function edit todo running',title,date,assignee,projectId)

    
    addTodoProject(title,date,assignee,projectId)
    // console.log('edit button triggered')
    $('#edit-title-todo').val('')
    $('#edit-date-todo').val(new Date())
    $('#todo-id').val('')
})

$('#button-submit-editTodo').click((e)=>{
    e.preventDefault()
    let title = $('#edit-title-todo').val()
    let date = $('#edit-date-todo').val()
    let id = $('#todo-id').val()
    let page = $('#page-now').val()
    
    console.log('function edit todo running',title,date,id,page)

    
    updateTodo(id,title,date,page)
    // console.log('edit button triggered')
    $('#edit-title-todo').val('')
    $('#edit-date-todo').val(new Date())
    $('#todo-id').val('')
})

let addButton = 'show';

$('#show-personal-page').click((e) => {
    e.preventDefault()
    $('#todolist').empty()
    generateTodo('personal')
    $("#page-content-wrapper-personal").show()
    $("#page-content-wrapper-project").hide()
    $("#page-content-wrapper-project-todo").hide()
    $("#page-content-wrapper-personal").animate({
        width: '+=48%'
    }, 1000)
    $("#page-content-right").animate({
        width: '-=40%'
    }, 1000)
    $("#add-todo-form").animate({
        width: '-=800px'
    }, 1000),
    $("#add-todo-title").animate({
        fontSize: '-=36px'
    },1000),
    $('#button-submit-addTodo').animate({
        opacity: '-=1'
    })
    $("#add-todo-form").hide()
    addButton = 'show';
})

$('#show-personal-page-onprogress').click((e) => {
    e.preventDefault()
    $('#todolist').empty()
    $("#page-content-wrapper-personal").show()
    $("#page-content-wrapper-project").hide()
    $("#page-content-wrapper-project-todo").hide()
    $("#page-content-wrapper-personal").animate({
        width: '+=48%'
    }, 1000)
    $("#page-content-right").animate({
        width: '-=40%'
    }, 1000)
    $("#add-todo-form").animate({
        width: '-=800px'
    }, 1000),
    $("#add-todo-title").animate({
        fontSize: '-=36px'
    },1000),
    $('#button-submit-addTodo').animate({
        opacity: '-=1'
    })
    $("#add-todo-form").hide()
    addButton = 'show';
})

$('#show-personal-page-done').click((e) => {
    e.preventDefault()
    $('#todolist').empty()
    $("#page-content-wrapper-personal").show()
    $("#page-content-wrapper-project").hide()
    $("#page-content-wrapper-project-todo").hide()
    $("#page-content-wrapper-personal").animate({
        width: '+=48%'
    }, 1000)
    $("#page-content-right").animate({
        width: '-=40%'
    }, 1000)
    $("#add-todo-form").animate({
        width: '-=800px'
    }, 1000),
    $("#add-todo-title").animate({
        fontSize: '-=36px'
    },1000),
    $('#button-submit-addTodo').animate({
        opacity: '-=1'
    })
    $("#add-todo-form").hide()
    addButton = 'show';
})

$('#show-personal-page-starred').click((e) => {
    e.preventDefault()
    $('#todolist').empty()
    $("#page-content-wrapper-personal").show()
    $("#page-content-wrapper-project").hide()
    $("#page-content-wrapper-project-todo").hide()
    $("#page-content-wrapper-personal").animate({
        width: '+=48%'
    }, 1000)
    $("#page-content-right").animate({
        width: '-=40%'
    }, 1000)
    $("#add-todo-form").animate({
        width: '-=800px'
    }, 1000),
    $("#add-todo-title").animate({
        fontSize: '-=36px'
    },1000),
    $('#button-submit-addTodo').animate({
        opacity: '-=1'
    })
    $("#add-todo-form").hide()
    addButton = 'show';
})

$('#show-group-page').click((e) => {
    e.preventDefault()
    $('.project-page').empty()
    $("#page-content-wrapper-personal").hide()
    $("#page-content-wrapper-project").show()
    $("#page-content-wrapper-project-todo").show()
    generateProject()
    $("#page-content-wrapper-personal").animate({
        width: '+=48%'
    }, 1000)
    $("#page-content-right").animate({
        width: '-=40%'
    }, 1000)
    $("#add-todo-form").animate({
        width: '-=800px'
    }, 1000),
    $("#add-todo-title").animate({
        fontSize: '-=36px'
    },1000),
    $('#button-submit-addTodo').animate({
        opacity: '-=1'
    })
    $("#add-todo-form").hide()
    addButton = 'show';
    
})

$("#add-button-show").click(function() {
    if (addButton === 'show') {
        
        $("#page-content-wrapper-personal").animate({
            width: '-=48%'
        }, 1000)
        $("#page-content-right").animate({
            width: '+=40%'
        }, 1000)
        $("#add-todo-form").animate({
            width: '+=800px'
        }, 1000)
        $("#add-todo-title").animate({
            fontSize: '+=36px'
        },1000)
        addButton = 'hide';
        $('#button-submit-addTodo').animate({
            opacity: '+=1'
        })
        $("#add-todo-form").show()
    } else {
        
        $("#page-content-wrapper-personal").animate({
            width: '+=48%'
        }, 1000)
        $("#page-content-right").animate({
            width: '-=40%'
        }, 1000)
        $("#add-todo-form").animate({
            width: '-=800px'
        }, 1000),
        $("#add-todo-title").animate({
            fontSize: '-=36px'
        },1000),
        $('#button-submit-addTodo').animate({
            opacity: '-=1'
        })
        $("#add-todo-form").hide()
        addButton = 'show';
    }
})


// $(document).ready(function() {
//     $("#datepicker-group").datepicker({
//       format: "yyyy/mm/dd",
//       todayHighlight: true,
//       autoclose: true,
//       clearBtn: true
//     });
//   });
  
  
