function validateEmail(email) { 
  return /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email); 
}

function showError(id, message) {
  const elem = document.getElementById(id);
  elem.innerText = message;
  elem.classList.add('show');
}

function clearError(id) {
  const elem = document.getElementById(id);
  elem.innerText = '';
  elem.classList.remove('show');
}

function register() {
  const username = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  let valid = true;

  if (username.length < 3) {
    showError("reg-username-error","At least 3 characters required");
    document.getElementById("reg-username").classList.add('error-field');
    valid=false;
  } else { clearError("reg-username-error"); document.getElementById("reg-username").classList.remove('error-field'); }

  if (!validateEmail(email)) {
    showError("reg-email-error","Enter a valid email");
    document.getElementById("reg-email").classList.add('error-field');
    valid=false;
  } else { clearError("reg-email-error"); document.getElementById("reg-email").classList.remove('error-field'); }

  if (password.length < 6) {
    showError("reg-password-error","Password must be at least 6 characters");
    document.getElementById("reg-password").classList.add('error-field');
    valid=false;
  } else { clearError("reg-password-error"); document.getElementById("reg-password").classList.remove('error-field'); }

  if(valid){
    localStorage.setItem("user", JSON.stringify({username,email,password}));
    document.getElementById("reg-success").innerText = "✅ Registration Successful!";
  }
}

function login() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  let valid = true;

  if (!validateEmail(email)) { showError("login-email-error","Enter a valid email"); valid=false; } 
  else clearError("login-email-error");

  if (password.length < 6) { showError("login-password-error","Password must be at least 6 characters"); valid=false; } 
  else clearError("login-password-error");

  if(valid){
    const user = JSON.parse(localStorage.getItem("user"));
    if(user && user.email===email && user.password===password){
      document.getElementById("login-success").innerText = `🎉 Welcome back, ${user.username}!`;
    } else document.getElementById("login-success").innerText = "❌ Invalid Credentials";
  }
}

function showLogin(){ 
  document.getElementById("registerForm").classList.add("hidden"); 
  document.getElementById("loginForm").classList.remove("hidden"); 
}

function showRegister(){ 
  document.getElementById("loginForm").classList.add("hidden"); 
  document.getElementById("registerForm").classList.remove("hidden"); 
}

function togglePassword(id){
  const input = document.getElementById(id);
  input.type = input.type==="password" ? "text" : "password";
}

const passwordInput = document.getElementById("reg-password");
const strengthBar = document.getElementById("password-strength");
passwordInput.addEventListener('input', function(){
  const val = passwordInput.value;
  if(val.length<6) strengthBar.className="password-strength weak";
  else if(val.length<10) strengthBar.className="password-strength medium";
  else strengthBar.className="password-strength strong";
});
