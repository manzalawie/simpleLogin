// sign up inputs
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");

// error message element
var messageElement = document.getElementById("messageElement");

// sign in inputs
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

// get Name div
var username = document.getElementById("username");

var users;
var login;
var usersLogin = null;

// validation functions
function validateName(name) {
  // Name should be at least 3 chars long and only contain letters and spaces max 30 chars
  var nameRegex = /^[A-Za-z\s]{3,30}$/;
  return nameRegex.test(name);
}

function validateEmail(email) {
  // Basic email pattern validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function validatEmailExist() {
  if (localStorage.getItem("users") !== null) {
    users = JSON.parse(localStorage.getItem("users"));
    for (var i = 0; i < users.length; i++) {
      if (users[i].userMail == signupEmail.value) {
        return false;
      }
    }
  }
}
function validatePassword(password) {
  // Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}
// login function
function login() {
  users = JSON.parse(localStorage.getItem("users"));

  if (signinEmail.value == "" || signinPassword == "") {
    messageElement.textContent = "All inputs are required";
    messageElement.style.color = "red";
    return;
  }

  if (JSON.parse(localStorage.getItem("users")) == null) {
    messageElement.textContent = "incorrect Email or Password";
    messageElement.style.color = "red";
    return;
  } else {
    for (var i = 0; i < users.length; i++) {
      if (users[i].userMail == signinEmail.value) {
        if (users[i].userPass == signinPassword.value) {
          window.location.href = "home.html";
          localStorage.setItem("login", JSON.stringify(users[i]));
        } else {
          messageElement.textContent = "incorrect Email or Password";
          messageElement.style.color = "red";
        }
      } else {
        messageElement.textContent = "incorrect Email or Password";
        messageElement.style.color = "red";
      }
    }
  }
}
// display name in home page
function displayHome() {
  usersLogin = JSON.parse(localStorage.getItem("login"));
  if (usersLogin === null) {
    window.location.href = "index.html";
  }
  username.textContent = "Welcome " + usersLogin.userName;
}
// return to home page if already login
function displaylog() {
  usersLogin = JSON.parse(localStorage.getItem("login"));

  if (usersLogin !== null) {
    window.location.href = "home.html";
  }
}
// log out function
function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}
// sign up function
function signUp() {
  var cartona = [];
  messageElement.style.color = "red";

  // validate the name input

  if (!validateName(signupName.value)) {
    cartona = "| Name must be between 3 and 30 chars only letters. |";
  }

  // validate the Email input

  if (!validateEmail(signupEmail.value)) {
    cartona += "| Validation Email failed. Please check your inputs. |";
  }

  // validate the password input

  if (!validatePassword(signupPassword.value)) {
    cartona +=
      "| Password Must contains at least 8 chars with one small letter and other capital and a number. |";
  }

  if (
    validateName(signupName.value && validateEmail(signupEmail.value)) &&
    validatePassword(signupPassword.value)
  ) {
    var newUser = {
      userName: signupName.value,
      userMail: signupEmail.value,
      userPass: signupPassword.value,
    };
    if (validatEmailExist() == false) {
      cartona += "| Email already exists |";
      messageElement.textContent = cartona;
      return;
    }

    users = JSON.parse(localStorage.getItem("users"));

    if (users == null) {
      users = [];
    }
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "index.html";
  }
  messageElement.textContent = cartona;
}
