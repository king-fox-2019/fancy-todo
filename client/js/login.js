function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  
  $.ajax({
    url: `${baseURL}/user/google`,
    method: "post",
    data: {
      token: id_token
    }
  })
    .done(({ token }) => {
      localStorage.setItem("token", token);
      islogin();
    })
    .fail(err => {
      let msg = "Fail to Login";
    });
}

function getRegister() {
  let name = $("#nameRegister").val();
  let email = $("#emailRegister").val();
  let password = $("#passwordRegister").val();

  $.ajax({
    url: `${baseURL}/user`,
    method: `post`,
    data: {
      name,
      email,
      password
    }
  })
    .done(({ token, name }) => {
      islogin();
    })
    .fail(err => {
      let error = err.responseJSON;
    })
    .always(() => {
      $("#nameRegister").val("");
      $("#emailRegister").val("");
      $("#passwordRegister").val("");
    });
}

function getLogin() {
  let email = $("#emailLogin").val();
  let password = $("#passwordLogin").val();

  $.ajax({
    url: `${baseURL}/user/login`,
    method: `post`,
    data: {
      email,
      password
    }
  })
    .done(({ token }) => {
      localStorage.setItem("token", token);
      islogin();
    })
    .fail(err => {
    
    })
    .always(() => {
      $("#emailLogin").val("");
      $("#passwordLogin").val("");
    });
}

function signOut() {
  if (gapi.auth2) {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {});
  }
  localStorage.clear();
  sessionStorage.clear();

  islogin();
  
}

function welcome() {
  
}


var $wrap = $("#main");
var $signUpBtn = $wrap.find("#signUpBtn");
var $loginBtn = $wrap.find("#loginBtn");

$signUpBtn.on("click", function() {
  $wrap.addClass("singUpActive");
  $wrap.removeClass("loginActive");
});

$loginBtn.on("click", function() {
  $wrap.addClass("loginActive");
  $wrap.removeClass("singUpActive");
});
