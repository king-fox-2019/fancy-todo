const baseUrl = "http://localhost:3000/users";

function renderModalSignin() {
  $("#modal-signin").modal("show");
  $("#modal-signup").modal("hide");
}

function renderModalSignup() {
  $("#modal-signup").modal("show");
  $("#modal-signin").modal("hide");
}

function signUp(event) {
  event.preventDefault();
  let name = $("#signup-name").val();
  let email = $("#signup-email").val();
  let password = $("#signup-password").val();
  $.ajax({
    url: baseUrl + "/signup",
    method: "POST",
    data: {
      name,
      email,
      password
    }
  })
    .done(response => {
      // console.log(response);
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
      url: baseUrl + "/signin",
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
      });
  }
  console.log($("#sign-check").prop("checked"));
  // console.log(email, password);
}

function checked() {
  if ($("#sign-check").prop("checked")) {
    $("#btn-signin").removeClass("disabled");
  } else {
    $("#btn-signin").addClass("disabled");
  }
  console.log($("#sign-check").prop("checked"));
}

function signOut() {
  localStorage.removeItem("token");
  $(".all-page").hide();
  $(".page-beforesignin").show();
}
