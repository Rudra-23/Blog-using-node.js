const express = require('express')
const router = express.Router()
const Login = require('./../modals/login/db')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    const pass = false
    res.render('login/login', { pass: pass })
})


router.post('/', async (req, res) => {
    const login = await Login.find({ username: req.body.username })
    let pass = false
    if (login.length <= 0) {
        pass = true
        res.render('login/login', { pass: pass })
    }
    try {
        if (await bcrypt.compare(req.body.password, login[0].password)) {
            res.redirect(`/${login[0].id}`)
        }
        else {
            pass = true
            res.render('login/login', { pass: pass })
        }
    }
    catch (e) {
        pass = true
        res.render('login/login', { pass: pass })
    }
})

module.exports = router


