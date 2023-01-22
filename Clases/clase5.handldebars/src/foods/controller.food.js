const {Router} = require('express');

const router = Router();

const foods =[
    {
        name: 'pizza',
        price: 5000
    },
    {
        name: 'hamburguesa',
        price: 5000
    },
    {
        name: 'taco',
        price: 5000
    },
    {
        name: 'pasta',
        price: 5000
    },
];

router.get('/', (req,res) => {
    const user ={
        name: 'titin',
        country: 'col',
        role: 'admin'
    }

    const random = Math.round(Math.random() * (foods.length -1))
    const product = foods[random];

    console.log(product);

        res.render('index.handlebars', {
            user, 
            foods,
            isAdmin: user.role === 'admin',
            style: 'index.css'
        })



})

module.exports = router;