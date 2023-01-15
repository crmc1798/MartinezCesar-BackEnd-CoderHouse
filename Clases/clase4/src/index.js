//Lanzar servidor con http nativo con node

// const http = require('http');
// const port = 8080;

// const server = http.createServer((req, res) => {
//     res.end("¡Mi primer hola mundo desde backend!")
// });


// server.listen(port,() => {
//     console.log(`Listening on port ${port}` );
// });


//lanzar servidor con express

const express = require('express');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send('Hola get')
});

app.get('/saludo', (req, res) => {
    res.json({ message: 'Hi coders' })
});

app.use(express.static(__dirname));

app.get('/bienvenida', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const users = [
    {
        id: 1,
        nombre: 'cesar',
        apellido: 'mtz',
        edad: '24',
        correo: 'correo@mail.com'
    },
    {
        id: 2,
        nombre: 'ricardo',
        apellido: 'mtz',
        edad: '24',
        correo: 'correo@mail.com'
    },
    {
        id: 3,
        nombre: 'juan',
        apellido: 'mtz',
        edad: '24',
        correo: 'correo@mail.com'
    },
    {
        id: 4,
        nombre: 'kevin',
        apellido: 'mtz',
        edad: '24',
        correo: 'correo@mail.com'
    },
]

// app.get('/usuario', (req, res) => {
//     res.json(user);
// });

app.get('/usuarios', (req, res) => {
    res.json(users);
});

app.get('/usuarios/:id', (req, res) => {
    const {id} = req.params;
    const condicion = users.find( user => user.id === Number(id))
    if(condicion){
        const user = users.filter(user => user.id === Number(id));
        const nombreUser = user[0].nombre;
        res.json({message: `Hi ${nombreUser}`});
    }
    else{
        res.json({message: 'not found'});
    }

    
});

app.get('/usuario', (req, res) => {
    res.json(users);
});

app.get('/usuario', (req, res) => {
    res.json(users);
});

app.get('/usuario', (req, res) => {
    res.json(users);
});


app.listen(port, () => {
    console.log(`Server runing at port ${port}`);
});