const { MongoCartManager } = require('../../dao/mongoClassManagers/cartsClass/cartMongoManager');
const cartsMongo = new MongoCartManager();

const { MongoProductManager } = require('../../dao/mongoClassManagers/productsClass/productMongoManager');
const productsMongo = new MongoProductManager();
const Route = require('../../router/Class.Router');

class CartRouter extends Route {
    init() {
        this.get('/', ['PUBLIC'], async (req, res) => {
            try {
                const carts = await cartsMongo.getCarts();
                res.sendSuccess(carts);
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        })

        this.post('/', ['PUBLIC'], async (req, res) => {
            try {
                const createdCart = await cartsMongo.addCart({});
                res.sendSuccess(createdCart);

            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        })

        this.get('/:id', ['PUBLIC'], async (req, res) => {
            try {
                const cartId = req.params.id;
                const getById = await cartsMongo.getCartById(cartId);
                res.sendSuccess(getById);
                //res.status(500).render('cart', getById);//mandar a vistas!!!!!!!!!!!!!
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        })

        this.post('/:cid/products/:pid', ['PUBLIC'], async (req, res) => {
            try {
                const cartId = req.params.cid;
                const productId = req.params.pid;
                const getCartById = await cartsMongo.getCartById(cartId);
                const verifyExistence = getCartById.products.find((e) => e.product.id == productId);

                if (verifyExistence) {
                    const updateCartProducts = await cartsMongo.postCartProductsId(cartId, productId, true);
                    res.sendSuccess(updateCartProducts);
                }
                else {
                    const updateCartProducts = await cartsMongo.postCartProductsId(cartId, productId, false);
                    res.sendSuccess(updateCartProducts);
                }
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        })

        this.delete('/:cid/products/:pid', ['PUBLIC'], async (req, res) => {
            try {
                const cartId = req.params.cid;
                const productId = req.params.pid;
                const getCartById = await cartsMongo.getCartById(cartId);
                const verifyExistence = getCartById.products.find((e) => e.product.id == productId);

                if (verifyExistence === undefined) {
                    res.sendUserError({ mesagge: 'not found' });
                }
                else {
                    const productsArrayPosition = getCartById.products.findIndex(item => item.product.id === productId);
                    getCartById.products.splice(productsArrayPosition, 1);
                    let newArray = getCartById.products;
                    const deleteCartProducts = await cartsMongo.deleteCartProductsId(cartId, newArray);
                    res.sendSuccess(deleteCartProducts);
                }
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        })

        this.delete('/:id', ['PUBLIC'], async (req, res) => {
            try {
                const cartId = req.params.id;
                const getById = await cartsMongo.deleteById(cartId);
                res.sendSuccess(getById);
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        })

        this.put('/:cid/products/:pid', ['PUBLIC'], async (req, res) => {
            try {
                const { quantity } = req.body;
                const cartId = req.params.cid;
                const productId = req.params.pid;
                const getCartById = await cartsMongo.getCartById(cartId);

                const verifyExistence = getCartById.products.find((e) => e.product.id == productId);
                if (verifyExistence) {
                    const updateCartProducts = await cartsMongo.updateCartProductsId(cartId, productId, true, quantity);
                    res.sendSuccess(updateCartProducts);
                }

                else {
                    const updateCartProducts = await cartsMongo.updateCartProductsId(cartId, productId, false, quantity);
                    res.sendSuccess(updateCartProducts);
                }
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        })

        this.put('/:cid', ['PUBLIC'], async (req, res) => {
            try {
                const { products } = req.body;
                const cartId = req.params.cid;
                const getCartById = await cartsMongo.updateCartId(cartId, products);
                res.sendSuccess("cart updated");
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        })
    }
}

module.exports = CartRouter;