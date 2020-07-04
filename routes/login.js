const express =require('express')
const router = express.Router()
const Login = require('./../modals/login/db')


router.get('/',(req,res)=>{
    res.render('login/login')
})


router.post('/', async (req, res) => {
    const login = await Login.find({username:req.body.username,password:req.body.password})
    if(login.length >0)
    {
        res.redirect(`/${login[0].id}`)
    }
    else
    {
        res.render('login/login')
    }
})

module.exports =router