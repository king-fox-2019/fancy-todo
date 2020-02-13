const baseUrl = 'http://35.247.132.100/'

$(document).ready(function () {
  $(function(){
    var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    
    var maxDate = year + '-' + month + '-' + day;
  
    // $('#todo-input-datepicker').attr('min', maxDate);
    $('#todo-update-datepicker').attr('min', maxDate);
    $('.datepicker').attr('min', maxDate);
  })

  $('.collapse').on('show.bs.collapse', function(e) {
    console.log('this pas collapse show', this);
    
    var $card = $(this).closest('.card');
    var $open = $($(this).data('parent')).find('.collapse.show');
  
    var additionalOffset = 0;
    if($card.prevAll().filter($open.closest('.card')).length !== 0)
    {
          additionalOffset =  $open.height();
    }
    $('html,body').animate({
      scrollTop: $card.offset().top - additionalOffset
    }, 500);
  })

  checkToken()
})

function checkToken() {
  $('#notifications').hide()
  $('#project-create').hide()
  $('#project-container').hide()
  $('#project-items').hide()
  // $('#todo-input-update').hide()

  let access_token = localStorage.getItem("access_token")
  if (access_token) {

    fetchCurrentUserData()
    .done(user => {
      $('.dropdown-username').html(`${user.name}`)
      if (user.notifications.length === 0) {
        $('.badge').hide()
        $('.notif-amount').html('')
      } else {
        $('.badge').show()
        $('.badge').html(user.notifications.length)
        $('.notif-amount').html(`(${user.notifications.length})`)
      }
    })
    .fail(err => console.log('failed to fetch current user data', err))

    // navs
    $('#register').hide()
    $('#sign-in').hide()
    $("#profile").show()

    // forms
    $('#registration-form').hide()
    $('#signin-form').hide()
    $('#todo-input').show()

    // todo items
    getTodoItems()

    // change background
    changeToBgGeneral()

    // show barriers
    $('.barrier').show()
  }
  else {
    // navs
    $("#profile").hide()
    $('#register').show()
    $('#sign-in').show()

    // forms
    $('#registration-form').hide()
    $('#signin-form').hide()
    $('#todo-input').hide()
    $('#todo-input-update').hide()

    // todo items
    $('#todo-container').hide()

    // change background
    changeToBgWithWords()

    // hide barriers
    $('.barrier').hide()
  }
}

function displayRegistrationForm(event) {
  event.preventDefault()
  $('#signin-form').hide()
  $('#todo-container').hide()
  $('#registration-form').show()
}

function displaySignInForm(event) {
  event.preventDefault()
  $('#registration-form').hide()
  $('#todo-container').hide()
  $('#signin-form').show()
}

function displayTodoItems() {
  $('#todo-container').show()
}

function changeToBgWithWords() {
  $('html').css({
    "background": "url(./images/background-home.png) no-repeat center center fixed",
    "-webkit-background-size": "cover",
    "-moz-background-size": "cover",
    "-o-background-size": "cover",
    "background-size": "cover"
  })
}

function changeToBgGeneral() {
  $('html').css({
    "background": "url(./images/background-general.png) no-repeat center center fixed",
    "-webkit-background-size": "cover",
    "-moz-background-size": "cover",
    "-o-background-size": "cover",
    "background-size": "cover"
  })
}

function redirectToHome(event) {
  event.preventDefault()
  checkToken()
  $("#todo-input-update").hide()
  $('.squiggly-home').show()
}