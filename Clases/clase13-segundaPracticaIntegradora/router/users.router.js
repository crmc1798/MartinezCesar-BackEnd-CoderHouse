const UserDao = require('../dao/user');
const user = new UserDao
const Route = require('./router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserRouter extends Route{
    init(){
        this.post('/user/register', async (req, res) => {
            try {
                let newUser = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    age: req.body.age,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role
                }

                const data = await user.insertOne(newUser);
                console.log(data)
                res.sendSuccess('User created');
            } 
            catch (error) {
                res.sendServerError('Something went wrong');
            }
        });

        this.post('/user/login', async (req, res) => {
            try {
                const {email, password} = req.body;
                const data = await user.findOne(email);

                const match = await bcrypt.compare(password, data.password);
                if(!match) return res.sendUserError('Incorrect credentials');

                let token = jwt.sign({ email, role: data.role}, 'secreto')

                res.sendSuccess({token});
            } 
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        })

        this.get('/user/public', ["PUBLIC"],(req, res) => {
            res.sendSuccess('Hola desde endpoint publico');
        });

        this.get('/user/privateUser', ["USER"],(req, res) => {
            res.sendSuccess('Hola desde endpoint para usuarios');
        });

        this.get('/user/privateAdmin', ["ADMIN"],(req, res) => {
            res.sendSuccess('Hola desde endpoint para administradores');
        });
    }
}

module.exports = UserRouter;