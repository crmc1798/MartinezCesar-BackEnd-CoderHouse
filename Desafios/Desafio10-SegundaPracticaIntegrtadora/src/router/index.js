const fsProductsController = require('../controllers/products/controller.fs.products');
const fsCartsController = require('../controllers/carts/controller.fs.carts ');
const ProductsRouter = require('../controllerrs2/products/controller.products');
const AuthRouter = require('../controllerrs2/auth/controller.auth');
const CartRouter = require('../controllerrs2/carts/controller.carts');
const ChatRouter = require('../controllerrs2/chat/controller.chat');
const LoginSingupRouter = require('../controllerrs2/LoginSingup/controller.loginSingup');
const RealTimeRouter = require('../controllerrs2/realTime/controller.realTimeProducts');
const UsersRouter = require('../controllerrs2/users/controller.users');
const SessionRouter = require('../controllerrs2/sessions/controller.sessions');


const productsRouter = new ProductsRouter();
const authRouter = new AuthRouter();
const cartRouter = new CartRouter();
const chatRouter = new ChatRouter();
const loginSingupRouter = new LoginSingupRouter();
const realTimeRouter = new RealTimeRouter();
const usersRouter = new UsersRouter();
const sessionRouter = new SessionRouter();

const router = (app) => {
    app.use('/chat', chatRouter.getRouter())
    app.use('/api/products', productsRouter.getRouter());
    app.use('/api/carts', cartRouter.getRouter());
    app.use('/realTimeProducts', realTimeRouter.getRouter());

    app.use('/',loginSingupRouter.getRouter());
    app.use('/user', usersRouter.getRouter());
    app.use('/auth', authRouter.getRouter());
    app.use('/api/sessions', sessionRouter.getRouter());

    app.use('/api/fs/products', fsProductsController);
    app.use('/api/fs/carts', fsCartsController);
};

module.exports = router;