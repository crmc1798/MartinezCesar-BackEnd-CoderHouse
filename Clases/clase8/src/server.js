const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');

const port = 8080;

const app = express();

app.use(express.json());
app.use(morgan('dev'));

router(app);

const server = app.listen(port, () => {
    console.log(`Server runing at port ${port}`);
});


mongoose.connect('mongodb+srv://crmc1798:Campestre09@cluster0.3jnov3d.mongodb.net/?retryWrites=true&w=majority', (error) => {
    if(error){
        console.log('Cannot connect to database: ' + error);
        process.exit();
    }
});