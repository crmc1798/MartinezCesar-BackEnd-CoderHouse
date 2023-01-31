const express = require('express');
const handlebars = require('express-handlebars');
const {Server} = require('socket.io');
const router = require('./router');

const messages = [];

const port = 3000;
const app = express();

app.use(express.json());
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

    socket.on('newUser', user => {
        socket.broatcast.emit('newUserConected', user);
        socket.emit('mesaggeFromServer', messages);
    })

    socket.emit('messageFromServer', messages);

    socket.on('chatFromClient', data => {
        console.log(data);
    })

    socket.on('chatFromClient', data => {
        //socket.broadcast.emit('messageForChat', data);//mensaje para todos menos para el que lo manda
        //socket.emit('messageForChat', data);//mensaje solo para el que lo manda
        messages.push(data);
        io.emit('messageForChat', data);//mensaje para todos
    })

});
