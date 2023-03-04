const router = require("./router");
const handlebarsConfig = require('./config/handlebarsConfig/config.handlebars');
const { server, app}= require("./socketIO/socketServer");
const mongoConfig = require("./config/mongoConfig/config.mongo");
const cookieParser = require('cookie-parser');
const { port } = require('./config');

router(app);
app.use(cookieParser(false));
handlebarsConfig(app);
mongoConfig();

app.get('/',  (req, res) => {
    res.render('index', {mesagge: 'Hi from server without socket.io'});
});

server.listen( port, () => {
    console.log(`Server runing at port ${port}`);
});