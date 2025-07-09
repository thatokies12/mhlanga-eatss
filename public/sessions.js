document.addEventListener('DOMContentLoaded', () => {
  fetch('/navbar.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
      updateUserArea();
    });
});

function updateUserArea() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userArea = document.getElementById('userArea');

  if (!userArea) return;

  if (user && user.name) {
    userArea.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
          <i class="bi bi-person-circle"></i> ${user.name}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="/profile.html">Profile</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item text-danger" href="#" onclick="logout()">Logout</a></li>
        </ul>
      </div>
    `;
  } else {
    userArea.innerHTML = `
      <a href="/login_register.html" class="btn btn-outline-primary">Login</a>
    `;
  }
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = '/login_register.html';
}
