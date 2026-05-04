import { getAllCustomers } from "../model/CustomerModel.js";
import { getAllItems, getItemById } from "../model/ItemModel.js";
import { placeOrderModel, getAllOrders } from "../model/OrderModel.js";

let cart = [];

window.initOrder = function () {
    generateOrderId();
    loadCustomers();
    loadItems();
    setDate();
    cart = [];
    renderCart();
};

function setDate() {
    const d = new Date();
    document.getElementById("O-date").innerText = d.toISOString().split("T")[0];
}

function generateOrderId() {
    const ids = getAllOrders().map(o => parseInt(o.orderId.replace(/\D/g, '')) || 0);
    const max = ids.length ? Math.max(...ids) : 3000;
    document.getElementById("O-id").value = "ORD" + (max + 1);
}

function loadCustomers() {
    const select = document.getElementById("O-cust-select");
    select.innerHTML = `<option disabled selected>Choose Customer</option>`;

    getAllCustomers().forEach(c => {
        select.innerHTML += `<option value="${c.id}">${c.id} - ${c.name}</option>`;
    });
}

function loadItems() {
    const select = document.getElementById("O-item-select");
    select.innerHTML = `<option disabled selected>Choose Item</option>`;

    getAllItems().forEach(i => {
        select.innerHTML += `<option value="${i.id}">${i.id} - ${i.name}</option>`;
    });
}

window.loadOrderCustomerDetails = function () {
    const id = document.getElementById("O-cust-select").value;
    const c = getAllCustomers().find(c => c.id === id);

    document.getElementById("O-cust-name").innerText = c ? c.name : "N/A";
};

window.loadOrderItemDetails = function () {
    const id = document.getElementById("O-item-select").value;
    const item = getItemById(id);

    if (!item) return;

    document.getElementById("O-item-display-name").innerText = item.name;
    document.getElementById("O-unit-price").innerText = "Rs. " + item.price;
    document.getElementById("O-stock").innerText = item.qty;
};

window.addToCart = function () {

    const id = document.getElementById("O-item-select").value;
    const qty = parseInt(document.getElementById("O-qty").value);

    const item = getItemById(id);

    if (!item || !qty || qty <= 0) {
        alert("Invalid input");
        return;
    }

    if (qty > item.qty) {
        alert("Not enough stock");
        return;
    }

    const existing = cart.find(ci => ci.id === id);

    if (existing) {
        existing.qty += qty;
        existing.total = existing.qty * existing.price;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: qty,
            total: qty * item.price
        });
    }

    renderCart();
};

function renderCart() {
    const tbody = document.getElementById("cartTableBody");
    tbody.innerHTML = "";

    let net = 0;

    cart.forEach((c, index) => {
        net += c.total;

        tbody.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.qty}</td>
                <td>${c.price}</td>
                <td>${c.total}</td>
                <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})">X</button></td>
            </tr>
        `;
    });

    document.getElementById("net-total").innerText = net.toFixed(2);
}

window.removeItem = function (index) {
    cart.splice(index, 1);
    renderCart();
};

window.placeOrder = function () {

    const custId = document.getElementById("O-cust-select").value;
    const custName = document.getElementById("O-cust-name").innerText;

    if (!custId || cart.length === 0) {
        alert("Complete order details");
        return;
    }

    const orderId = document.getElementById("O-id").value;
    const date = document.getElementById("O-date").innerText;
    const total = parseFloat(document.getElementById("net-total").innerText);

    placeOrderModel(orderId, date, custId, custName, cart, total);

    alert("Order Placed!");

    cart = [];
    renderCart();
    generateOrderId();
};