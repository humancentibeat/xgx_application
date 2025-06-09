
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  console.log("FlockiShop booted. UX-Engines online.");
});

let cartCount = 0;
let cart = JSON.parse(localStorage.getItem("cart")) || {};

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productName, price) {
  if (!cart[productName]) {
    cart[productName] = { quantity: 1, price };
  } else {
    cart[productName].quantity++;
  }
  saveCart();
  updateCartUI();
  showToast(productName, price);
}


const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.forEach(t => new bootstrap.Tooltip(t));

function updateCartUI() {
  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
}

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

$('#product-grid').on('click', 'button[data-id]', function () {
  const productName = $(this).data('name');
  const productPrice = parseFloat($(this).data('price'));

  addToCart(productName, productPrice);
});

function renderCartItems() {
  const container = document.getElementById('cart-items-container');
  container.innerHTML = '';

  let total = 0;

  for (const [name, item] of Object.entries(cart)) {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;

    const row = document.createElement('div');
    row.className = "d-flex justify-content-between align-items-center border-bottom py-2";

    row.innerHTML = `
      <div><strong>${name}</strong><br><small>€ ${item.price.toFixed(2)} x ${item.quantity}</small></div>
      <div>
        <button class="btn btn-sm btn-outline-secondary me-1" data-action="decrease" data-name="${name}">–</button>
        <span>${item.quantity}</span>
        <button class="btn btn-sm btn-outline-secondary ms-1" data-action="increase" data-name="${name}">+</button>
        <button class="btn btn-sm btn-outline-danger ms-3" data-action="remove" data-name="${name}">🗑️</button>
      </div>
    `;

    container.appendChild(row);
  }

  document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Buttons im Modal (dynamisch!)
document.getElementById('cart-items-container').addEventListener('click', function(e) {
  const btn = e.target.closest('button');
  if (!btn) return;

  const name = btn.dataset.name;
  const action = btn.dataset.action;

  if (action === 'increase') {
    cart[name].quantity++;
  } else if (action === 'decrease') {
    cart[name].quantity--;
    if (cart[name].quantity <= 0) delete cart[name];
  } else if (action === 'remove') {
    delete cart[name];
  }

  saveCart();
  updateCartUI();
  renderCartItems();
});

// Leeren
document.getElementById('clear-cart').addEventListener('click', () => {
  cart = {};
  saveCart();
  updateCartUI();
  renderCartItems();
});

// Checkout (Mock)
document.getElementById('checkout').addEventListener('click', () => {
  alert("Danke für deinen Einkauf! 🥳");
  cart = {};
  saveCart();
  updateCartUI();
  renderCartItems();
});
// Modal beim öffnen aktualisieren
document.getElementById('cartModal').addEventListener('show.bs.modal', renderCartItems);


