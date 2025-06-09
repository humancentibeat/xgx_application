console.log("FlockiShop booted. UX-Engines online.");

let cartCount = 0;

function showToast(productName, price) {
  const toastContainer = document.getElementById('toast-container');

  const toastEl = document.createElement('div');
  toastEl.className = 'toast align-items-center text-bg-success border-0 show';
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ✅ <strong>${productName}</strong> wurde deinem Warenkorb hinzugefügt.<br>
        <small>Warenwert: € ${price}</small>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  toastContainer.appendChild(toastEl);

  // Jetzt Bootstrap-Toast initialisieren
  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  // Automatisch entfernen
  setTimeout(() => toastEl.remove(), 4000);
}

// Beispiel-Hook
document.querySelectorAll('.btn.btn-primary').forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.card-title').textContent;
    const price = 12.90; // Placeholder: später aus Dataset oder Attribut
    showToast(productName, price);
  });
});
