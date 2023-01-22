const { Router} = require('express');

const router = Router();

const pets = [];

router.get('/', (req, res) => {
    const { name, specie} = req.body;

    const pet = {
        name,
        specie
    };

    pets.push(pet);

    res.json({mesagge: 'Mascota generada'});
});


router.post('/', (req, res) => {

    res.json({messege: pets})
});

router.post;

module.exports = router;