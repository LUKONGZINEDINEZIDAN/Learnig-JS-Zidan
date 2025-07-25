const products = [
  { id: 1, name: "Sneakers", price: 50 },
  { id: 2, name: "Watch", price: 100 },
  { id: 3, name: "Backpack", price: 60 },
  { id: 4, name: "Headphones", price: 80 },
  { id: 5, name: "Jacket", price: 120 }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

// Display products
products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product-card";
  div.innerHTML = `
    <h3>${product.name}</h3>
    <p>Price: $${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function changeQty(id, delta) {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    updateCart();
  }
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-item-info">
        <strong>${item.name}</strong><br>
        $${item.price} x ${item.qty} = $${item.price * item.qty}
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartItems.appendChild(div);
    total += item.price * item.qty;
    count += item.qty;
  });

  cartCount.innerText = count;
  cartTotal.innerText = total.toFixed(2);
}
