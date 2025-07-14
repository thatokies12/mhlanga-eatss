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

// Signup Form Validation
document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();
//THATO APHANE
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const role = document.getElementById('userRole').value.trim();
    const password = document.getElementById('signup-password').value.trim()

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, role, password })
        });
        const data = await res.json();

        if (res.ok) {
            alert(data.message || 'User registered');
            document.getElementById('signupForm').classList.add('hidden');
            document.getElementById('loginForm').classList.remove('hidden');
        } else {
            alert(data.error || 'Registration failed');
        }
    } catch (error) {
        console.log('[Signup Error]', error);
        alert('An error occured while signing up');
    }
});



// Login Form Validation
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await res.json();

        if (res.ok) {
            alert(result.message);
            localStorage.setItem("user", JSON.stringify(result.user));
            // Redirect to role-based dashboard
            window.top.location.href = result.redirect;
        } else {
            alert(result.error || 'Login failed.');
        }

    } catch (err) {
        console.error('[Login Error]', err);
        alert('An error occurred while logging in.');
    }
});


// Google Login (Placeholder)
document.querySelector(".google-btn").addEventListener("click", function () {
    alert("Google Login Clicked! (Integration Required)");
})

// Facebook Login (Placeholder)
document.querySelector(".facebook-btn").addEventListener("click", function () {
    alert("Facebook Login Clicked! (Integration Required)");
});
