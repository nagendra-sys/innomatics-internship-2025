let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = document.getElementById("cart-count");
let cartItemsContainer = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total");
let cartDropdown = document.getElementById("cart-dropdown");

// Load cart on page load
document.addEventListener("DOMContentLoaded", updateCart);

// 🛍️ Add to Cart
function addToCart(id, name, price) {
    let item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    saveCart();
    updateCart();
}

// 🏷️ Update Cart UI
function updateCart() {
    cartItemsContainer.innerHTML = "";
    let totalCost = 0;
    let totalItems = 0;

    cart.forEach(item => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <span>${item.name} - $${(item.price * item.quantity).toFixed(2)}</span>
            <div>
                <button onclick="updateQuantity(${item.id}, 'increase')">+</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 'decrease')">-</button>
                <button class="remove" onclick="removeItem(${item.id})">X</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);

        totalCost += item.price * item.quantity;
        totalItems += item.quantity;
    });

    cartTotal.innerText = totalCost.toFixed(2);
    cartCount.innerText = totalItems;

    saveCart();
}

// 🔼 Increase/Decrease Quantity
function updateQuantity(id, action) {
    let item = cart.find(product => product.id === id);

    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeItem(id);
        }
    }

    updateCart();
}

// ❌ Remove Item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// 🧹 Clear Cart
function clearCart() {
    cart = [];
    updateCart();
}

// 💾 Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 🎭 Toggle Cart Visibility
function toggleCart() {
    cartDropdown.classList.toggle("visible");
}
