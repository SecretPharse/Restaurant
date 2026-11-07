var ServerURL = {
  Register: "http://127.0.0.1:8080/Register",
  NewOTP: "http://127.0.0.1:8080/New-OTP",
  CancelRegister: "http://127.0.0.1:8080/CancelRegister",
  Verification: "http://127.0.0.1:8080/Verification",
  Login: "http://127.0.0.1:8080/Login",
};

document.getElementById("reset-password").addEventListener("click", () => {
  document.getElementById("popup-reset-password").style.display = "flex";
});
document.getElementById("login").addEventListener("click", async () => {
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
    document.getElementById("text-btn-login").hidden = true;
    document.getElementById("spinner-login").hidden = false;

    const request = await fetch(ServerURL["Login"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });
    const response = await request.json();
    if (response.Status === true) {
      sessionStorage.setItem("Email", email);

      alert(response.name);
    } else if (response.Status === false) {
      if (response.Type == "Email") {
        email_alert.textContent = response.Detail;
      } else if (response.Type == "Password") {
        password_alert.textContent = response.Detail;
      }
      document.getElementById("login").disabled = false;
      document.getElementById("text-btn-login").hidden = false;
      document.getElementById("spinner-login").hidden = true;
    }
  }
  return;
});
document.getElementById("to-register").addEventListener("click", () => {
  document.getElementById("email-login").value = "";
  document.getElementById("password-login").value = "";
  document.getElementById("alert-email-login").textContent = "";
  document.getElementById("alert-password-login").textContent = "";
  document.getElementById("popup-login").style.display = "none";
  document.getElementById("popup-register-page1").style.display = "flex";
});
document.getElementById("next-to-page2").addEventListener("click", () => {
  var name = document.getElementById("name-register").value;
  var email = document.getElementById("email-register").value;
  var telp = document.getElementById("telp-register").value;
  var address = document.getElementById("address-register").value;

  var name_alert = document.getElementById("alert-name-register");
  var email_alert = document.getElementById("alert-email-register");
  var telp_alert = document.getElementById("alert-telp-register");
  var address_alert = document.getElementById("alert-address-register");

  name_alert.textContent = "";
  email_alert.textContent = "";
  telp_alert.textContent = "";
  address_alert.textContent = "";

  if (name.trim() == "") {
    name_alert.textContent = "Nama kosong";
  }
  if (email.trim() == "") {
    email_alert.textContent = "Email kosong";
  }
  if (address.trim() == "") {
    address_alert.textContent = "Alamat kosong";
  }
  if (name.trim() != "" && email.trim() != "" && address.trim() != "") {
    name_alert.textContent = "";
    email_alert.textContent = "";
    telp_alert.textContent = "";
    address_alert.textContent = "";
    document.getElementById("popup-register-page1").style.display = "none";
    document.getElementById("popup-register-page2").style.display = "flex";
  }
  return;
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

  document.getElementById("alert-name-register").textContent = "";
  document.getElementById("alert-email-register").textContent = "";
  document.getElementById("alert-telp-register").textContent = "";
  document.getElementById("alert-address-register").textContent = "";

  document.getElementById("popup-register-page1").style.display = "none";
  document.getElementById("popup-login").style.display = "flex";
});
document.getElementById("register").addEventListener("click", async () => {
  var name = document.getElementById("name-register").value;
  var email = document.getElementById("email-register").value;
  var telp = document.getElementById("telp-register").value;
  var address = document.getElementById("address-register").value;
  var open = document.getElementById("open-time-register").value;
  var close = document.getElementById("close-time-register").value;
  var worker = document.getElementById("num-worker-register").valueAsNumber;
  var password = document.getElementById("password-register").value;
  var confirmation_password = document.getElementById(
    "confirmation-password",
  ).value;

  var time_alert = document.getElementById("alert-time-register");
  var worker_alert = document.getElementById("alert-worker-register");
  var password_alert = document.getElementById("alert-password-register");
  var confirmation_alert = document.getElementById(
    "alert-confirmation-password-register",
  );

  time_alert.textContent = "";
  worker_alert.textContent = "";
  password_alert.textContent = "";
  confirmation_alert.textContent = "";

  if (open.trim() == "") {
    time_alert.textContent = "Waktu buka kosong";
  } else if (close.trim() == "") {
    time_alert.textContent = "Waktu tutup kosong";
  }
  if (Number.isNaN(worker)) {
    worker_alert.textContent = "Jumlah pekerja kosong";
  }
  if (password.trim() == "") {
    password_alert.textContent = "Password Kosong";
  }
  if (confirmation_password.trim() == "") {
    confirmation_alert.textContent = "Konfirmasi password anda";
  }

  if (
    open.trim() != "" &&
    close.trim() != "" &&
    !Number.isNaN(worker) &&
    password.trim() != "" &&
    confirmation_password.trim() != ""
  ) {
    if (password != confirmation_password) {
      confirmation_alert.textContent = "Password Salah";
      return;
    }

    document.getElementById("register").disabled = true;
    document.getElementById("text-btn-register").hidden = true;
    document.getElementById("spinner-register").hidden = false;
    var request = await fetch(ServerURL["Register"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: name,
        Email: email,
        Phone: telp,
        Address: address,
        Open: open,
        Close: close,
        Worker: worker,
        Password: password,
      }),
    });

    var response = await request.json();

    if (response.Status === true) {
      document.getElementById("popup-OTP").style.display = "flex";
      document.getElementById("user-email").textContent = response.Detail;
    } else if (response.Status === false) {
      if (response.Type === "Email") {
        document.getElementById("popup-register-page2").style.display = "none";
        document.getElementById("popup-register-page1").style.display = "flex";
        document.getElementById("alert-email-register").textContent =
          response.Detail;
      }
      document.getElementById("register").disabled = false;
      document.getElementById("text-btn-register").hidden = false;
      document.getElementById("spinner-register").hidden = true;
      return;
    }
  }
  return;
});
document.getElementById("back-to-page1").addEventListener("click", () => {
  document.getElementById("popup-register-page2").style.display = "none";
  document.getElementById("popup-register-page1").style.display = "flex";
});
document.getElementById("verify").addEventListener("click", async () => {
  // Call Backend
  var code = document.getElementById("OTP").value;
  var alert_code = document.getElementById("alert-otp");
  alert_code.textContent = "";

  if (code.trim() == "") {
    alert_code.textContent = "Code Kosong";
  }

  if (code.trim() != "") {
    var request = await fetch(ServerURL["Verification"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        OTP: code,
      }),
    });
    var response = await request.json();
    if (response.Status === true) {
      alert(response.Email);
    } else if (response.Status === false) {
      alert_code.textContent = response.Detail;
    }
  }
  return;
});
document
  .getElementById("re-send-register")
  .addEventListener("click", async () => {
    console.log(true);

    var canrequest = document.getElementById("re-send-register");
    canrequest.style.display = "none";
    canrequest.disabled = true;

    var cantrequest = document.getElementById("re-send-time");
    cantrequest.style.display = "flex";
    
    document.getElementById("spinner-resend-register").hidden = false;

    var sisa = 5;
    const timer = setInterval(() => {
      document.getElementById("spinner-resend-register").hidden = true;
      var output = document.getElementById("re-send-time-text");
      const m = String(Math.floor(sisa / 60)).padStart(2, "0");
      const s = String(sisa % 60).padStart(2, "0");
      output.textContent = `${m}:${s}`;

      if (sisa === 0) {
        clearInterval(timer);
        canrequest.style.display = "block";
        canrequest.disabled = false;
        cantrequest.style.display = "none";
        output.textContent = ""
      }
      sisa--;
    }, 1000);
  });
document.getElementById("back-register").addEventListener("click", () => {
  document.getElementById("OTP").value = "";
  document.getElementById("popup-OTP").style.display = "none";
});
var count = 0;
document.getElementById("re-send").addEventListener("click", () => {
  // Call Backend
  count += 1;
  if (count > 0) {
    document.getElementById("re-send").textContent = "Kirim Ulang";
  }
});
document
  .getElementById("verification-new-password")
  .addEventListener("click", () => {
    // Call backend
    var code = document.getElementById("OTP-reset-password").value;
    var password = document.getElementById("new-password").value;
    var verify = document.getElementById("confirmation-new-password").value;

    var alert_code = document.getElementById("alert-otp-re-password");
    var alert_new_password = document.getElementById("alert-re-password");
    var alert_verify_password = document.getElementById(
      "alert-verify-password",
    );

    alert_code.textContent = "";
    alert_new_password.textContent = "";
    alert_verify_password.textContent = "";

    if (code.trim() == "") {
      alert_code.textContent = "Code OTP kosong";
    }
    if (password.trim() == "") {
      alert_new_password.textContent = "Password baru kosong";
    }
    if (verify.trim() == "") {
      alert_verify_password.textContent = "Confirmasi Password anda";
    }

    if (code.trim() != "" && password.trim() != "" && verify.trim() != "") {
      if (password != verify) {
        alert_verify_password.textContent = "Password tidak sama";
        return;
      }
    }
    return;
  });
document.getElementById("back-login").addEventListener("click", () => {
  // Call Backend
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
