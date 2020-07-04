const express = require('express')
const router = express.Router()
const Content = require('./../modals/content/db')
const Login =require('./../modals/login/db')

router.get('/',(req, res) => {
    res.render('index')
})

router.get('/:id', async (req, res) => {
    const login = req.params.id;
    const content =await Content.find({id:login})
    res.render('user/index', { login: login,content:content })
})

router.get('/:id/show', async (req,res)=>{
    const content = await Content.find({}).sort({
        date:'desc'
    })
    res.render('user/show',{content:content,login:req.params.id})
})

router.get('/:id/edit',async(req,res)=>{
    const login = req.params.id;
    const content = await Content.find({id:login})
    res.render('user/edit',{login:login,content:content[0]})
})

router.put('/:id',async(req,res)=>{
    const login = req.params.id;
    let content = await Content.find({id:login})
    content[0].title =req.body.title,
    content[0].description =req.body.description,
    content[0].markdown =req.body.markdown
    try{
        content[0] = await content[0].save()
        res.redirect(`/${login}`)
    }
    catch(e)
    {
        res.render('user/edit',{login:login,content:content[0]})
    }
})

router.delete('/:id',async(req,res)=>{
    const login = req.params.id;
    const delid= await Content.find({id:login})
    await Content.findByIdAndDelete(delid[0])
    res.redirect(`/${login}`)
})

router.post('/:id', async (req, res) => {
    const login =req.params.id
    const defname =await Login.findById(login)
    
    let content = await new Content({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
        id: req.params.id,
        name:defname.name
    })
    try {
        content = await content.save()
        res.redirect(`/${login}`)
    } catch (e) {
        res.render('user/new',{login:login,content:content})
    }
})

router.get('/:id/new', async(req, res) => {
    const login = req.params.id;
    res.render('user/new', { login: login ,content:await new Content()})
})

module.exports = router