const express = require("express");
const morgan = require('morgan');
const router = require("./router");

const port = 8080;
const app = express();

app.use(express.json());
app.use(morgan('dev'))

router(app);

app.listen(port,()=>{
    console.log(`Server runing at port ${port}`)
});