const { Router} = require('express');

const router = Router();

const users = [];

router.get('/', (req, res) => {
    res.json({messege: users});
});

router.post('/', (req, res) => {
    const {name, lastname, country} = req.body;

    const user ={
        name, 
        lastname,
        country
    };
    console.log(user);

    users.push(user);

    res.json({mesagge: user});
});



module.exports = router;