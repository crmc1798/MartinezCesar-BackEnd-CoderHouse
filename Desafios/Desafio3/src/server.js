const {ProductManager} = require("./productManager.js");
const express = require("express");

const products = new ProductManager("./src/products.txt")

const app = express();
const port = 8080;

//Url ejemplos
//http://localhost:8080/products
//http://localhost:8080/products?limit=5
app.get('/products', async (req, res) => {
    const getAll = await products.getProducts();
    if (req.query.limit) {
        res.json(Object.values(getAll).slice(0, req.query.limit))
    } else {
        res.json(getAll);
    }
  })

//Url ejemplos
//http://localhost:8080/products/2
//http://localhost:8080/products/34123123
app.get('/products/:id', async (req, res) => {
    const getAll = await products.getProducts();
    const {id} = req.params;
    const totalProducts = Object.values(getAll).length;
    const condition = (Number(id) < totalProducts) && (Number(id) > 0);
    if (condition) {
        const getById = await products.getProductById(Number(id));
        res.json(getById);
    } 
    else 
    {
        res.json({mesagge: `Not found item ${id}`})
    }
})


app.listen(port,()=>{
    console.log(`Server runing at port ${port}`)
});