const { Router } = require('express');
const { MongoProductManager } = require('../dao/mongoClassManagers/productsClass/productMongoManager');
const productsMongo = new MongoProductManager();
const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await productsMongo.getProducts();
        let data;
        if (req.query.limit) {
            data = Object.values(products).slice(0, req.query.limit);
            res.render('home.handlebars', { data });
        } else {
            data = products;
            res.render('home.handlebars', { data });
        }


    } catch (error) {
        res.status(500).json({ mesagge: { error } });
    }

});

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    const getById = await productsMongo.getProductById(productId);
    res.status(200).json({ mesagge: getById });
});

router.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        }

        const verifyExistenceUndefined = Object.values(newProduct).indexOf(undefined);

        if (verifyExistenceUndefined === -1) {
            const createdProduct = await productsMongo.addProduct(newProduct);
            const products = await productsMongo.getProducts();
            global.io.emit('statusProductsList', products);
            res.json({ mesagge: createdProduct });
        }
        else {
            res.status(406).json({ mesagge: "Product with missing information" });
        }
    } catch (error) {
        res.status(500).json({ mesagge: { error } });
    }
});

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;

    const newUpdatedProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
    }

    const verifyExistenceUndefined = Object.values(newUpdatedProduct).indexOf(undefined);

    if (verifyExistenceUndefined === -1) {
        const UpdatedProduct = await productsMongo.updateProduct(productId, newUpdatedProduct);
        const products = await productsMongo.getProducts();
        global.io.emit('statusProductsList', products);
        res.json({ mesagge: UpdatedProduct });
    }
    else {
        res.status(406).json({ mesagge: "Product with missing information" });
    }
});

router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    const getById = await productsMongo.deleteById(productId);
    const products = await productsMongo.getProducts();
    global.io.emit('statusProductsList', products);
    res.status(200).json({ mesagge: getById });
});

module.exports = router;