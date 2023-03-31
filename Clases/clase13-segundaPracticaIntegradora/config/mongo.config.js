const mongoose = require('mongoose');

mongoose
    .connect("mongodb+srv://crmc1798:Campestre09@coderhousecluster.cw71rbs.mongodb.net/SegundaPracticaIntegradora?retryWrites=true&w=majority")
    .then(() => console.log('Succesfull connections to db'))
    .catch((error) => console.log(`Something went wrong ${error}`));