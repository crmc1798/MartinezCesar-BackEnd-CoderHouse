

//const newCart = await cartManager.addCart();

const { cryptPassword } = require("../utils/cryptPassword");

class UserDTO{
    constructor(user){
        this.githubId = user.githubId;
        this.googleId = user.googleId;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.password = cryptPassword(user.password);
        this.cart = user.cart;
        this.role = 'USER';
    }
}

module.exports = UserDTO;