let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalItems = document.getElementById("total-items");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.getElementById("close-modal");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart");

// Tambahkan item ke keranjang
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

    updateCart(); // Perbarui tampilan keranjang
  });
});

// Buka modal keranjang
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "block";
  cartModal.style.transform = "translateX(0)"; // Animasi slide-in
});

// Tutup modal keranjang
closeModal.addEventListener("click", () => {
  cartModal.style.transform = "translateX(100%)"; // Animasi slide-out
  setTimeout(() => {
    cartModal.style.display = "none";
  }, 300); // Beri waktu untuk animasi selesai
});

// Hapus item dari keranjang
function removeItemFromCart(index) {
  cart[index].quantity -= 1; // Kurangi jumlah barang
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // Hapus item jika jumlahnya nol
  }
  updateCart(); // Perbarui tampilan keranjang
}

// Kosongkan semua item di keranjang
clearCartBtn.addEventListener("click", () => {
  cart = []; // Kosongkan array keranjang
  updateCart(); // Perbarui tampilan keranjang
});

// Perbarui tampilan keranjang
function updateCart() {
  // Hitung jumlah total barang dan harga
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Perbarui elemen tampilan
  cartCount.textContent = totalQuantity;
  totalItems.textContent = totalQuantity;

  cartItems.innerHTML = ""; // Kosongkan daftar keranjang

  // Tambahkan setiap item ke dalam daftar keranjang
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (x${item.quantity}) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}
      <button class="remove-item" data-index="${index}">&times;</button>
    `;
    cartItems.appendChild(li);

    // Tambahkan event listener ke tombol hapus
    li.querySelector(".remove-item").addEventListener("click", () => {
      removeItemFromCart(index);
    });
  });

  // Tambahkan elemen total harga di bagian bawah
  const totalPriceElement = document.createElement("p");
  totalPriceElement.innerHTML = `Total Harga: <strong>Rp ${totalPrice.toLocaleString('id-ID')}</strong>`;
  cartItems.appendChild(totalPriceElement);
}
