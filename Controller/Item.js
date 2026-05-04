import {
    addItem,
    updateItem,
    deleteItem,
    getAllItems,
    getItemByIndex,
    getItemById
} from "../model/ItemModel.js";
import { validateItem } from "../utils/regex_utils.js";

let selectedIndex = -1;

function clearForm() {
    $("#I-id").val('');
    $("#I-name").val('');
    $("#Qty").val('');
    $("#unitPrice").val('');
    $("#category").val('');
    selectedIndex = -1;
}

function loadTable() {
    const tbody = $("#tableBody-I");
    tbody.empty();

    getAllItems().forEach((i, index) => {
        tbody.append(`
            <tr data-index="${index}" style="cursor:pointer">
                <td>${i.id}</td>
                <td>${i.name}</td>
                <td>${i.qty}</td>
                <td>${i.price}</td>
                <td>${i.category}</td>
            </tr>
        `);
    });
}

$("#tableBody-I").on("click", "tr", function () {
    selectedIndex = $(this).data("index");

    $("#tableBody-I tr").removeClass("table-info");
    $(this).addClass("table-info");

    const i = getItemByIndex(selectedIndex);

    $("#I-id").val(i.id);
    $("#I-name").val(i.name);
    $("#Qty").val(i.qty);
    $("#unitPrice").val(i.price);
    $("#category").val(i.category);
});

function generateId() {
    const ids = getAllItems().map(i => parseInt(i.id.replace(/\D/g, '')) || 0);
    const max = ids.length ? Math.max(...ids) : 2000;
    return "I" + String(max + 1).padStart(3, '0');
}

function isValid() {
    const name = $("#I-name").val().trim();
    const qty = $("#Qty").val();
    const price = $("#unitPrice").val();
    const category = $("#category").val();

    if (!name || !qty || !price || !category) {
        alert("All fields required");
        return false;
    }

    const error = validateItem(name, qty, price);
    if (error) {
        alert(error);
        return false;
    }

    return true;
}

window.addItem = function () {

    if (!isValid()) return;

    let id = $("#I-id").val();

    if (!id) {
        id = generateId();
        $("#I-id").val(id);
    }

    if (getItemById(id)) {
        alert("ID exists!");
        return;
    }

    addItem(
        id,
        $("#I-name").val(),
        parseInt($("#Qty").val()),
        parseFloat($("#unitPrice").val()),
        $("#category").val()
    );

    loadTable();
    clearForm();
};

window.updateItemr = function () {

    if (selectedIndex === -1) {
        alert("Select item first");
        return;
    }

    if (!isValid()) return;

    updateItem(
        selectedIndex,
        $("#I-id").val(),
        $("#I-name").val(),
        parseInt($("#Qty").val()),
        parseFloat($("#unitPrice").val()),
        $("#category").val()
    );

    loadTable();
    clearForm();
};

window.deleteItem = function () {

    if (selectedIndex === -1) {
        alert("Select item first");
        return;
    }

    deleteItem(selectedIndex);

    loadTable();
    clearForm();
};

window.resetItem = clearForm;

$(document).ready(function() {
    loadTable();
    $("#I-id").val(generateId());
});