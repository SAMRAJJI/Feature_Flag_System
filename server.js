const express = require("express");
const homerouter = require("./routes/home")
const organizatioRouter = require("./routes/organization")
const userRouter = require("./routes/user")
const app = express()
const authrotes = require("./routes/auth")

app.use(express.json())
app.use("/users", userRouter);
app.use("/", homerouter);
app.use("/organization", organizatioRouter);
app.use("/auth", authrotes);

app.listen(3000, ()=>{
    console.log("server is running")
});