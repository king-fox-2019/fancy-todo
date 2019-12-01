function signin(){
    let email = $('#loginEmail').val()
    let password = $('#loginPassword').val()
    event.preventDefault()
    $.ajax({
        method:"post",
        url:"http://localhost:3000/user/signin",
        data:{
            email:email,
            password:password
        }
    })
    .done(data=>{
            localStorage.setItem('token',data.token)
            localStorage.setItem('userId',data.userId)
            localStorage.setItem('userEmail',   data.userEmail)
            location.reload()
    })
    .fail(err=>{
        $('#errorLogin').empty()
        $('#errorLogin').append(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">Wrong username/password or not registered</div>
        `)
        setTimeout(function(){
            $('#errorLogin').hide()
        },1500)
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:"post",
        url:"http://localhost:3000/user/googleSignIn",
        data:{id_token}
    })
    .done(data=>{
        localStorage.setItem('token',data.token)
        localStorage.setItem('userId',data.userId)
        localStorage.setItem('userEmail',data.userEmail)
        $('.register').hide()
        $('.signin').hide()
        $('.home').show()
    })
    .fail(err=>{
        $('#errorLogin').empty()
        $('#errorLogin').append(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">Wrong username/password or not registered</div>
        `)
        setTimeout(() => {
            $('#errorLogin').hide()
        }, 1500);
    })
  }

function logout(){
    if(gapi.auth2){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
    }
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    location.reload()
}