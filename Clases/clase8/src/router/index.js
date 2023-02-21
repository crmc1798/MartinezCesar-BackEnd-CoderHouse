const usersControllers = require('../users/controller.users');

const router = (app) => {
    app.use('/api/users', usersControllers);
};

module.exports = router;