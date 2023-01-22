const usersController = require('../users/controllers.users');
const petsController = require('../pets/constrollers.pets');

const router = (app) => {
    app.use('/api/users', usersController);
    app.use('/api/pets', petsController);
}

module.exports = router;