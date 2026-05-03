function goToDashboard(){
    document.getElementById("login-container").classList.add("d-none");
    document.getElementById("app").classList.remove("d-none");
}

function logout(){
    document.getElementById("app").classList.add("d-none");
    document.getElementById("login-container").classList.remove("d-none");
}
// Okkoma sections hide karanawa aluth section ekakata yanna kalin
function hideAllSections() {
    document.getElementById("home").classList.add("d-none");
    document.getElementById("customer").classList.add("d-none");
    document.getElementById("item").classList.add("d-none");
    document.getElementById("order").classList.add("d-none");
}
// Customer section eka witharak pennanawa
function showCustomer(){
    hideAllSections();
    document.getElementById("customer").classList.remove("d-none");
}

function showItem() {
    hideAllSections();
    // Item section eka witharak pennanawa
    document.getElementById("item").classList.remove("d-none");
}

function showOrder(){
    hideAllSections();
    // Order section eka pennala, ada dinaya saha random Order ID ekak hadanawa
    document.getElementById("order").classList.remove("d-none");

    document.getElementById("O-date").innerText = new Date().toISOString().split('T')[0];
    document.getElementById("O-id").value = "ORD-" + Math.floor(Math.random() * 9000 + 1000);
    // Dropdown menu walata data load karanawa
    loadOrderSelectors();
}





//////////////////////////////////////// Customer Management ///////////////////////////////////////////////
let customers = [];
let selectedIndex = -1;

function addCustomer() { //add customer
    let customer = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value
    };
    if (customer.id && customer.name) {
        customers.push(customer);
        renderCustomers();
        reset();
    } else { alert("Enter ID and Name."); }
}

// Array eke thiyena data tika table ekata load karanawa
function renderCustomers() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    customers.forEach((c, i) => {
        tableBody.innerHTML += `<tr onclick="selectRow(${i})" style="cursor:pointer"><td>${c.id}</td><td>${c.name}</td><td>${c.phone}</td><td>${c.address}</td><td>${c.email}</td></tr>`;
    });
}


// Table eke row ekak click karahama e details aye form ekata gannawa
function selectRow(i) {
    selectedIndex = i;
    let c = customers[i];
    document.getElementById("id").value = c.id;
    document.getElementById("name").value = c.name;
    document.getElementById("phone").value = c.phone;
    document.getElementById("address").value = c.address;
    document.getElementById("email").value = c.email;
}

function updateCustomer() { //update customer
    if (selectedIndex === -1) return;
    customers[selectedIndex] = {
        id: document.getElementById("id").value, name: document.getElementById("name").value,
        phone: document.getElementById("phone").value, address: document.getElementById("address").value,
        email: document.getElementById("email").value
    };
    renderCustomers(); reset();
}

function deleteCustomer() { //delete customer
    if (selectedIndex === -1) return;
    customers.splice(selectedIndex, 1);
    renderCustomers(); reset();
}


// Input fields okkoma clear karanawa
function reset() {
    document.getElementById("id").value = ""; document.getElementById("name").value = "";
    document.getElementById("phone").value = ""; document.getElementById("address").value = "";
    document.getElementById("email").value = ""; selectedIndex = -1;
}






/////////////////////////////////////////////////Item Management////////////////////////////////////////////////
let items = [];
let selectedItemIndex = -1;

function addItem() { //item add
    let item = {
        id: document.getElementById("I-id").value,
        name: document.getElementById("I-name").value,
        qty: parseInt(document.getElementById("Qty").value),
        price: parseFloat(document.getElementById("unitPrice").value),
        category: document.getElementById("category").value
    };
    if (item.id && item.name) {
        items.push(item);
        renderItems(); resetItem();
    }
}

function renderItems() { //item table ekata load kireema
    const tableBody = document.getElementById("tableBody-I");
    tableBody.innerHTML = "";
    items.forEach((item, index) => {
        tableBody.innerHTML += `<tr onclick="selectItemRow(${index})" style="cursor:pointer"><td>${item.id}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td><td>${item.category}</td></tr>`;
    });
}

function selectItemRow(index) {// Table eke row ekak click karahama e details aye form ekata gannawa
    selectedItemIndex = index;
    let item = items[index];
    document.getElementById("I-id").value = item.id;
    document.getElementById("I-name").value = item.name;
    document.getElementById("Qty").value = item.qty;
    document.getElementById("unitPrice").value = item.price;
    document.getElementById("category").value = item.category;
}

function updateItemr() { //update item
    if (selectedItemIndex === -1) return;
    items[selectedItemIndex] = {
        id: document.getElementById("I-id").value, name: document.getElementById("I-name").value,
        qty: parseInt(document.getElementById("Qty").value), price: parseFloat(document.getElementById("unitPrice").value),
        category: document.getElementById("category").value
    };
    renderItems(); resetItem();
}

function deleteItem() { //delete item
    if (selectedItemIndex === -1) return;
    items.splice(selectedItemIndex, 1);
    renderItems(); resetItem();
}


// Input fields okkoma clear karanawa
function resetItem() {
    document.getElementById("I-id").value = ""; document.getElementById("I-name").value = "";
    document.getElementById("Qty").value = ""; document.getElementById("unitPrice").value = "";
    document.getElementById("category").value = ""; selectedItemIndex = -1;
}








//////////////////////////////////////// Order Management ///////////////////////////////////////////////

let cart = [];

function loadOrderSelectors() {
    const cSelect = document.getElementById("O-cust-select");
    const iSelect = document.getElementById("O-item-select");

    cSelect.innerHTML = '<option value="" selected disabled>Choose Customer</option>';
    customers.forEach(c => cSelect.innerHTML += `<option value="${c.id}">${c.id} - ${c.name}</option>`);

    iSelect.innerHTML = '<option value="" selected disabled>Choose Item</option>';
    items.forEach(i => iSelect.innerHTML += `<option value="${i.id}">${i.id} - ${i.name}</option>`);
}


// Dropdown walata customers la saha items lage names load karanawa
function loadOrderCustomerDetails() {
    let id = document.getElementById("O-cust-select").value;
    let customer = customers.find(c => c.id == id);
    document.getElementById("O-cust-name").innerText = customer ? customer.name : "Select a customer";
}

function loadOrderItemDetails() {
    let id = document.getElementById("O-item-select").value;
    let item = items.find(i => i.id == id);
    if (item) {
        document.getElementById("O-item-display-name").innerText = item.name;
        document.getElementById("O-unit-price").innerText = "Rs. " + item.price.toFixed(2);
        document.getElementById("O-stock").innerText = item.qty;
    }
}

// Thoraagaththu item eka cart ekata ekathu karanawa
function addToCart() {
    let itemId = document.getElementById("O-item-select").value;
    let qty = parseInt(document.getElementById("O-qty").value);
    let item = items.find(i => i.id == itemId);

    if (!item || isNaN(qty) || qty <= 0) { alert("Invalid input."); return; }
    if (qty > item.qty) { alert("Stock low!"); return; }

    let total = item.price * qty;
    cart.push({ id: item.id, name: item.name, qty: qty, price: item.price, total: total });

    renderCart();
    document.getElementById("O-qty").value = "";
}

function renderCart() {
    const tbody = document.getElementById("cartTableBody");
    tbody.innerHTML = "";
    let netTotal = 0;
    cart.forEach(c => {
        netTotal += c.total;
        tbody.innerHTML += `<tr><td>${c.id}</td><td>${c.name}</td><td>${c.qty}</td><td>${c.price.toFixed(2)}</td><td>${c.total.toFixed(2)}</td></tr>`;
    });
    document.getElementById("net-total").innerText = netTotal.toFixed(2);
}

// Order eka confirm karahama main items array eke thiyena stock eka adu karanawa
function placeOrder() {
    if (cart.length === 0) { alert("Cart empty."); return; }

    cart.forEach(cartItem => {
        let item = items.find(i => i.id == cartItem.id);
        if (item) item.qty -= cartItem.qty;
    });

    alert("Order Placed Successfully!");
    cart = [];
    renderCart();
    renderItems();
}