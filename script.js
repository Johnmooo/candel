const products = [
  { 
    id: 1, 
    name: "ورده", 
    price: 75, 
    img: "./flower/purple.jpg", 
    desc: "Soft lavender scent perfect for relaxation.", 
    colors: ["./flower/purple.jpg","./flower/purple.jpg","../flower/gold.jpg"] 
  },
  { 
    id: 2, 
    name: "مربع بابليلز", 
    price: 75, 
    img: "./Bubbles/purple.jpg", 
    desc: "Romantic rose fragrance for special moments.", 
    colors: ["./Bubbles/purple.jpg", "./Bubbles/toby.jpg", "./Bubbles/mix.jpg", ] 
  },
  { 
    id: 3, 
    name: "كوب شمعي ", 
    price: 85, 
    img: "./cup/purple.jpg", 
    desc: "Sweet vanilla fragrance that soothes the soul.", 
    colors: ["./cup/red.jpg","./cup/gold.jpg",] 
  },
  { 
    id: 4, 
    name: "ابوالهول", 
    price: 90, 
    img: "./sphinx/1.jpg", 
    desc: "Fresh jasmine aroma for a calm atmosphere.", 
    colors: ["./sphinx/gold.jpg","./sphinx/toby.jpg",] 
  }
];

let cart = [];
let selectedColors = {}; // تخزين الصورة المختارة

function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";
  products.forEach(p => {
    container.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4">
        <div class="card h-100 text-center p-3 slide-up">
          <div class="ratio ratio-1x1">
            <img src="${p.img}" class="card-img-top img-fluid" alt="${p.name}" style="object-fit: cover;" onclick="showColors(${p.id})">
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.name}</h5>
            <p class="text-muted small flex-grow-1">${p.desc}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="fw-bold">${p.price} EGP</span>
              <button class="btn btn-sm btn-dark" onclick="addToCart(${p.id})">Buy</button>
            </div>
          </div>
        </div>
      </div>`;
  });
}

function showColors(id) {
  const product = products.find(p => p.id === id);
  const container = document.getElementById("colorOptions");
  container.innerHTML = "";
  product.colors.forEach(c => {
    container.innerHTML += `
      <img src="${c}" class="color-img" style="width:70px;height:70px;object-fit:cover;margin:5px;cursor:pointer;border-radius:5px;" onclick="selectColor(${id}, '${c}')">
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

  const color = selectedColors[id] || null; // لو المستخدم ما اختارش صورة
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
renderProducts();
