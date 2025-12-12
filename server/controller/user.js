const User=require('../models/user')
const bcrypt =require('bcrypt');
const { setJWT } = require('../service/auth');


//handles users registeration
const handleUserRegister=async(req,res,next)=>{
    try{
        const {username,email,password}=req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        //assigns role based on email
        let role;
        if (email.endsWith('@admin.com')) role = 'ADMIN'
        else role = 'USER'
        //create a new user in db
        const user = await User.create({ username, email, password: hashedPassword, role });
        
        // Create Token
        const jwtToken = setJWT(user)
        res.cookie('token', jwtToken, {
            httpOnly: true,      
            secure: true,        
            sameSite: 'None', 
            maxAge: 3600000*24      
        });
        res.status(200).json({
            message:"Registeration Successfull",
            id:user._id, 
            role:user.role, 
            username:user.username})
    }
    catch(err){

        //Check for if user with the same mail already exists
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email){
            return res.status(400).json({ message: "Email already exists" })
        }else{
            return res.status(400).json({ message: "Could not signup, try again" });
        }
    }
}