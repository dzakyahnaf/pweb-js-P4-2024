let allProducts = [];
let itemsPerPage; // Awalnya undefined agar bisa menampilkan semua item

// Fetch products from API
fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    allProducts = data.products;
    itemsPerPage = allProducts.length; // Tampilkan semua item saat pertama kali halaman dibuka
    displayFilteredProducts(allProducts.slice(0, itemsPerPage)); // Menampilkan semua item
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });

// Function to filter and display products based on category
function filterProducts(category) {
  let filteredProducts = [];

  if (category === 'cosmetics') {
    filteredProducts = allProducts.filter(product => product.category === 'skincare' || product.category === 'fragrances');
  } else if (category === 'furniture') {
    filteredProducts = allProducts.filter(product => product.category === 'furniture');
  } else if (category === 'groceries') {
    filteredProducts = allProducts.filter(product => product.category === 'groceries');
  } else {
    filteredProducts = allProducts;
  }

  displayFilteredProducts(filteredProducts.slice(0, itemsPerPage)); // Menampilkan item berdasarkan jumlah yang dipilih
}

// Function to display products
function displayFilteredProducts(products) {
  let productsHTML = '';

  products.forEach(product => {
    productsHTML += `
      <div class="menu-page_item">
        <img src="${product.thumbnail}" alt="${product.title}" class="menu-page_img" />
        <div class="menu-page_info">
          <h3>${product.title}</h3>
          <p>${product.price}K</p>
          <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.thumbnail}')">Add to Cart</button>
        </div>
      </div>
    `;
  });

  document.getElementById('products-section').innerHTML = productsHTML;
}

// Function to update number of items per page
function updateItemsPerPage() {
  const selectedValue = document.getElementById('items-per-page').value;
  itemsPerPage = parseInt(selectedValue, 10); // Konversi pilihan menjadi angka

  // Refresh the displayed products based on current category and items per page
  filterProducts('all');
}

// Add to Cart function (optional if you have a cart system)
function addToCart(productId, productName, productPrice, productImage) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = cart.find(item => item.id === productId);

  if (product) {
    product.quantity += 1;
  } else {
    cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems(); // Refresh cart display
}

function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartItemsHTML = '';
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach(item => {
    // Menggunakan class berbeda untuk cart
    cartItemsHTML += `
      <div class="cart-page_item">
        <img src="${item.image}" alt="${item.name}" class="cart-page_img" />
        <div class="cart-page_info">
          <h3>${item.name}</h3>
          <p>${item.price * item.quantity}K</p>
          <div class="cart-item-actions">
            <button onclick="updateQuantity(${item.id}, 'decrease')">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 'increase')">+</button>
          </div>
          <button class="remove-button" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `;
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });

  document.getElementById('cart-items').innerHTML = cartItemsHTML;
  document.getElementById('total-price').textContent = totalPrice + 'K';
  document.getElementById('total-items').textContent = totalItems + ' items';
}
  
  // Fungsi untuk mengubah jumlah item di cart
  function updateQuantity(productId, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === productId);
  
    if (product) {
      if (action === 'increase') {
        product.quantity += 1;
      } else if (action === 'decrease' && product.quantity > 1) {
        product.quantity -= 1;
      }
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Refresh tampilan cart setelah perubahan jumlah
  }
  
  // Fungsi untuk memperbarui jumlah item di cart pada navbar
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
  }
  
  window.onload = displayCartItems; // Muat isi cart saat halaman dimuat
  

// Remove item from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);

  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems(); // Refresh cart display
}

// Toggle cart sidebar
const cartSidebar = document.getElementById('cart-sidebar');
const cartToggle = document.getElementById('cart-toggle');
const closeCartBtn = document.getElementById('close-cart');

// Menggunakan logo keranjang di navbar untuk toggle sidebar
const cartToggleNavbar = document.querySelector('#shopping-cart');

cartToggleNavbar.addEventListener('click', () => {
  cartSidebar.classList.toggle('open');
});


closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('open');
});

