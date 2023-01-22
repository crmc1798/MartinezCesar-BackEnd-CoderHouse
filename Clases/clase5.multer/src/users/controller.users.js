const {Router} = require('express');
const uploader = require('../utils');

const router = Router();

const users = [];

router.get('/', (req, res) => {
    res.json ({message: users})
})

router.post('/', uploader.single('file'), (req, res) => {
    if(!req.file){
        return res.status(400).json({error: 'no se pudo cargar'})
    }

    const {name,country}= req.body;

    const user ={
        name,
        country,
        profile: req.file.path
    }

    users.push(user);
    
    res.json({ mesasage: 'usuario creado con exito'})
})

module.exports = router