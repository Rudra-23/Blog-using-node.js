const mongoose = require('mongoose')


const contentSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    markdown:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})

module.exports =mongoose.model('content',contentSchema)