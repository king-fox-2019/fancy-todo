const baseURL = 'http://localhost:3000'

function isLogin() {
    if (localStorage.getItem('token')) {
        $('#login').hide()
        $('#home').show()
        getTodoList()
        $('.nav-name').html('Hi, '+localStorage.getItem('name'))
    } else {
        $('#login').show()
        $('#home').hide()
        $('#todo-list').empty()

    }
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    
    Swal.fire({
      title: `Connecting to server...`,
      allowOutsideClick: () => !Swal.isLoading()
    });
    
    Swal.showLoading();

    $.ajax({
      url: `${baseURL}/user/google`,
      method: 'post',
      data: {
        token: id_token
      }
    })
      .done(({ token, name }) => {
        localStorage.setItem('token', token)
        localStorage.setItem('name', name)
        isLogin()
        Swal.close()
        Swal.fire('Success!', "Your Account is Logged in!", 'success')
      })
      .fail(err => {
        let msg = "Fail to Login";
        Swal.fire("Error!", msg, "error");
      })
}
  
function getRegister() {
    let name = $('#nameRegister').val()
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()

    Swal.fire({
        title: `Creating Your Account...`,
        allowOutsideClick: () => !Swal.isLoading()
    });
    Swal.showLoading();

    $.ajax({
        url: `${baseURL}/user/register`,
        method: `post`,
        data: {
        name, email, password
        }
    })
        .done(({ token, name }) => {
            isLogin()
            Swal.close()
            Swal.fire('Success!', "Your Account is Created!", 'success')
            // $wrap.addClass('loginActive');
            // $wrap.removeClass('singUpActive');
        })
        .fail(err => {
            let error = err.responseJSON
            Swal.fire("Error!", `${error.message}`, "error");
        })
        .always(() => {
            $('#nameRegister').val('')
            $('#emailRegister').val('')
            $('#passwordRegister').val('')
        })
}
  
  
function getLogin() {
  
    let email = $('#emailLogin').val()
    let password = $('#passwordLogin').val()

    Swal.fire({
        title: `Connecting to Server...`,
        allowOutsideClick: () => !Swal.isLoading()
    });
    Swal.showLoading();

    $.ajax({
        url: `${baseURL}/user/login`,
        method: `post`,
        data: {
        email, password
        }
    })
        .done(({ token, name }) => {
            localStorage.setItem('token', token)
            localStorage.setItem('name', name)
            isLogin()
            Swal.close()
            Swal.fire('Success!', "Your Account is Logged in!", 'success')
        })
        .fail(err => {
            Swal.fire("Error!", err.responseJSON.message, "error");
        })
        .always(() => {
            $('#emailLogin').val('')
            $('#passwordLogin').val('')
        })
}
  
  function signOut() {
    if (gapi.auth2) {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
      });
    }
    localStorage.clear()
    sessionStorage.clear()
    $('#todo-list').empty()

    isLogin()
    Swal.fire('Success!', "Your Account is Logged out!", 'success')
  }
  