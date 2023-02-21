const express = require('express');
const router = require('./router');
const mongoose = require('mongoose');
const app = express();

const port = 3000;


mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://crmc1798:Campestre09@cluster0.9o7zjmf.mongodb.net/?retryWrites=true&w=majority', error => {
    if (error) {
        console.log(`Cannot connect to db. error ${error}`);
    }
    console.log('db conected');
});

router(app);
app.listen(port, () => {
    console.log(`server runing at port ${port}`);
})