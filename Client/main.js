$(document).ready(function(){
  showHome()
})

function showHome(){
  toggle({innerText: 'Register'})
  setOnClick()
  $('#content').hide()
}

function toggle(element){
  $('#failMessage').empty()
  if (element.innerText != 'Login'){
    $('#register').show()
    $('#login').hide()
  }
  else {
    $('#login').show()
    $('#register').hide()
  }
}

function setOnClick(){
  $('button').on('click', function(event){
    event.preventDefault()
  })
  $('a').on('click', function(event){
    event.preventDefault()
    toggle(this)
  })
}

function register(){
  $.ajax({
    method: 'post',
    url: 'http://localhost:3000/users',
    data: {
      email: $('#emailReg').val(),
      password: $('#passwordReg').val()
    }
  })
    .always(function(){
      $('#failMessage').empty()
    })
    .done(function(){
      $('#login').show()
      $('#register').hide()
    })
    .fail(function(err){
      $('#failMessage').append(`<p>${err.responseJSON.message}</p>`)
    })
}

function login(){
  $.ajax({
    method: 'post',
    url: 'http://localhost:3000/users/login',
    data: {
      email: $('#emailLogin').val(),
      password: $('#passwordLogin').val()
    }
  })
    .always(function(){
      $('#failMessage').empty()
    })
    .done(function(token){
      localStorage.setItem('access_token', token)
      showTodo()
    })
    .fail(function(err){
      $('#failMessage').empty()
      $('#failMessage').append(`<p>${err.responseJSON.message}</p>`)
    })
  }

function showTodo(){
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/todos',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .always(function(data){
      console.log('showtodo',data)
    })
}

function deleteAccount(){
  $.ajax({
    method: 'delete',
    url: `http://localhost:3000/users`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function(){
      console.log('success')
    })
    .fail(function(err){
      $('#failMessage').empty()
      $('#failMessage').append(`<p>${err.responseJSON.message}</p>`)
    })
}