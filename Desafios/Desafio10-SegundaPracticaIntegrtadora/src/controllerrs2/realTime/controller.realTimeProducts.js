const { MongoProductManager } = require('../../dao/mongoClassManagers/productsClass/productMongoManager');
const productsMongo = new MongoProductManager();

const Route = require("../../router/Class.Router");

class RealTimeRouter extends Route {
  init() {
    this.get('/', ['PUBLIC'], async (req, res) => {
        const products = await productsMongo.getProducts();
        const getAll = products;
    
        global.io.emit('productsList', products);
        res.render('realTimeProducts.handlebars',  {getAll} );
    })
  }
}

module.exports = RealTimeRouter;