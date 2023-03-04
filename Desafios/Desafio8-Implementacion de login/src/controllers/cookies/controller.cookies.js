const { Router } = require('express');

const router = Router();

router.get('/view', (req, res) => {
  res.cookie('cookie', 'Esta es una cookie muy poderosa').json({ message: 'Cookie creada' })
})

router.get('/getCookies', (req, res) => {
    const cookies = req.cookies
    console.log(req.headers.cookie);
    res.json(cookies)
  })

module.exports = router