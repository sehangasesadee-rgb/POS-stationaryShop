import { order_db, item_db } from "../db/db.js";

class Order {
    #orderId;
    #date;
    #custId;
    #custName;
    #items;
    #total;

    constructor(orderId, date, custId, custName, items, total) {
        this.#orderId = orderId;
        this.#date = date;
        this.#custId = custId;
        this.#custName = custName;
        this.#items = items;
        this.#total = total;
    }

    get orderId() { return this.#orderId; }
    get date() { return this.#date; }
    get custId() { return this.#custId; }
    get custName() { return this.#custName; }
    get items() { return this.#items; }
    get total() { return this.#total; }
}

const placeOrderModel = (orderId, date, custId, custName, items, total) => {


    items.forEach(ci => {
        const item = item_db.find(i => i.id === ci.id);
        if (item) {
            item.qty -= ci.qty;
        }
    });

    const order = new Order(orderId, date, custId, custName, items, total);
    order_db.push(order);
};

const getAllOrders = () => order_db;

export {
    placeOrderModel,
    getAllOrders
};