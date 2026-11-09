const loginPage = document.getElementById("login");
const register = document.getElementById("login-to-register");
register.addEventListener("click", () => {
  loginPage.style.display = "none";
  registerPage.style.display = "flex";
});

const registerPage = document.getElementById("register");
const login = document.getElementById("register-to-login");
login.addEventListener("click", () => {
  loginPage.style.display = "flex";
  registerPage.style.display = "none";
});
