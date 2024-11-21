let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalItems = document.getElementById("total-items");
const totalPrice = document.getElementById("total-price");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.getElementById("close-modal");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart");

// Add items to the cart
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

    updateCart(); // Update cart display after item is added
  });
});

// Open cart modal when the cart button is clicked
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "block";
  cartModal.style.transform = "translateX(0)"; // Slide in the modal
});

// Close cart modal when the close button is clicked
closeModal.addEventListener("click", () => {
  cartModal.style.transform = "translateX(100%)"; // Slide out the modal
  setTimeout(() => {
    cartModal.style.display = "none";
  }, 300); // Delay hiding the modal to allow the slide-out effect
});

// Remove item from cart by index
function removeItemFromCart(index) {
  cart.splice(index, 1); // Remove item from cart array
  updateCart(); // Update cart display after item is removed
}

// Clear all items from cart
clearCartBtn.addEventListener("click", () => {
  cart = []; // Clear the cart array
  updateCart(); // Update cart display
});

// Update cart display
function updateCart() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // Update cart count
  totalPrice.textContent = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); // Update total price

  cartItems.innerHTML = ""; // Clear current cart items

  // Loop through the cart and display each item
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (x${item.quantity}) - Rp ${item.price * item.quantity}
      <button class="remove-item" data-index="${index}">Batalkan</button>
    `;
    cartItems.appendChild(li); // Add item to cart list

    // Add event listener for "Batalkan" button
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        removeItemFromCart(index); // Remove item from cart
      });
    });
  });

  totalItems.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // Update total quantity
}
