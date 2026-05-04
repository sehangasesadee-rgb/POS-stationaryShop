import { customer_db } from "../db/db.js";

class Customer {
    #id;
    #name;
    #phone;
    #address;
    #email;

    constructor(id, name, phone, address, email) {
        this.#id = id;
        this.#name = name;
        this.#phone = phone;
        this.#address = address;
        this.#email = email;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get phone() { return this.#phone; }
    get address() { return this.#address; }
    get email() { return this.#email; }

    set id(v) { this.#id = v; }
    set name(v) { this.#name = v; }
    set phone(v) { this.#phone = v; }
    set address(v) { this.#address = v; }
    set email(v) { this.#email = v; }
}

const addCustomer = (id, name, phone, address, email) => {
    const c = new Customer(id, name, phone, address, email);
    customer_db.push(c);
};

const updateCustomer = (index, id, name, phone, address, email) => {
    const c = customer_db[index];
    if (!c) return;

    c.id = id;
    c.name = name;
    c.phone = phone;
    c.address = address;
    c.email = email;
};

const deleteCustomer = (index) => {
    customer_db.splice(index, 1);
};

const getAllCustomers = () => customer_db;
const getCustomerByIndex = (i) => customer_db[i];
const getCustomerById = (id) => customer_db.find(c => c.id === id);

export {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerByIndex,
    getCustomerById
};