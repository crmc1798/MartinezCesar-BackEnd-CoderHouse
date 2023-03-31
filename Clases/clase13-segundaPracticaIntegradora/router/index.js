const {Router} = require('express');
const UserRouter = require('./users.router');

const router = Router();


const userRouter = new UserRouter();

router.use('/api',  userRouter.getRouter());

module.exports = router;