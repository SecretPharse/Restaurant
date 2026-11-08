var ServerURL = {
  Register: "http://127.0.0.1:8080/Register",
  NewOTP: "http://127.0.0.1:8080/New-OTP",
  CancelRegister: "http://127.0.0.1:8080/CancelRegister",
  Verification: "http://127.0.0.1:8080/Verification",
  Login: "http://127.0.0.1:8080/Login",
};
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

      alert(response.Name);
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
document.getElementById("reset-password").addEventListener("click", () => {
  document.getElementById("popup-login").style.display = "none";
  document.getElementById("popup-new-password").style.display = "flex";
});
document.getElementById("back-to-login").addEventListener("click", () => {
  document.getElementById("popup-new-password").style.display = "none";
  document.getElementById("new-password").value = "";
  document.getElementById("confirmation-new-password").value = "";
  document.getElementById("popup-login").style.display = "flex";
});
document
  .getElementById("new-password-input-input1-placeholder-eye")
  .addEventListener("click", () => {
    var input = document.getElementById("new-password");
    var eye = document.getElementById(
      "new-password-input-input1-placeholder-eye",
    );
    if (input.type == "password") {
      input.type = "text";
      eye.src = "assets/visibility_on.svg";
    } else {
      input.type = "password";
      eye.src = "assets/visibility_off.svg";
    }
  });
document
  .getElementById("new-password-input-input2-placeholder-eye")
  .addEventListener("click", () => {
    var input = document.getElementById("confirmation-new-password");
    var eye = document.getElementById(
      "new-password-input-input2-placeholder-eye",
    );
    if (input.type == "password") {
      input.type = "text";
      eye.src = "assets/visibility_on.svg";
    } else {
      input.type = "password";
      eye.src = "assets/visibility_off.svg";
    }
  });
document
  .getElementById("btn-confirmation-new-password")
  .addEventListener("click", async () => {
    // Call Backend
    var email = document.getElementById("email-login").value;
    var input1 = document.getElementById("new-password").value;
    var input2 = document.getElementById("new-password").value;
    var alert1 = document.getElementById("alert-new-password1");
    var alert2 = document.getElementById("alert-new-password2");
    var alert3 = document.getElementById("alert-email-login");
    alert1.textContent = "";
    alert2.textContent = "";
    alert3.textContent = "";

    if (input1.trim() === "") {
      alert1.textContent = "Kata Sandi Kosong";
    }
    if (input2.trim() === "") {
      alert2.textContent = "Konfirmasi Kata Sandi anda";
    }
    if (email.trim() === "") {
      document.getElementById("popup-new-password").style.display = "none";
      document.getElementById("popup-login").style.display = "flex";
      alert3.textContent = "Email Kosong";
    }

    if (input1.trim() != "" && input2.trim() != "") {
      document.getElementById("btn-confirmation-new-password").disabled = true;
      document.getElementById("text-confirmation-new-password").hidden = true;
      document.getElementById("spinner-new-password").hidden = false;
      var request = await fetch(ServerURL["NewOTP"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email,
        }),
      });
      var response = await request.json();
      if (response.Status === true) {
        document.getElementById("btn-confirmation-new-password").disabled =
          false;
        document.getElementById("text-confirmation-new-password").hidden =
          false;
        document.getElementById("spinner-new-password").hidden = true;
        document.getElementById("user-email").textContent = email;
        document.getElementById("popup-new-password").style.display = "none";
        document.getElementById("popup-reset-password").style.display = "flex";
      }
    }
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
  var email = document.getElementById("email-register").value;
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
        Email: email,
      }),
    });

    var response = await request.json();

    if (response.Status === true) {
      document.getElementById("text-btn-register").hidden = false;
      document.getElementById("spinner-register").hidden = true;
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
    document.getElementById("register").disabled = false;
    document.getElementById("text-btn-register").hidden = false;
    document.getElementById("spinner-register").hidden = true;
  }
  return;
});
document.getElementById("back-to-page1").addEventListener("click", () => {
  document.getElementById("popup-register-page2").style.display = "none";
  document.getElementById("popup-register-page1").style.display = "flex";
});
document.getElementById("verify").addEventListener("click", async () => {
  // Call Backend
  var name = document.getElementById("name-register").value;
  var email = document.getElementById("email-register").value;
  var telp = document.getElementById("telp-register").value;
  var address = document.getElementById("address-register").value;
  var open = document.getElementById("open-time-register").value;
  var close = document.getElementById("close-time-register").value;
  var worker = document.getElementById("num-worker-register").valueAsNumber;
  var password = document.getElementById("password-register").value;
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
        Name: name,
        Email: email,
        Phone: telp,
        Address: address,
        Open: open,
        Close: close,
        Worker: worker,
        Password: password,
        OTP: code,
      }),
    });
    var response = await request.json();
    if (response.Status === true) {
      alert(response.Name);
    } else if (response.Status === false) {
      alert_code.textContent = response.Detail;
    }
  }
  return;
});
document
  .getElementById("re-send-register")
  .addEventListener("click", async () => {
    var canrequest = document.getElementById("re-send-register");
    canrequest.style.display = "none";
    canrequest.disabled = true;

    var cantrequest = document.getElementById("re-send-time");
    cantrequest.style.display = "flex";

    document.getElementById("spinner-resend-register").hidden = false;

    var email = document.getElementById("email-register").value;
    var request = await fetch(ServerURL["NewOTP"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email: email,
      }),
    });

    var response = await request.json();

    if (response.Status === true) {
      var time = 180;
      const timer = setInterval(() => {
        document.getElementById("spinner-resend-register").hidden = true;
        var output = document.getElementById("re-send-time-text");
        const m = String(Math.floor(time / 60)).padStart(2, "0");
        const s = String(time % 60).padStart(2, "0");
        output.textContent = `${m}:${s}`;

        if (time === 0) {
          clearInterval(timer);
          canrequest.style.display = "block";
          canrequest.disabled = false;
          cantrequest.style.display = "none";
          output.textContent = "";
        }
        time--;
      }, 1000);
    } else if (response.Status === false) {
      document.getElementById("alert-otp").textContent = response.Detail;
    }
  });
document.getElementById("re-send").addEventListener("click", async () => {
  // Call Backend
    var canrequest = document.getElementById("re-send");
    canrequest.style.display = "none";
    canrequest.disabled = true;

    var cantrequest = document.getElementById("re-send-disable");
    cantrequest.style.display = "flex";

    document.getElementById("spinner-resend").hidden = false;

    var email = document.getElementById("email-register").value;
    var request = await fetch(ServerURL["NewOTP"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email: email,
      }),
    });

    var response = await request.json();

    if (response.Status === true) {
      var time = 180;
      const timer = setInterval(() => {
        document.getElementById("spinner-resend").hidden = true;
        var output = document.getElementById("re-send-disable-text");
        const m = String(Math.floor(time / 60)).padStart(2, "0");
        const s = String(time % 60).padStart(2, "0");
        output.textContent = `${m}:${s}`;

        if (time === 0) {
          clearInterval(timer);
          canrequest.style.display = "block";
          canrequest.disabled = false;
          cantrequest.style.display = "none";
          output.textContent = "";
        }
        time--;
      }, 1000);
    } else if (response.Status === false) {
      document.getElementById("alert-otp-re-password").textContent = response.Detail;
    }
});
document
  .getElementById("verification-new-password")
  .addEventListener("click", () => {
    // Call backend
    var code = document.getElementById("OTP-reset-password").value;

    var alert_code = document.getElementById("alert-otp-re-password");

    alert_code.textContent = "";

    if (code.trim() == "") {
      alert_code.textContent = "Code OTP kosong";
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
