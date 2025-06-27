// Toggle between Login and Signup Forms
document.getElementById("toggleSignup").addEventListener("click", function(event) {
    event.preventDefault();

    let loginForm = document.getElementById("loginForm");
    let signupForm = document.getElementById("signupForm");
    let formTitle = document.getElementById("form-title");

    if (loginForm.classList.contains("hidden")) {
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        formTitle.textContent = "Login to Delivery App";
        this.innerHTML = "Don't have an account? <a href='#' id='toggleSignup'>Sign Up</a>";
    } else {
        loginForm.classList.add("hidden");
        signupForm.classList.remove("hidden");
        formTitle.textContent = "Sign Up for Delivery App";
        this.innerHTML = "Already have an account? <a href='#' id='toggleSignup'>Login</a>";
    }
});

// Login Form Validation
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const errorMessage = document.getElementById("login-error-message");

    if (username === "admin" && password === "password") {
        alert("Login Successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        errorMessage.textContent = "Invalid username or password!";
    }
});

// Signup Form Validation
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const newUsername = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const newPassword = document.getElementById("signup-password").value;
    const signupErrorMessage = document.getElementById("signup-error-message");

    if (newUsername && email && newPassword) {
        alert("Signup Successful! You can now login.");
        window.location.href = "index.html"; // Redirect to login
    } else {
        signupErrorMessage.textContent = "All fields are required!";
    }
});

// Google Login (Placeholder)
document.querySelector(".google-btn").addEventListener("click", function() {
    alert("Google Login Clicked! (Integration Required)");
});

// Facebook Login (Placeholder)
document.querySelector(".facebook-btn").addEventListener("click", function() {
    alert("Facebook Login Clicked! (Integration Required)");
});
