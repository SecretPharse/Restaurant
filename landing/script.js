document.getElementById("reset-password").addEventListener("click", () => {
  document.getElementById("popup-reset-password").style.display = "flex";
});
document.getElementById("login").addEventListener("click", () => {
  var email = document.getElementById("email-login").value;
  var password = document.getElementById("password-login").value;
  var email_alert = document.getElementById("alert-email-login");
  var password_alert = document.getElementById("alert-password-login");
  email_alert.textContent = "";
  password_alert.textContent = "";

  if (email.trim() == "") {
    email_alert.textContent = "Email kosong";
  }
  if (password.trim() == "") {
    password_alert.textContent = "Kata Sandi kosong";
  }
  if (email.trim() != "" && password.trim() != "") {
    document.getElementById("login").disabled = true;
    document.getElementById("alert-email-login").textContent = "";
    document.getElementById("alert-password-login").textContent = "";
    document.getElementById("text-btn-login").hidden = true;
    document.getElementById("spinner-login").hidden = false;
  }
  return;
});
document.getElementById("to-register").addEventListener("click", () => {
  document.getElementById("email-login").value = "";
  document.getElementById("password-login").value = "";
  document.getElementById("popup-login").style.display = "none";
  document.getElementById("popup-register-page1").style.display = "flex";
});
document.getElementById("next-to-page2").addEventListener("click", () => {
  var name = document.getElementById("name-register").value;
  var email = document.getElementById("email-register").value;
  var telp = document.getElementById("telp-register").value;
  var address = document.getElementById("address-register").value;


  document.getElementById("popup-register-page1").style.display = "none";
  document.getElementById("popup-register-page2").style.display = "flex";
});
document.getElementById("to-login").addEventListener("click", () => {
  document.getElementById("name-register").value = "";
  document.getElementById("email-register").value = "";
  document.getElementById("telp-register").value = "";
  document.getElementById("address-register").value = "";
  document.getElementById("open-time-register").value = "";
  document.getElementById("close-time-register").value = "";
  document.getElementById("num-worker-register").value = "";
  document.getElementById("password-register").value = "";
  document.getElementById("confirmation-password").value = "";
  document.getElementById("popup-login").style.display = "flex";
  document.getElementById("popup-register-page1").style.display = "none";
});
document.getElementById("register").addEventListener("click", () => {
  document.getElementById("popup-OTP").style.display = "flex";
});
document.getElementById("back-to-page1").addEventListener("click", () => {
  document.getElementById("popup-register-page1").style.display = "flex";
  document.getElementById("popup-register-page2").style.display = "none";
});
document.getElementById("back-register").addEventListener("click", () => {
  document.getElementById("OTP").value = "";
  document.getElementById("popup-OTP").style.display = "none";
});
document.getElementById("back-login").addEventListener("click", () => {
  document.getElementById("OTP-reset-password").value = "";
  document.getElementById("new-password").value = "";
  document.getElementById("confirmation-new-password").value = "";
  document.getElementById("popup-reset-password").style.display = "none";
});
document.getElementById("eye-icon-login").addEventListener("click", () => {
  var eye = document.getElementById("eye-icon-login");
  var input = document.getElementById("password-login");
  if (input.type === "password") {
    input.type = "text";
    eye.src = "assets/visibility_on.svg";
  } else {
    input.type = "password";
    eye.src = "assets/visibility_off.svg";
  }
});
document.getElementById("eye-icon-register").addEventListener("click", () => {
  var eye = document.getElementById("eye-icon-register");
  var input = document.getElementById("password-register");
  if (input.type === "password") {
    input.type = "text";
    eye.src = "assets/visibility_on.svg";
  } else {
    input.type = "password";
    eye.src = "assets/visibility_off.svg";
  }
});
document
  .getElementById("eye-icon-confirmation")
  .addEventListener("click", () => {
    var eye = document.getElementById("eye-icon-confirmation");
    var input = document.getElementById("confirmation-password");
    if (input.type === "password") {
      input.type = "text";
      eye.src = "assets/visibility_on.svg";
    } else {
      input.type = "password";
      eye.src = "assets/visibility_off.svg";
    }
  });
document.getElementById("eye-new-password").addEventListener("click", () => {
  var eye = document.getElementById("eye-new-password");
  var input = document.getElementById("new-password");
  if (input.type === "password") {
    input.type = "text";
    eye.src = "assets/visibility_on.svg";
  } else {
    input.type = "password";
    eye.src = "assets/visibility_off.svg";
  }
});
document
  .getElementById("eye-confirmation-new-password")
  .addEventListener("click", () => {
    var eye = document.getElementById("eye-confirmation-new-password");
    var input = document.getElementById("confirmation-new-password");
    if (input.type === "password") {
      input.type = "text";
      eye.src = "assets/visibility_on.svg";
    } else {
      input.type = "password";
      eye.src = "assets/visibility_off.svg";
    }
  });
