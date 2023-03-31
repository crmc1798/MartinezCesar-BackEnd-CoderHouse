const { Router } = require("express");
const { UserManager } = require("../../dao/mongoClassManagers/userClass/userMongoManager");
const passport = require('passport');
const { isValidPasswordMethod } = require("../../utils/cryptPassword");
const router = Router();
const userManager = new UserManager();


router.post("/", passport.authenticate('login', { failureRedirect: '/auth/failLogin' }), async (req, res) => {
    try {
        if (!req.user)
            return res.status(400).json({ error: 'Credenciales invalidas' });

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            role: "usuario",
        };

        res.send({ message: req.user });

    } catch (error) {
        console.log(error)
    }

})

router.get('/failLogin', (req, res) => {
    res.json({ error: 'Falló el login' });
  });

  router.get(
    '/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    async (req, res) => {}
  );
  
  router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    async (req, res) => {
      req.session.user = req.user;
      res.redirect('/api/products');
    }
  );
  
  router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile'] }),
    async (req, res) => {}
  );
  
  router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
      req.session.user = req.user;
      res.redirect('/api/products');
    }
  );

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ msg: err })
        }
        res.redirect("/login");
    })
})

module.exports = router;