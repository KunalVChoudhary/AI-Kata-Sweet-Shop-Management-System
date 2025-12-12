const {Router}=require('express');
const {handleUserRegister, handleUserLogin, handleUserLogout}=require('../controllers/user');
const { userAuthorization } = require('../middleware/userAuthorization');

const route=Router()

//route for registering new user
route.post('/api/auth/register',handleUserRegister)

//route for user login
route.post('/api/auth/login',handleUserLogin)

//route for logging user out
route.get('/api/auth/logout',userAuthorization,handleUserLogout)


module.exports=route
