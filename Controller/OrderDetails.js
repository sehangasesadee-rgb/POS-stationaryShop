import { getAllOrderDetails, getOrderById } from "../model/OrderDetailsModel.js";

function loadOrderHistory() {
    const tbody = document.getElementById("orderHistoryBody");
    tbody.innerHTML = "";

    const orders = getAllOrderDetails();

    if (orders.length === 0) {
        document.getElementById("no-orders-msg").classList.remove("d-none");
        return;
    }

    document.getElementById("no-orders-msg").classList.add("d-none");

    orders.forEach(o => {
        tbody.innerHTML += `
            <tr onclick="viewOrder('${o.orderId}')" style="cursor:pointer">
                <td class="ps-4">${o.orderId}</td>
                <td>${o.date}</td>
                <td>${o.custId}</td>
                <td>${o.items.length}</td>
                <td>Rs ${o.total}</td>
                <td class="text-center">
                    <span class="badge bg-success">Completed</span>
                </td>
            </tr>
        `;
    });
}

window.initOrderDetails = function () {
    loadOrderHistory();
};

window.viewOrder = function (orderId) {
    const order = getOrderById(orderId);
    if (!order) return;

    let itemList = "";

    order.items.forEach(i => {
        itemList += `
            ${i.name} (x${i.qty}) - Rs ${i.total}`;
    });

    alert(
        `Order ID: ${order.orderId}
Date: ${order.date}
Customer: ${order.custName}

Items:${itemList}

Total: Rs ${order.total}`
    );
};