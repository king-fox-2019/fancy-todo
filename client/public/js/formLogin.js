$(document).ready(function() {
  if (localStorage.getItem("user")) {
    renderUserSignin();
  }
});

function renderUserSignin() {
  $("#user-nav-signin").append(`
      <p>${localStorage.getItem("user")}</p>
  `);
}

function renderModalSignin() {
  $("#modal-signin").modal("show");
  $("#modal-signup").modal("hide");
  $("#signup-name").val("");
  $("#signup-email").val("");
  $("#signup-password").val("");
  $("#sign-check").click(function() {
    checked();
  });
  $("#close-modal-signin").click(function() {
    $("#modal-signin").modal("hide");
    $("#signin-email").val("");
    $("#signin-password").val("");
    $("#sign-check").prop("checked", false);
    checked();
  });
}

function renderModalSignup() {
  $("#modal-signup").modal("show");
  $("#modal-signin").modal("hide");
  $("#signin-email").val("");
  $("#signin-password").val("");
  $("#sign-check").prop("checked", false);
  $("#btn-backsignin").click(function() {
    renderModalSignin();
    $("#sign-check").prop("checked", false);
    checked();
  });
}

function signUp(event) {
  event.preventDefault();
  let name = $("#signup-name").val();
  let email = $("#signup-email").val();
  let password = $("#signup-password").val();
  $.ajax({
    url: baseUrl + "/users/signup",
    method: "POST",
    data: {
      name,
      email,
      password
    }
  })
    .done(response => {
      renderModalSignin();
      alertify.success(response.message);
    })
    .fail(err => {
      let msg = err.responseJSON.errors;
      let text = "";
      msg.forEach(element => {
        text += element + ", ";
      });
      alertify.error(text);
    })
    .always(_ => {
      $("#signup-name").val("");
      $("#signup-email").val("");
      $("#signup-password").val("");
    });
}

function signIn() {
  let email = $("#signin-email").val();
  let password = $("#signin-password").val();
  if ($("#sign-check").prop("checked")) {
    $.ajax({
      url: baseUrl + "/users/signin",
      method: "POST",
      data: {
        email,
        password
      }
    })
      .done(response => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", response.user);
        $("#user-nav-signin").append(`
          <p>${localStorage.getItem("user")}</p>
        `);
        $("#modal-signin").modal("hide");
        $(".all-page").show();
        $(".page-beforesignin").hide();
        alertify.success(response.message);
        setTimeout(() => {
          alertify.message("Welcome, " + response.user);
        }, 3000);
      })
      .fail(err => {
        let msg = err.responseJSON.errors;
        let text = "";
        msg.forEach(element => {
          text += element + ", ";
        });
        alertify.error(text);
      })
      .always(_ => {
        $("#signin-email").val("");
        $("#signin-password").val("");
        $("#sign-check").prop("checked", false);
        checked();
      });
  }
}

function checked() {
  // console.log($("#sign-check").prop("checked"));
  if ($("#sign-check").prop("checked")) {
    $("#btn-signin-check").removeClass("disabled");
  } else {
    $("#btn-signin-check").addClass("disabled");
  }
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: baseUrl + "/users/googlesignin",
    method: "POST",
    data: {
      id_token
    }
  })
    .done(response => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", response.user);
      $("#user-nav-signin").append(`
        <p>${localStorage.getItem("user")}</p>
      `);
      $("#modal-signin").modal("hide");
      $(".all-page").show();
      $(".page-beforesignin").hide();
      alertify.success(response.message);
      setTimeout(() => {
        alertify.message("Welcome, " + response.user);
      }, 3000);
    })
    .fail(err => {
      alertify.error(err, ", failed signin via google");
    })
    .always(_ => {});
}

function signOut() {
  $("#user-nav-signin").empty();
  if (gapi.auth2 !== undefined) {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2
      .signOut()
      .then(() => {
        alertify.success("Have Nice Day, " + localStorage.getItem("user"));
        localStorage.removeItem("token");
        $(".all-page").hide();
        $(".page-beforesignin").show();
        checked();
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    localStorage.removeItem("token");
    $(".all-page").hide();
    $(".page-beforesignin").show();
    alertify.success("Have Nice Day");
    checked();
  }
}
