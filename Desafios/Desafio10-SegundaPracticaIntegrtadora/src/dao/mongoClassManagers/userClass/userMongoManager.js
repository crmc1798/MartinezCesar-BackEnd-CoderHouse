const userModel = require("../../models/user.model");

class UserManager{
    createUser = async (newUser) => {
        try {
            const user = await userModel.create(newUser);

            return user;

            //return newUser;
        } catch (error) {
            throw new Error(error)
        }
    }

    
    findUser = async(user) => {
        try {
            const response = await userModel.findOne({email: user})
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    findByID = async(id) => {
        try {
            const response = await userModel.findById(id)
            return response;
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = {UserManager};