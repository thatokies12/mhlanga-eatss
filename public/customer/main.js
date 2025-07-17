<script>
    function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartCount');
    if (badge) badge.innerText = totalItems;
}

    // Run immediately on page load
    updateCartCount();

    // Optional: expose for other scripts to call after adding/removing
    window.updateCartCount = updateCartCount;
</script>
