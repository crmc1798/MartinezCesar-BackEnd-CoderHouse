const User = require("./models/User.model");

class UserDao {
    async miBuscador (){
        const users = await User.find();
        return users
    }
}

module.exports = UserDao;