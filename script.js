let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalItems = document.getElementById("total-items");
const cartModal = document.getElementById("cart-modal");
const clearCartBtn = document.getElementById("clear-cart");
const cartBtn = document.getElementById("cart-btn");

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseInt(button.getAttribute("data-price"));

    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

cartBtn.addEventListener("click", () => {
  cartModal.style.display = "block";
  cartModal.style.transform = "translateX(0)";
});

// Close cart modal
document.querySelector(".btn-close").addEventListener("click", () => {
  cartModal.style.transform = "translateX(100%)";
  setTimeout(() => {
    cartModal.style.display = "none";
  }, 300);
});

// Remove item from cart
function removeItemFromCart(index) {
  cart[index].quantity -= 1;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

clearCartBtn.addEventListener("click", () => {
  cart = [];
  updateCart();
});

function updateCart() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCount.textContent = totalQuantity;
  totalItems.textContent = totalQuantity;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="item-info">
        ${item.name} (x${item.quantity}) - Rp ${item.price.toLocaleString(
      "id-ID"
    )} / item
      </div>
      <button class="remove-item" data-index="${index}">&times;</button>
    `;
    cartItems.appendChild(li);

    li.querySelector(".remove-item").addEventListener("click", () => {
      removeItemFromCart(index);
    });
  });

  const totalPriceElement = document.createElement("p");
  totalPriceElement.innerHTML = `Total Harga: <strong>Rp ${totalPrice.toLocaleString(
    "id-ID"
  )}</strong>`;
  cartItems.appendChild(totalPriceElement);
}
