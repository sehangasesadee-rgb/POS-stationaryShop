export const REGEX = {
    name: /^[A-Za-z\s]{3,50}$/,
    phone: /^(07[01245678]\d{7}|0\d{9})$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    address: /^[A-Za-z0-9\s,.-]{4,100}$/,
    itemName: /^[A-Za-z0-9\s-]{2,50}$/,
    qty: /^[1-9]\d*$/,
    price: /^\d+(\.\d{1,2})?$/
};

export function validateCustomer(name, phone, address, email) {
    if (!REGEX.name.test(name)) return "Invalid Name. Use only letters (3-50 characters).";
    if (!REGEX.phone.test(phone)) return "Invalid Phone Number. Use a valid 10-digit number.";
    if (!REGEX.address.test(address)) return "Invalid Address.";
    if (!REGEX.email.test(email)) return "Invalid Email Address.";
    return null;
}

export function validateItem(name, qty, price) {
    if (!REGEX.itemName.test(name)) return "Invalid Item Name.";
    if (!REGEX.qty.test(qty)) return "Invalid Quantity. Must be a positive integer.";
    if (!REGEX.price.test(price) || parseFloat(price) <= 0) return "Invalid Price. Must be a positive number.";
    return null;
}
