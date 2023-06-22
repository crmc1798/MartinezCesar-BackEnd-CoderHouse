const router = require("./router/index");
const handlebarsConfig = require('./config/handlebarsConfig/config.handlebars');
const { server, app}= require("./socketIO/socketServer");
const mongoConfig = require("./config/mongoConfig/config.mongo");
const cookieParser = require('cookie-parser');
const { port } = require('./config');
const pasportConfig = require("./config/pasportConfig/config.pasport");
const swaggerConfig = require("./config/swaggerconfig/swaggerconfig");


mongoConfig(app);
pasportConfig(app);
router(app);
app.use(cookieParser(false));
handlebarsConfig(app);
swaggerConfig(app);

// const sessionData = {
//     user: {
//       role: "USER"
//     }
//   };
  
//   const sessionJSON = JSON.stringify(sessionData);
//   const encodedSession = Buffer.from(sessionJSON).toString("base64");
//   //ADMIN   eyJ1c2VyIjp7InJvbGUiOiJBRE1JTiJ9fQ==
//   //USER    eyJ1c2VyIjp7InJvbGUiOiJVU0VSIn19
//   //PREMIUM eyJ1c2VyIjp7InJvbGUiOiJQUkVNSVVNIn19
      
//   console.log(`Bearer ${encodedSession}`);

app.get('/',  (req, res) => {
    res.render('index', {mesagge: 'Hi from server without socket.io'});
});

server.listen( port, () => {
    console.log(`Server runing at port ${port}`);
});