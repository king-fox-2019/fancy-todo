
function showHide(){
    if(!localStorage.access_token){
        $('.main-section').hide()
        $('#login-page').show()
    }else{
      $('.main-section').show()
      $('#login-page').hide()
      summonUser()
      summonTodo()
    }
    $('#register-page').hide()
    $('#alert').show()
    $('#search-list').hide()
}
showHide()

function loginTo(direction){
    if(direction == 'Register'){
        $('#login-page').hide()
        $('#register-page').show()
    }else{
        $('#login-page').show()
        $('#register-page').hide()
    }
}

$('#add-description').summernote({
  placeholder: 'Hello bootstrap 4',
  tabsize: 2,
  height: 200
});

$('#update-todo').submit(function(e){
  e.preventDefault()
  $('#updateTodo').modal('toggle');
  let id = $('#update-id').val()
  let title = $('#update-title').val()
  let description = $('#update-description').val()
  let dueDate = $('#update-duedate').val()
  dueDate = new Date(dueDate)
  let user = localStorage.id
  let token = localStorage.access_token
  $.ajax({
    url:`http://localhost:3000/todo/${id}`,
    method:'put',
    data:{ title, description, dueDate },
    headers: { token },
  }).done( data => {
    $('#alert').append(`
        <div id="sukses" class="alert alert-success cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Success Alert:</b> Success update Todo</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
        `)
        summonTodo()
  }).fail(err =>{
    console.log(err)
    $('#alert').append(`
        <div id="gagal" class="alert alert-danger cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Error Alert:</b> ${err.responseJSON.message}</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
      </div> 
        `)
  })
})

$('#add-todo').submit(function(e){
  e.preventDefault()
  $('#addTodo').modal('toggle');
  let title = $('#add-title').val()
  let description = $('#add-description').val()
  let dueDate = $('#add-duedate').val()
  dueDate = new Date(dueDate)
  let user = localStorage.id
  let token = localStorage.access_token
  $.ajax({
    url:`http://localhost:3000/todo/${user}`,
    method:'post',
    data:{ title, description, dueDate },
    headers: { token },
  }).done( data => {
    $('#alert').append(`
        <div id="sukses" class="alert alert-success cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Success Alert:</b> Success added Todo</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
        `)
        summonTodo()
  }).fail(err =>{
    console.log(err)
    $('#alert').append(`
        <div id="gagal" class="alert alert-danger cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Error Alert:</b> ${err.responseJSON.message}</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
      </div> 
        `)
  })
})

$(document).on('click','.update', function(){
  let no = $(this).attr('id')
  let id = $(`#idtodo${no}`).val()
  let title = $(`#titles${no}`).text()
  let desc =$(`#description${no}`).val()
  let date = $(`#dates${no}`).text().slice(0,10)
  console.log(date)
  $('#update-title').val(title)
  $('#update-id').val(id)
  $('#update-duedate').val(date)
  $('.update-desc').summernote('code',desc)


})

$(document).on('click','.delete', function(){
  let id = $(this).attr('id')
  let user = localStorage.id
  let token = localStorage.access_token
  $.ajax({
    url:`http://localhost:3000/todo/${id}`,
    method:'delete',
    headers: { token },
  }).done( data => {
    $('#alert').append(`
        <div id="sukses" class="alert alert-success cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Success Alert:</b> Success deleted Todo</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
        `)
        summonTodo()
  }).fail(err => {
    console.log(err)
    $('#alert').append(`
        <div id="gagal" class="alert alert-danger cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Error Alert:</b> ${err.responseJSON.message}</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
      </div> 
        `)
  })
})

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function onSignIn(googleUser) {
  var token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url:'http://localhost:3000/user/googlesign',
    method:'post',
    data: { token }
  }).done( user =>{
    localStorage.setItem('access_token',user.access_token)
    localStorage.setItem('id', user.id)
    showHide()
  }).fail( err =>{
    console.log(err)
    $('#alert').append(`
        <div id="gagal" class="alert alert-danger cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Error Alert:</b> ${err.responseJSON.message}</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
      </div> 
        `)
  })
}

$(document).on('click', '.daftar-user', function(){
  let id = $(this).attr('id')
  $('.hero-wrap').show()
  $('.ftco-section').show()
  $('#search-list').hide()
  summonUser(id)
  summonTodo(id)
  
})

$('#search-user').submit(function(e){
  e.preventDefault()
  let token = localStorage.access_token
  let name = $('#search-name').val()
  $.ajax({
    url:'http://localhost:3000/user',
    method:'get',
    data:{ name },
    headers: { token },
  }).done(users =>{
    console.log(users)
    $('.list-user').empty()
    $('.list-user').append('List User:')
    users.forEach(element => {
      $('.list-user').append(`
        <a class="btn btn-info btn-link daftar-user" role="button" style="font-size:25px;" id='${element._id}'><i class="ion-ios-heart"></i> ${element.name}</a>
      `)
      $('.hero-wrap').hide()
      $('.ftco-section').hide()
      $('#search-list').show()
    });
  }).fail(err=>{
    $('#alert').append(`
        <div id="gagal" class="alert alert-danger cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Error Alert:</b> ${err.responseJSON.message}</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
      </div> 
        `)
  })
  
})

function logout(){
  localStorage.removeItem('access_token')
  localStorage.removeItem('id')
  signOut()
  location.reload()
}

$(document).on('click','.check', function(){
  let id = $(this).attr('id')
  let status = $(`#${id}`).prop('checked')
  let user = localStorage.id
  let token = localStorage.access_token
  $.ajax({
    url:`http://localhost:3000/todo/${id}`,
    method:'patch',
    data:{ status },
    headers: { token },
  }).done( data => {
    
  }).fail(err =>{
    console.log(err)
    $('#alert').append(`
        <div id="gagal" class="alert alert-danger cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Error Alert:</b> ${err.responseJSON.message}</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
      </div> 
        `)
    })
})

function summonTodo(user){
  let token = localStorage.access_token
  if(!user){
    user = localStorage.id
  }
  $.ajax({
    url:`http://localhost:3000/todo/${user}`,
    method:'get',
    headers: { token }
  }).done(todo =>{
    $('#unauthorized').hide()
    $('#authorize-only').show()
    $('#accordion').empty()
    let i = 0
    todo.forEach(element => {
      let checkbox
      if(element.status){
        checkbox = `<input type="checkbox" class="fill-control-input check" id="${element._id}" checked>`
      }else{
        checkbox = `<input type="checkbox" id="${element._id}" class="fill-control-input check">`
      }
      $('#accordion').append(`
      <div class="card">
      <div class="card-header" id="heading${i}">
          <h2 class="mb-0">
              <button class="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                  <div class="form-check">
                      <label class="custom-control fill-checkbox">
                      <input type="hidden" value="${element.description}" id="description${i}"/>
                      <input type="hidden" value="${element._id}" id="idtodo${i}"/>
                      ${checkbox}
                      <span class="fill-control-indicator"></span>
                      <span class="fill-control-description" id="titles${i}">${element.title}</span>
                      </label>
                  </div>
                <i class="fa" aria-hidden="true"></i>
              </button>
            </h2>
          </div>
          <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordion">
            <div class="card-body text-left">
              ${element.description}
              -<p id="dates${i}">${element.dueDate}</p>-
              <button type="button" id="${i}" class="btn btn-outline-success update" data-toggle="modal" data-target="#updateTodo">Success</button>
              <button type="button" id="${element._id}" class="btn btn-outline-danger delete" style="margin-top: 15px;">Delete</button>
            </div>
          </div>
      </div>
      `) 
      i++
    });
  }).fail(err=>{
    $('#unauthorized').show()
    $('#authorize-only').hide()
    if(err.status != 401){
      $('#alert').append(`
        <div id="gagal" class="alert alert-danger cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Error Alert:</b> ${err.responseJSON.message}</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
      </div> 
        `)
    }
    
  })
}

function summonUser(user){
  let token = localStorage.access_token
  if(!user){
    user = localStorage.id
  }
  $.ajax({
    url:`http://localhost:3000/user/${user}`,
    method:'get',
    headers: { token }
  }).done(user =>{
    $('#username').text(user.name)
  }).fail(err=>{
    $('#alert').append(`
        <div id="gagal" class="alert alert-danger cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Error Alert:</b> ${err.responseJSON.message}</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
      </div> 
        `)
  })
}

$('#login-form').submit(function(event){
  event.preventDefault()
  let email = $('#login-email').val()
  let password = $('#login-password').val()
  $.ajax({
    url:'http://localhost:3000/user/login',
    method:'post',
     data: { email, password }
  }).done(user => {
    localStorage.setItem('access_token',user.access_token)
    localStorage.setItem('id', user.id)
    showHide()
  }).fail(err=>{
    console.log(err.responseJSON)
        $('#alert').append(`
        <div id="gagal" class="alert alert-danger cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Error Alert:</b> ${err.responseJSON.message}</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
      </div> 
        `)
  })
})

$('#register-form').submit(function(event){
    event.preventDefault()
    let email = $('#register-email').val()
    let name = $('#register-name').val()
    let password = $('#register-password').val()
    $.ajax({
        url:'http://localhost:3000/user/register',
        method:'post',
        data: { email, name, password }
    }).done(user => {
        $('#alert').append(`
        <div id="sukses" class="alert alert-success cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Success Alert:</b> Register Success! please Login</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
        `)
    }).fail( err => {
        console.log(err.responseJSON)
        $('#alert').append(`
        <div id="gagal" class="alert alert-danger cen"style="width:40%; margin-left:30%;">
        <div class="container" >
          <div class="d-flex">
            <div class="alert-icon">
              <i class="ion-ios-checkmark-circle"></i>
            </div>
            <p class="mb-0 ml-2"><b>Error Alert:</b> ${err.responseJSON.message}</p>
          </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"><i class="ion-ios-close"></i></span>
          </button>
        </div>
      </div> 
        `)
    })
})
