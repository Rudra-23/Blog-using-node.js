const express = require('express')
const router = express.Router()
const Login = require('./../modals/login/db')
const bcrypt =require('bcrypt')

router.get('/', (req, res) => {
    const pass=false
    res.render('login/signup',{pass:pass})
})

router.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    let login = await new Login({
        username: req.body.username,
        password: hashedPassword,
        name:req.body.name
    })
    try {
        let pass =false
        login = await login.save()
        res.redirect('/login')
    } catch (e) {
        pass=true
        res.render('login/signup',{pass:pass})
    }
})



module.exports = router