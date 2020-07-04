const express = require('express')
const router = express.Router()
const Login = require('./../modals/login/db')

router.get('/', (req, res) => {
    res.render('login/signup')
})

router.post('/', async (req, res) => {
    let login = await new Login({
        username: req.body.username,
        password: req.body.password,
        name:req.body.name
    })
    try {
        login = await login.save()
        res.redirect('/login')
    } catch (e) {
        res.render('login/signup')
    }
})



module.exports = router