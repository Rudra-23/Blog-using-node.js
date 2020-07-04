const express =require('express')
const router = express.Router()
const Login = require('./../modals/login/db')


router.get('/',(req,res)=>{
    const pass =false
    res.render('login/login',{pass:pass})
})


router.post('/', async (req, res) => {
    const login = await Login.find({username:req.body.username,password:req.body.password})
    let pass =false
    if(login.length >0)
    {
        res.redirect(`/${login[0].id}`)
    }
    else
    {
        pass =true
        res.render('login/login',{pass:pass})
    }
})

module.exports =router