const { Router } = require("express");

const router = Router();

const publicAcces = (req, res, next) => {
    if(req.session.user){
        return res.redirect("/api/products")
    }
    next();
}

router.get("/signup", publicAcces,(req, res) => {
    res.render("signup")
});

router.get("/login", publicAcces,(req, res) => {
    res.render("login")
});

module.exports = router;