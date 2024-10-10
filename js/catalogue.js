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
            <button onclick="addToCart(${product.id})">Add to Cart</button>
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

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = cart.find(item => item.id === productId);

  if (product) {
    product.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
}
