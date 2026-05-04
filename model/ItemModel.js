import { item_db } from "../db/db.js";

class Item {
    #id;
    #name;
    #qty;
    #price;
    #category;

    constructor(id, name, qty, price, category) {
        this.#id = id;
        this.#name = name;
        this.#qty = qty;
        this.#price = price;
        this.#category = category;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get qty() { return this.#qty; }
    get price() { return this.#price; }
    get category() { return this.#category; }

    set id(v) { this.#id = v; }
    set name(v) { this.#name = v; }
    set qty(v) { this.#qty = v; }
    set price(v) { this.#price = v; }
    set category(v) { this.#category = v; }
}

const addItem = (id, name, qty, price, category) => {
    item_db.push(new Item(id, name, qty, price, category));
};

const updateItem = (index, id, name, qty, price, category) => {
    const i = item_db[index];
    if (!i) return;

    i.id = id;
    i.name = name;
    i.qty = qty;
    i.price = price;
    i.category = category;
};

const deleteItem = (index) => {
    item_db.splice(index, 1);
};

const getAllItems = () => item_db;
const getItemByIndex = (i) => item_db[i];
const getItemById = (id) => item_db.find(i => i.id === id);

export {
    addItem,
    updateItem,
    deleteItem,
    getAllItems,
    getItemByIndex,
    getItemById
};