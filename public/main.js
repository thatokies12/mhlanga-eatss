// Toggle between Login and Signup Forms
// Toggle between Login and Signup Forms
document.getElementById("toggleSignup").addEventListener("click", function (event) {
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

//Toggle between User roles
document.getElementById("userRole").addEventListener("change", function () {
  const role = this.value;

  // Hide all role-specific fields
  document.querySelectorAll("#customerForm, #driverForm, #storeManangerForm").forEach(div => {
    div.style.display = "none";
  });

  // Show the relevant form
  if (role === "customer") {
    document.getElementById("customerForm").style.display = "block";
  } else if (role === "driver") {
    document.getElementById("driverForm").style.display = "block";
  } else if (role === "admin") {
    document.getElementById("storeManangerForm").style.display = "block";
  }

  // Show the signup form
  if (role) {
    document.getElementById("signupForm").classList.remove("hidden");
  }
});


// Login Form Validation
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Login successful!
        loginForm.reset();


        // window.location.href = "dashboard.html";
      } else {
        document.getElementById("login-error-message").innerText = data.message;
      }
    } catch (error) {
      console.error("Login error:", error);
      document.getElementById("login-error-message").innerText = "Login failed. Try again later.";
    }
  });
});


// Signup Form Validation
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent form from submitting the old-fashioned way

    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const role = document.getElementById('userRole').value;
    const password = document.getElementById("signup-password").value;

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, role, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Success message
        signupForm.reset();  // clear form
      } else {
        document.getElementById("signup-error-message").innerText = data.message;
      }
    } catch (error) {
      console.error("Error during signup:", error);
      document.getElementById("signup-error-message").innerText = "Something went wrong!";
    }
  });
});


// Google Login (Placeholder)
document.querySelector(".google-btn").addEventListener("click", function () {
  alert("Google Login Clicked! (Integration Required)");
});

// Facebook Login (Placeholder)
document.querySelector(".facebook-btn").addEventListener("click", function () {
  alert("Facebook Login Clicked! (Integration Required)");
});



