const { Router } = require('express')
const { UserManager } = require('../../dao/mongoClassManagers/userClass/userMongoManager');
const userMongo = new UserManager();


const router = Router()


router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, age, email, password } = req.body

    const newUserInfo = {
      first_name,
      last_name,
      age,
      email,
      password
    }

    const newUser = await userMongo.createUser(newUserInfo);
    console.log(newUser)
    res.status(201).json({ message: newUser })
  } catch (error) {
    console.log(error)
    if (error.code === 11000) return res.status(400).json({ error: 'El usuario ya existe' })
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router