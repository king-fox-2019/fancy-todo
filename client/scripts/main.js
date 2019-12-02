"use strict"

$(document).ready(function () {

  // $(window).bind('unload', function () {
  //   localStorage.clear()
  // })

  $(".email-signup").hide();
  $("#signup-box-link").click(function(){
    $(".email-login").fadeOut(100);
    $(".email-signup").delay(100).fadeIn(100);
    $("#login-box-link").removeClass("active");
    $("#signup-box-link").addClass("active");
  });
  $("#login-box-link").click(function(){
    $(".email-login").delay(100).fadeIn(100);;
    $(".email-signup").fadeOut(100);
    $("#login-box-link").addClass("active");
    $("#signup-box-link").removeClass("active");
  });

  $('#register-btn').click(function(e) {
    e.preventDefault();
    register()
  })

  $('#login-btn').click(function(e) {
    e.preventDefault();
    login()
  })

  $('.btn_add_fin').click(function(e) {
    e.preventDefault();
    addTask();
  })

  setPage();

});

function setPage() {
  if (localStorage.getItem('token')) {
    $('.login-box').hide()
    $('.cont_principal').show()
  } else {
    $('.cont_principal').hide()
    $('.login-box').show()
  }
}

function register() {
  let name = $('#register-name').val()
  console.log(name)
  $.ajax({
    method: "post",
    url: `http://localhost:3000/users/register`,
    data: {
      name: $('#register-name').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val()
    }
  })
    .done((data) => {
      console.log(data);
      askLogin(data.name)
    })
    .fail((data) => {
      console.log(gagal);
      Swal.fire(data.responseText)
    })
}

function login() {
  let name = $('#login-email').val()
  console.log(name)
  $.ajax({
    method: "post",
    url: `http://localhost:3000/users/login`,
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    }
  })
    .done(function(data) {
      localStorage.setItem('token', data.token)
      setPage();
      console.log(localStorage)
    })
    .fail(function(data) {
      console.log(data);
      Swal.fire(data.responseText)
    })
}
  
function askLogin(name) {
  Swal.fire(`Hi ${name},
  Please login to access our home page`)
}

function onSignIn(googleUser) {
  let id = googleUser.getAuthResponse().id_token;
  console.log(id)
  $.ajax({
    method: 'post',
    url: 'http://localhost:3000/googlelogin',
    data: {
      id_token: id
    }
  })
    .done(response=> {
      localStorage.setItem('token', response.token)
      setPage();
      console.log(response.token)
      console.log(localStorage)
    })
    .fail(err => {
      console.log('gagal')
      console.log(localStorage)
      console.log(err)
    })
}

function signOut() {
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    console.log(localStorage);
    localStorage.removeItem('token')
    setPage();
  });
}

function addTask() {
  $.ajax({
    method: "post",
    url: `http://localhost:3000/tasks`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      name: $('.input_title_desc').val(),
      description: $('input_description').val(),
      due_date: $('#date_select').val(),
    }
  })
    .done(function(data) {
      console.log(data)
      add_to_list();
      // localStorage.setItem('token', data.token)
      console.log(localStorage)
    })
    .fail(function(data) {
      console.log(data.responseText);
      Swal.fire(data.responseText)
    })
}

function deleteTask() {
  $.ajax({
    method: "delete",
    url: `http://localhost:3000/${this._id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(function(data) {
      console.log(data)
      add_to_list();
      // localStorage.setItem('token', data.token)
      console.log(localStorage)
    })
    .fail(function(data) {
      console.log(data.responseText);
      Swal.fire(data.responseText)
    })
}

function editTask() {
  $.ajax({
    method: "post",
    url: `http://localhost:3000/tasks`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      name: $('.input_title_desc').val(),
      description: $('input_description').val(),
      due_date: $('#date_select').val(),
    }
  })
    .done(function(data) {
      console.log(data)
      add_to_list();
      // localStorage.setItem('token', data.token)
      console.log(localStorage)
    })
    .fail(function(data) {
      console.log(data.responseText);
      Swal.fire(data.responseText)
    })
}

let number = 0
let select_opt = 0;
function add_to_list() {
  let action = $('#action_select').val();
  let description = $('.input_description').val(); 
  let title = $('.input_title_desc').val();
  let date = $('#date_select').val();
  switch (action) {
    case "STUDY":
  select_opt  = 0;
      break;
  case "WORK":
  select_opt = 1; 
      break;
  case "SPORT":
  select_opt = 2;
      break;
  case "HOUSEHOLD":
  select_opt = 3; 
      break;
  case "OTHERS":
  select_opt = 4; 
      break;
  }      
  let class_li  =['list_study list_dsp_none','list_work list_dsp_none','list_sport list_dsp_none','list_household list_dsp_none','list_others list_dsp_none'];  
  let cont = '<div class="col_md_1_list">    <p>'+action+'</p>    </div> <div class="col_md_2_list"> <h4>'+title+'</h4> <p>'+description+'</p> </div>    <div class="col_md_3_list"> <div class="cont_text_date"> <p>'+date+'</p>  </div>  <div class="cont_btns_options">    <ul>  <li><a href="#finish" onclick="finish_action('+select_opt+','+number+');" ><i class="material-icons">&#xE5CA;</i></a></li>   </ul>  </div>    </div>';  
  let li = document.createElement('li')  
  li.className = class_li[select_opt]+" li_num_"+number;
  li.innerHTML = cont;
  document.querySelectorAll('.cont_princ_lists > ul')[0].appendChild(li);

  setTimeout(function() {
    document.querySelector('.li_num_'+number).style.display = "block";
  },100);
    
  setTimeout(function() {
    document.querySelector('.li_num_'+number).className = "list_dsp_true "+class_li[select_opt]+" li_num_"+number;
    number++;
  }, 200);  
}

function finish_action(num, num2) {
  let class_li  =['list_study list_dsp_true','list_work  list_dsp_true','list_sport list_dsp_true','list_household list_dsp_true','list_others list_dsp_true'];   
  document.querySelector('.li_num_'+num2).className = class_li[num]+" list_finish_state"; 
  setTimeout(function() {
    del_finish();
  }, 500);
}

function del_finish() {
  let li = $('.list_finish_state');
  for(let e = 0; e < li.length; e++) {
    li[e].style.opacity = "0";
    li[e].style.height = "0px";      
    li[e].style.margin = "0px";      
  }
  setTimeout(function(){
    let li = $('.list_finish_state');
    for(let e = 0; e < li.length; e++){
      li[e].parentNode.removeChild(li[e]); 
    }
  }, 500);
}

let t = 0;
function add_new() {  
  if (t % 2 === 0){  
    $('.cont_crear_new').addClass("cont_crear_new_active");
    $('.cont_add_titulo_cont').addClass("cont_add_titulo_cont_active");
    t++;
  } else {
    $('.cont_crear_new').removeClass("cont_crear_new_active");
    $('.cont_add_titulo_cont').removeClass("cont_add_titulo_cont_active");  
    t++;
  } 
}

