
const productContainer = document.querySelector('.menu-page_grid');

// Mengambil API DummyJSON
fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    let productsHTML = '';
    data.products.forEach(product => {
      productsHTML += `
        <div class="menu-page_item">
          <img src="${product.thumbnail}" alt="${product.title}" class="menu-page_img" />
          <div class="menu-page_info">
            <h3>${product.title}</h3>
            <p>${product.price}K</p>
            <button class="menu-button" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
          </div>
        </div>
      `;
    });
    productContainer.innerHTML = productsHTML;
  })
  .catch(error => {
    console.error('Error fetching products:', error);
    productContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
  });

  function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === productId);
  
    if (product) {
      product.quantity += 1;
    } else {
      cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
    displayCartItems();
  }
  
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Filter out the item to be removed
    cart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
  }
  
  function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsHTML = '';
    let totalPrice = 0;
  
    cart.forEach(item => {
      cartItemsHTML += `
        <div class="cart-item">
          <p>${item.name} (x${item.quantity}) - ${item.price * item.quantity}K</p>
          <button class="remove-button" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
      totalPrice += item.price * item.quantity;
    });
  
    document.getElementById('cart-items').innerHTML = cartItemsHTML;
    document.getElementById('total-price').textContent = totalPrice;
  }
  
  // Call displayCartItems when the page loads to show any items already in the cart
  window.onload = displayCartItems;
  