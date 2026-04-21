// Shopping Cart System
let cart = [];

// Load cart from localStorage when page loads
function loadCart() {
  const savedCart = localStorage.getItem('gameCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('gameCart', JSON.stringify(cart));
}

// Add product to cart
function addToCart(productName, price) {
  const item = {
    name: productName,
    price: price,
    id: Date.now()
  };
  
  cart.push(item);
  saveCart();
  
  // Show notification
  showNotification(productName + ' u shtua në shportë! ✓');
  
  // Update cart display
  updateCartDisplay();
}

// Remove product from cart
function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCart();
  updateCartDisplay();
}

// Calculate total
function calculateTotal() {
  return cart.reduce((total, item) => total + item.price, 0);
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Update cart display
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

// Toggle cart visibility
function toggleCart() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.toggle('show');
  }
}

// Close cart when clicking outside
document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  updateCartDisplay();
  
  // Add click outside to close cart
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