const viewsController = require('../controllers/chat/controller.chat');
const productsController = require('../controllers/products/controller.products');
const cartsController = require('../controllers/carts/controller.carts');
const realTimeProductsController = require('../controllers/realTime/controller.realTimeProducts');

//const cookieController = require('../controllers/cookies/controller.cookies');
const loginSingupController = require('../controllers/LoginSingup/controller.loginSingup')
const usersController = require('../controllers/users/controller.users');
const authController = require('../controllers/auth/controller.auth');

const fsProductsController = require('../controllers/products/controller.fs.products');
const fsCartsController = require('../controllers/carts/controller.fs.carts ');

const router = (app) => {
    app.use('/chat', viewsController)
    app.use('/api/products', productsController);
    app.use('/api/carts', cartsController);
    app.use('/realTimeProducts', realTimeProductsController);

    app.use('/',loginSingupController);
    app.use('/user', usersController);
    app.use('/auth', authController);

    app.use('/api/fs/products', fsProductsController);
    app.use('/api/fs/carts', fsCartsController);
};

module.exports = router;