document.getElementById("to-login").addEventListener("click", () => {
    document.getElementById("popup-login").style.display = "flex";
    document.getElementById("popup-register").style.display = "none";
});
document.getElementById("to-register").addEventListener("click", () => {
    document.getElementById("popup-login").style.display = "none";
    document.getElementById("popup-register").style.display = "flex";
});