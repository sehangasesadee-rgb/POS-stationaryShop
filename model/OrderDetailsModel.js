import { order_db } from "../db/db.js";

const getAllOrderDetails = () => order_db;

const getOrderById = (id) => {
    return order_db.find(o => o.orderId === id);
};

export {
    getAllOrderDetails,
    getOrderById
};
