import * as CustomerModel from "../model/CustomerModel.js";
import * as ItemModel from "../model/ItemModel.js";
import * as OrderModel from "../model/OrderModel.js";

const USERS = {admin: "admin123", cashier: "cash456"};

window.doLogin = function () {
    const u = $("#login-user").val().trim();
    const p = $("#login-pass").val();
    if (USERS[u] && USERS[u] === p) {
        $("#login-err").addClass("d-none");
        $("#login-container").addClass("d-none");
        $("#app").removeClass("d-none");
    } else {
        $("#login-err").removeClass("d-none");
    }
};

window.logout = function () {
    $("#app").addClass("d-none");
    $("#login-container").removeClass("d-none");
    $("#login-user").val("");
    $("#login-pass").val("");
    $("#login-err").addClass("d-none");
};

function hideAllSections() {
    ["home", "customer", "item", "order", "order-details"].forEach(id => {
        $(`#${id}`).addClass("d-none");
    });
}

window.showHome = function () {
    hideAllSections();
    $("#home").removeClass("d-none");

    const customers = CustomerModel.getAllCustomers();
    const items = ItemModel.getAllItems();
    const orderHistory = OrderModel.getAllOrders();

    $("#stat-customers").text(customers.length);
    $("#stat-items").text(items.length);
    $("#stat-orders").text(orderHistory.length);

    let revenue = 0;
    orderHistory.forEach(order => {
        let total = parseFloat(String(order.total).replace(/[^0-9.-]+/g, ""));
        if (!isNaN(total)) {
            revenue += total;
        }
    });
    $("#stat-revenue").text("Rs. " + revenue.toLocaleString(undefined, {minimumFractionDigits: 2}));
};

window.showCustomer = function () {
    hideAllSections();
    $("#customer").removeClass("d-none");
    if (window.renderCustomers) window.renderCustomers();
};

window.showItem = function () {
    hideAllSections();
    $("#item").removeClass("d-none");
    if (window.renderItems) window.renderItems();
};

window.showOrder = function () {
    hideAllSections();
    $("#order").removeClass("d-none");
    if (window.initOrder) window.initOrder();
};

window.showOrderDetails = function () {
    hideAllSections();
    $("#order-details").removeClass("d-none");
    if (window.initOrderDetails) window.initOrderDetails();
};
