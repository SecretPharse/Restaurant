// Login
const loginPage = document.getElementById("login");
const passwordLogin = document.getElementById("password-login");

const login = document.getElementById("register-to-login");
login.addEventListener("click", () => {
  loginPage.style.display = "flex";
  registerPage.style.display = "none";
});

const sensorLogin = document.getElementById("visibility-login");
sensorLogin.addEventListener("click", () => {
  if (passwordLogin.type === "password") {
    sensorLogin.src = "/assets/visibility_on.svg";
    passwordLogin.type = "text";
  } else {
    sensorLogin.src = "/assets/visibility_off.svg";
    passwordLogin.type = "password";
  }
});

// Register
const registerPage = document.getElementById("register");
const register = document.getElementById("login-to-register");
const passwordRegister = document.getElementById("password-register");
register.addEventListener("click", () => {
  loginPage.style.display = "none";
  registerPage.style.display = "flex";
  passwordLogin.value = "";
});

const sensorRegister = document.getElementById("visibility-register");
sensorRegister.addEventListener("click", () => {
  if (passwordRegister.type === "password") {
    sensorRegister.src = "/assets/visibility_on.svg";
    passwordRegister.type = "text";
  } else {
    sensorRegister.src = "/assets/visibility_off.svg";
    passwordRegister.type = "password";
  }
});