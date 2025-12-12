const { checkJWT } = require("../service/auth")

//middleware to check if client is logged in, used in protected routes
const userAuthorization=(req,res,next)=>{
    const token=req.cookies.token
    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }
    try {
        const decoded = checkJWT(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
}

module.exports={userAuthorization}