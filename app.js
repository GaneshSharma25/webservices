const express = require("express")
const app = express();

const bodyparser = require("body-parser");
const router = require("./routes/routers");

//add middlewares..
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

//add url handlers.
app.use("/",router);

//start the server..
app.listen(3001,()=>{
    console.log("server running at port 3001");
})