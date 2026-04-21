// Shopping Cart System
let cart = [];

function loadCart() {
  const savedCart = localStorage.getItem('gameCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

function saveCart() {
  localStorage.setItem('gameCart', JSON.stringify(cart));
}

function addToCart(productName, price) {
  const item = {
    name: productName,
    price: price,
    id: Date.now()
  };
  
  cart.push(item);
  saveCart();
  showNotification(productName + ' u shtua në shportë! ✓');
  updateCartDisplay();
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCart();
  updateCartDisplay();
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price, 0);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function updateCartDisplay() {
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const cartItems = document.getElementById('cart-items');
  
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
  
  if (cartTotal) {
    cartTotal.textContent = calculateTotal().toFixed(2);
  }
  
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = '<p style="text-align: center; padding: 20px;">Shporta është bosh</p>';
    } else {
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="item-info">
            <p>${item.name}</p>
            <span>${item.price} £</span>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Hiq</button>
        </div>
      `).join('');
    }
  }
}

function toggleCart() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.toggle('show');
  }
}

// KËRKIMI I PRODUKTEVE
function searchProducts() {
  const searchInput = document.getElementById('search-input');
  const searchValue = searchInput.value.toLowerCase();
  const products = document.querySelectorAll('[data-product]');
  const resultsDiv = document.getElementById('search-results');
  let visibleCount = 0;
  
  products.forEach(product => {
    const productName = product.getAttribute('data-product').toLowerCase();
    
    if (productName.includes(searchValue)) {
      product.classList.remove('hidden');
      visibleCount++;
    } else {
      product.classList.add('hidden');
    }
  });
  
  if (searchValue === '') {
    resultsDiv.textContent = '';
  } else if (visibleCount === 0) {
    resultsDiv.textContent = '❌ Nuk u gjet asnjë produkt';
  } else {
    resultsDiv.textContent = `✓ U gjetën ${visibleCount} produkt(e)`;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  updateCartDisplay();
  
  document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cart-modal');
    const cartBtn = document.getElementById('cart-btn');
    
    if (cartModal && cartBtn && !cartModal.contains(event.target) && !cartBtn.contains(event.target)) {
      if (cartModal.classList.contains('show')) {
        cartModal.classList.remove('show');
      }
    }
  });
});
