let allProducts = [];

// Fetch products from API
fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    allProducts = data.products;
    // Initially display all products
    displayFilteredProducts('all');
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
    // Show all products
    filteredProducts = allProducts;
  }

  displayFilteredProducts(filteredProducts);
}

// Function to display filtered products
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

// Fungsi untuk menampilkan isi cart
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsHTML = '';
    let totalPrice = 0;
    let totalItems = 0;  // Tambahkan variabel untuk menghitung total item
  
    cart.forEach(item => {
      cartItemsHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
          <p>${item.name} (x${item.quantity}) - ${item.price * item.quantity}K</p>
          <button onclick="updateQuantity(${item.id}, 'decrease')">-</button>
          ${item.quantity}
          <button onclick="updateQuantity(${item.id}, 'increase')">+</button>
          <button class="remove-button" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
      totalPrice += item.price * item.quantity;
      totalItems += item.quantity;  // Hitung total item
    });
  
    // Tampilkan item di dalam cart
    document.getElementById('cart-items').innerHTML = cartItemsHTML;
    // Tampilkan total harga
    document.getElementById('total-price').textContent = totalPrice + 'K';
    // Tampilkan total item
    document.getElementById('total-items').textContent = totalItems + ' items';  // Perbarui elemen untuk total item
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
