let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalItems = document.getElementById("total-items");
const cartModal = document.getElementById("cart-modal");
const clearCartBtn = document.getElementById("clear-cart");
const cartBtn = document.getElementById("cart-btn");

// Add item to cart
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseInt(button.getAttribute("data-price"));

    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity of existing item
    } else {
      cart.push({ name, price, quantity: 1 }); // Add new item to cart
    }

    updateCart(); // Update cart display
  });
});

// Open cart modal
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "block";
  cartModal.style.transform = "translateX(0)"; // Slide-in animation
});

// Close cart modal
document.querySelector(".btn-close").addEventListener("click", () => {
  cartModal.style.transform = "translateX(100%)"; // Slide-out animation
  setTimeout(() => {
    cartModal.style.display = "none";
  }, 300); // Allow time for the animation to complete
});

// Remove item from cart
function removeItemFromCart(index) {
  cart[index].quantity -= 1; // Decrease the item quantity
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // Remove item if quantity is zero
  }
  updateCart(); // Update cart display
}

// Clear all items from cart
clearCartBtn.addEventListener("click", () => {
  cart = []; // Empty the cart array
  updateCart(); // Update cart display
});

// Update cart display
function updateCart() {
  // Calculate total item quantity and total price
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Update the cart display elements
  cartCount.textContent = totalQuantity;
  totalItems.textContent = totalQuantity;

  cartItems.innerHTML = ""; // Clear cart item list

  // Add each item to the cart list
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="item-info">
        ${item.name} (x${item.quantity}) - Rp ${item.price.toLocaleString('id-ID')} / item
      </div>
      <button class="remove-item" data-index="${index}">&times;</button>
    `;
    cartItems.appendChild(li);

    // Attach event listener to the remove item button
    li.querySelector(".remove-item").addEventListener("click", () => {
      removeItemFromCart(index);
    });
  });

  // Display total price at the bottom of the cart
  const totalPriceElement = document.createElement("p");
  totalPriceElement.innerHTML = `Total Harga: <strong>Rp ${totalPrice.toLocaleString('id-ID')}</strong>`;
  cartItems.appendChild(totalPriceElement);
}
