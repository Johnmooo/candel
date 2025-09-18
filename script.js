let cart = [];
let selectedColors = {}; // تخزين الصورة المختارة

function getProductsFromHTML() {
  const cards = document.querySelectorAll("#products .card");
  let products = [];
  cards.forEach(card => {
    products.push({
      id: parseInt(card.dataset.id),
      name: card.dataset.name,
      price: parseFloat(card.dataset.price),
      img: card.dataset.img,
      desc: card.dataset.desc,
      colors: JSON.parse(card.dataset.colors)
    });
  });
  return products;
}

const products = getProductsFromHTML();

function showColors(id) {
  const product = products.find(p => p.id === id);
  const container = document.getElementById("colorOptions");
  container.innerHTML = "";
  product.colors.forEach(c => {
    container.innerHTML += `
      <img src="${c}" class="color-img" 
           onclick="selectColor(${id}, '${c}')">
    `;
  });
  new bootstrap.Modal(document.getElementById('colorModal')).show();
}

function selectColor(productId, colorImg) {
  selectedColors[productId] = colorImg;
  alert("تم اختيار اللون!");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const color = selectedColors[id] || null; 
  const existing = cart.find(p => p.id === id && p.color === color);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1, color });
  }
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartList");
  list.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    list.innerHTML += `
      <li class="d-flex align-items-center mb-2 cart-item">
        <img src="${item.img}" class="me-2 rounded" style="width:40px;height:40px;object-fit:cover;">
        <div class="flex-grow-1">
          <div>${item.name} 
            ${item.color ? `<img src="${item.color}" style="width:20px;height:20px;border-radius:5px;margin-left:5px;">` : ""}
          </div>
          <small class="text-muted">${item.price} EGP</small>
          <div class="d-flex align-items-center gap-2 mt-1">
            <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${item.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${item.id}, 1)">+</button>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id}, '${item.color}')">Remove</button>
          </div>
        </div>
      </li>`;
  });
  document.getElementById("cartTotal").innerText = total;
  document.getElementById("cartCount").innerText = cart.length;
}

function changeQty(id, delta) {
  const item = cart.find(p => p.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(p => !(p.id === id && p.color === item.color));
  renderCart();
}

function removeFromCart(id, color) {
  cart = cart.filter(p => !(p.id === id && p.color === color));
  renderCart();
}

function checkout() {
  alert("Proceeding to checkout!");
}

document.getElementById("year").innerText = new Date().getFullYear();
