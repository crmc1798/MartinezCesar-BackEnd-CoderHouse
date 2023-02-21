const {Router} = require('express');
const {userModel} = require('../models/user.model');

const router = Router();


router.get('/', async (req, res) => {
    try {
        let users = await userModel.find();
        req.send({result: 'success', playload:users});
    } catch (error) {
        console.log('Cannot get users with mongoose: ' + error);
    }
    //res.status(200).json({mesagge: 'hola'});
});

module.exports = router;