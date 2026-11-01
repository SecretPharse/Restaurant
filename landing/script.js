document.getElementById("to-login").addEventListener("click", () => {
  document.getElementById("popup-login").style.display = "flex";
  document.getElementById("popup-register-page1").style.display = "none";
});
document.getElementById("to-register").addEventListener("click", () => {
  document.getElementById("popup-login").style.display = "none";
  document.getElementById("popup-register-page1").style.display = "flex";
});
document.getElementById("next-to-page2").addEventListener("click", () => {
  document.getElementById("popup-register-page1").style.display = "none";
  document.getElementById("popup-register-page2").style.display = "flex";
})
document.getElementById("back-to-page1").addEventListener("click", () => {
  document.getElementById("popup-register-page1").style.display = "flex";
  document.getElementById("popup-register-page2").style.display = "none";
})
document.getElementById("register").addEventListener("click", () => {
  document.getElementById("popup-OTP").style.display = "flex";
});
document.getElementById("back-register").addEventListener("click", () => {
  document.getElementById("popup-OTP").style.display = "none";
});
document.getElementById("reset-password").addEventListener("click", () => {
  document.getElementById("popup-reset-password").style.display = "flex";
});
document.getElementById("back-login").addEventListener("click", () => {
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
  var input = document.getElementById("input-new-password");
  if (input.type === "password") {
    input.type = "text";
    eye.src = "assets/visibility_on.svg";
  } else {
    input.type = "password";
    eye.src = "assets/visibility_off.svg";
  }
});
document.getElementById("eye-confirmation-new-password").addEventListener("click", () => {
  var eye = document.getElementById("eye-confirmation-new-password");
  var input = document.getElementById("input-confirmation-new-password");
  if (input.type === "password") {
    input.type = "text";
    eye.src = "assets/visibility_on.svg";
  } else {
    input.type = "password";
    eye.src = "assets/visibility_off.svg";
  }
});