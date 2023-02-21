const Cart = require("../../models/carts.model");

class MongoCartManager {

    async getCarts() {
        try {
            const carts = await Cart.find();
            return carts;
        }
        catch (error) {
            return error;
        }
    }

    async addCart(cart) {
        try {
            const addMongoCart = await Cart.create(cart);
            return "Cart added successfully";
        }
        catch (error) {
            return error;
        }
    }

    async getCartById(id) {
        try {
            const getCartByIdMongo = await Cart.findById(id);
            return getCartByIdMongo;

        }
        catch (error) {
            return error;
        }
    }

    async updateCartProductsId(id, arrayProducts) {
        try {
            const getProductByIdMongo = await Cart.findByIdAndUpdate(id, { products: arrayProducts });
            return "cart products updated"
        }
        catch (error) {
            return error;
        }
    }
}

module.exports = { MongoCartManager };
