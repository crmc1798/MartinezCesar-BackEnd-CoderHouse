const userController = require('../user/controller.users')

const router = app => {
    app.use('/users', userController);
}

module.exports = router;