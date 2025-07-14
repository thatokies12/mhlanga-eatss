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
    // If customer, show icons
    const isCustomer = user.role === "customer";

    userArea.innerHTML = `
      ${isCustomer ? `
        <button class="relative w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary">
          <i class="ri-notification-3-line ri-lg"></i>
          <span class="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <button class="relative w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary">
          <i class="ri-shopping-cart-2-line ri-lg"></i>
          <span class="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">3</span>
        </button>
      ` : ''}

      <div class="relative">
        <button id="profileButton" class="flex items-center space-x-2 focus:outline-none hover:text-primary">
          <div class="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <img src="/assets/profile_placeholder.png" alt="Profile" class="w-full h-full object-cover">
          </div>
          <span class="hidden md:block text-sm font-medium text-gray-800">${user.name}</span>
          <i class="ri-arrow-down-s-line"></i>
        </button>
        <div id="profileMenu" class="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <a href="/profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</a>
          <button onclick="logout()" class="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Logout</button>
        </div>
      </div>
    `;

    // Toggle dropdown
    const profileButton = userArea.querySelector('#profileButton');
    const profileMenu = userArea.querySelector('#profileMenu');
    profileButton.addEventListener('click', () => {
      profileMenu.classList.toggle('hidden');
    });

  } else {
    userArea.innerHTML = `
      <a href="/login_register.html" class="text-sm font-medium text-gray-700 hover:text-primary border border-primary px-3 py-1 rounded-md">Login</a>
    `;
  }
}
