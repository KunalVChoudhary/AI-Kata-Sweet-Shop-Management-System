require("dotenv").config();
const app = require("./src/app");

//staring server
app.listen(process.env.PORT,()=>{console.log('Server Started');})
