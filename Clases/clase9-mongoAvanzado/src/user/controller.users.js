const {Router} = require('express');
const UserDao = require('../dao/User.dao');

const Users = new UserDao;

const router = Router();

router.get('/', (req, res) => {
    const users = User.find();
    res.json({Users});
});

router.post('/', (req, res) => {
    res.json({message: 'post'});
});

module.exports = router;