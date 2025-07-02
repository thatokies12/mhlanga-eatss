document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stop default browser refresh

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

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
                // Redirect to role-based dashboard
                window.location.href = result.redirect;
            } else {
                alert(result.error || 'Login failed.');
            }

        } catch (err) {
            console.error('[Login Error]', err);
            alert('An error occurred while logging in.');
        }
    });
});
