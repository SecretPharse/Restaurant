// Login
const loginPage = document.getElementById("login");
const emailLogin = document.getElementById("email-login");
const passwordLogin = document.getElementById("password-login");
const sensorLogin = document.getElementById("sensor-login");
const loginToRegister = document.getElementById("login-to-register");

sensorLogin.addEventListener("click", () => {
  if (passwordLogin.type === "password") {
    sensorLogin.src = "./assets/visibility_on.svg";
    passwordLogin.type = "text";
  } else {
    sensorLogin.src = "./assets/visibility_off.svg";
    passwordLogin.type = "password";
  }
});

loginToRegister.addEventListener("click", () => {
    loginPage.style.display = "none";
    registerPage.style.display = "flex";
})

// Resgister Page 1
const registerPage = document.getElementById("register");
const registerToLogin = document.getElementById("register-to-login");

registerToLogin.addEventListener("click", () => {
    loginPage.style.display = "flex";
    registerPage.style.display = "none";
})