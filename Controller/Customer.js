import {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerByIndex,
    getCustomerById
} from "../model/CustomerModel.js";
import { validateCustomer } from "../utils/regex_utils.js";

let selectedIndex = -1;

function clearForm() {
    $("#id").val('');
    $("#name").val('');
    $("#phone").val('');
    $("#address").val('');
    $("#email").val('');
    selectedIndex = -1;
}

function loadTable() {
    const tbody = $("#tableBody");
    tbody.empty();

    getAllCustomers().forEach((c, index) => {
        tbody.append(`
            <tr data-index="${index}" style="cursor:pointer">
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.phone}</td>
                <td>${c.address}</td>
                <td>${c.email}</td>
            </tr>
        `);
    });
}

$("#tableBody").on("click", "tr", function () {
    selectedIndex = $(this).data("index");

    $("#tableBody tr").removeClass("table-info");
    $(this).addClass("table-info");

    const c = getCustomerByIndex(selectedIndex);

    $("#id").val(c.id);
    $("#name").val(c.name);
    $("#phone").val(c.phone);
    $("#address").val(c.address);
    $("#email").val(c.email);
});

function generateId() {
    const ids = getAllCustomers().map(c => parseInt(c.id.replace(/\D/g, '')) || 0);
    const max = ids.length ? Math.max(...ids) : 1000;
    return "C" + String(max + 1).padStart(3, '0');
}

function isValid() {
    const name = $("#name").val().trim();
    const phone = $("#phone").val().trim();
    const address = $("#address").val().trim();
    const email = $("#email").val().trim();

    if (!name || !phone || !address || !email) {
        alert("All fields required");
        return false;
    }

    const error = validateCustomer(name, phone, address, email);
    if (error) {
        alert(error);
        return false;
    }

    return true;
}

window.addCustomer = function () {

    if (!isValid()) return;

    let id = $("#id").val();

    if (!id) {
        id = generateId();
        $("#id").val(id);
    }

    if (getCustomerById(id)) {
        alert("ID exists!");
        return;
    }

    addCustomer(
        id,
        $("#name").val(),
        $("#phone").val(),
        $("#address").val(),
        $("#email").val()
    );

    loadTable();
    clearForm();
};

window.updateCustomer = function () {

    if (selectedIndex === -1) {
        alert("Select customer first");
        return;
    }

    if (!isValid()) return;

    updateCustomer(
        selectedIndex,
        $("#id").val(),
        $("#name").val(),
        $("#phone").val(),
        $("#address").val(),
        $("#email").val()
    );

    loadTable();
    clearForm();
};

window.deleteCustomer = function () {

    if (selectedIndex === -1) {
        alert("Select customer first");
        return;
    }

    deleteCustomer(selectedIndex);

    loadTable();
    clearForm();
};

window.reset = clearForm;

$(document).ready(function() {
    loadTable();
    $("#id").val(generateId());
});