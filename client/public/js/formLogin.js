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

function signIn(event) {
  event.preventDefault();
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
        $("#modal-signin").modal("hide");
        localStorage.setItem("token", response.token);
        $(".all-page").show();
        $(".page-beforesignin").hide();
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

function signOut() {
  localStorage.removeItem("token");
  $(".all-page").hide();
  $(".page-beforesignin").show();
  alertify.success("Have Nice Day");
  checked();
}
