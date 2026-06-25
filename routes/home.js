const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("responsed to server")
})

module.exports = router;