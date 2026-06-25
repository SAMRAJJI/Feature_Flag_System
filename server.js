const express = require("express");
const homerouter = require("./routes/home")
const organizatioRouter = require("./routes/organization")
const app = express()


app.use(express.json())

app.use("/", homerouter);
app.use("/organization", organizatioRouter);
app.listen(3000, ()=>{
    console.log("server is running")
});