const express = require('express');
const handlebars = require('express-handlebars');
const {Server} = require('socket.io');
const morgan = require('morgan');
const router = require("./router");

const port = 8082;
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');

router(app);

const httpServer = app.listen(port, () => {
    console.log(`Server runing at port ${port}`)
});

const io = new Server(httpServer);

io.on('connection', socket => {
    console.log(`New client with id ${socket.id}`);

    socket.emit('data-update', count);

    socket.on('disconnect', () => {
        console.log('socket disconnected');
      });
});