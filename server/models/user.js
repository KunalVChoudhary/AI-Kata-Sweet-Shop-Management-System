const {Schema,model} = require('mongoose')

//mongoDB schema for user defining document struncture
const userSchema= new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default: 'USER'
    }
},{
    timestamps:true
})

const User=model('User',userSchema)

module.exports=User