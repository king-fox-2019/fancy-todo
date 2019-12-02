$( document ).ready(function() {
    $(".login").hide();

    $( '#login-now' ).click(function() {
        $( ".register" ).fadeOut( "slow", function(){
            $( ".login" ).show()
        });
    });

    $( '#register-now' ).click(function() {
        $( ".login" ).fadeOut( "slow", function(){
            $( ".register" ).show()
        });
    });
    
    $('#register-form').on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: `${BASE_URL}/users/signup`,
            data: $(this).serialize(),
        })
            .done( data => {
                showSuccessMessage('Registration Success!')
            })
            .fail( err => {
                showErrorMessage(err.responseText);
            })
    });

    $('#login-form').on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: `${BASE_URL}/users/signin`,
            data: $(this).serialize()
        })
            .done( data => {
                localStorage.setItem('jwt_token', data.token);
                localStorage.setItem('email', data.email);
                event.preventDefault();
                $.router.go("home");
            })
            .fail( err => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    type: 'error',
                    confirmButtonText: 'Cool'
                })
                showErrorMessage(err.responseText);
            })
    });
});

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax("http://fancytodoserver.angelavanessa.com/gSignIn", {
        method: "POST",
        data: {
            id_token
        }
    })
    .done( data => {
        localStorage.setItem('jwt_token', data.token);
        return;   
    })
    .fail( err => {
        console.log(err)
    })
}