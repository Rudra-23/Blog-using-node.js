const express =require('express')
const app =express()
const mongoose =require('mongoose')
const methodOverride =require('method-override')
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
const userRouter =require('./routes/user')

app.set('view engine','ejs')


app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.use('/login',loginRouter)
app.use('/signup',signupRouter)
app.use('/',userRouter)






mongoose.connect('mongodb://localhost/fullblog',{useNewUrlParser:true,useUnifiedTopology:true})
const db= mongoose.connection
db.on('error',error=>console.error(error));
db.once('open',()=>console.log('connected to db'))

app.listen(3000,()=>console.log('server connected to port 3000'))