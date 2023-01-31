const {Router} = require('express');

const router = Router();

const {ProductManager} = require("../classManagers/productManager");
const productsJson = new ProductManager("./src/classManagers/products.json");

//Url ejemplos
//http://localhost:8080/api/products
//http://localhost:8080/api/products?limit=5
router.get('/', async (req, res) => {
    const getAll = await productsJson.getProducts();
    // let data;
    // if (req.query.limit) {
    //     data = Object.values(getAll).slice(0, req.query.limit);
    //     res.render('home.handlebars', {data});
    // } else {
    //     let data = getAll;
    //     res.render('home.handlebars', {data});
    // }
    res.render('home.handlebars', {style: 'style.css'})
});

//Url ejemplos
//http://localhost:8080/api/products/5
//http://localhost:8080/api/products/111
router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    const getById = await productsJson.getProductById(Number(productId));
    if(getById === "Not Found"){
        res.status(404).json({mesagge: getById});
    }
    else{
        res.status(200).json({mesagge: getById});
            
    }
});

//url ejemplo
//http://localhost:8080/api/products
//body raw en postman para .post
// {
//     "title": "Titulo prueba", 
//     "description": "Descripcion prueba", 
//     "price": 999, 
//     "thumbnail": ["url prueba"], 
//     "code": "A-prueba-Z", 
//     "stock": 999,
//     "status": true,
//     "category": "Categoria prueba"
// }
router.post('/', async (req, res) => {
    const {title, description, price, thumbnail, code, stock, status, category} = req.body;

    const newProduct ={
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

    if(verifyExistenceUndefined === -1){
        const createdProduct = await productsJson.addProduct(newProduct);
        res.json({mesagge: createdProduct});
    }
    else{
        res.status(406).json({mesagge: "Product with missing information"});
    }
});


//url ejemplo
//http://localhost:8080/api/products/11
//body raw en postman para .put
// {
//     "title": "Titulo actualizado", 
//     "description": "Descripcion actualizado", 
//     "price": 111, 
//     "thumbnail": ["url actualizado"], 
//     "code": "A-actualizado-Z", 
//     "stock": 111,
//     "status": true,
//     "category": "Categoria actualizado"
// }
router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const {title, description, price, thumbnail, code, stock, status, category} = req.body;

    const newUpdatedProduct ={
        title, 
        description, 
        price, 
        thumbnail, 
        code, 
        stock, 
        status, 
        category
    }

    const getById = await productsJson.getProductById(Number(productId));
    if(getById === "Not Found"){
        res.status(404).json({mesagge: getById});
    }
    else{
        const verifyExistenceUndefined = Object.values(newUpdatedProduct).indexOf(undefined);

        if(verifyExistenceUndefined === -1){
            const UpdatedProduct = await productsJson.updateProduct(Number(productId),newUpdatedProduct);
            res.json({mesagge: UpdatedProduct});
        }
        else{
            res.status(406).json({mesagge: "Product with missing information"});
        }
            
    }
});

//Url ejemplos
//http://localhost:8080/api/products/5
//http://localhost:8080/api/products/111
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    const getById = await productsJson.deleteById(Number(productId));
    if(getById === "Not Found"){
        res.status(404).json({mesagge: getById});
    }
    else{
        res.status(200).json({mesagge: getById});
            
    }
});


module.exports = router;