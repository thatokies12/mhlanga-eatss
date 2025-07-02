document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('driverForm');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(form); // Collects all inputs + files

        try {
            const res = await fetch('/api/driver/apply', {
                method: 'POST',
                body: formData
            });

            const result = await res.json();

            if (res.ok) {
                alert('Driver registration submitted successfully!');
                form.reset();
                window.location.href = '/driver/success.html'; // optional
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong while submitting your application.');
        }
    });
});
