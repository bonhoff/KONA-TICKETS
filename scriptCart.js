document.addEventListener("DOMContentLoaded", function () {
    cartCard();
    totalAmount();

    document.getElementById("goBackBtn").addEventListener("click", () => {
        goback();
    });

    document.getElementById("clearCartBtn").addEventListener("click", () => {
        clearCart();
    });

    document.getElementById("checkOutBtn").addEventListener("click", () => {
        checkout();
    });



});
function cartCard() {
    const selectedTicketsJSON = localStorage.getItem("ticketSel");
    const selectedTickets = JSON.parse(selectedTicketsJSON);
    const cartItems = document.querySelector(".cart-item");
    let ticketName;
    let ticketPrice;

    for (let key in selectedTickets) {
        const ticket = selectedTickets[key];
        ticketName = ticket.name;
        ticketPrice = ticket.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cartDiv");
        cartItem.innerHTML += `
        <div class="col-md-8">
            <h5 class="card-title">${ticketName}</h5>
            <p>${ticketPrice}</p>
        </div>`;
        cartItems.appendChild(cartItem);
    }

}

function goback() {
    window.location.href = 'index.html';
}

function clearCart() {
    localStorage.removeItem('ticketSel');
    const cartItems = document.querySelector(".cart-item");
    cartItems.innerHTML = "";
    totalAmount();
}

function checkout() {
    const selectedTicketsJSON = localStorage.getItem("ticketSel");
    if (selectedTicketsJSON != null) {
        alert("Checkout Successful!");
        clearCart();
    } else {
        alert("Cart is empty");
    }
}

function totalAmount() {
    let totalAmount = document.querySelector(".totalAmount");
    const selectedTicketsJSON = localStorage.getItem("ticketSel");
    const selectedTickets = JSON.parse(selectedTicketsJSON);
    let total = 0;
    if (selectedTickets != null) {
        for (let key in selectedTickets) {
            const ticket = selectedTickets[key];
            const price = ticket.price;
            total += parseInt(price);
        }
    }else{
        total =0;
    }
    totalAmount.innerText = "Total Amount: $" + total;

}

