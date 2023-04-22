const passport = require('passport');

const Route = require("../../router/Class.Router");

class UsersRouter extends Route {
  init() {
    this.post('/', ['PUBLIC'], passport.authenticate('register', { failureRedirect: '/user/failRegister' }), async (req, res) => {
      try {
        res.send({ message: 'Usuario registrado' });
      } catch (error) {
        if (error.code === 11000) return res.status(400).json({ error: 'El usuario ya existe' })
        res.status(500).json({ error: 'Internal server error' })
      }
    })

    this.get('/failRegister', ['PUBLIC'],  (req, res) => {
  res.send({ error: 'Falló el registro' });
  })
  }
}

module.exports = UsersRouter;