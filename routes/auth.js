const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/db")


router.post("/login", async(req, res)=>{
    const{email, password} = req.body;

    if (!email || !password){
        return res.status(400).json({
            message:"email and password required"
        })
    }

    connection.query(
        "SELECT * FROM users WHERE email = (?)",
        [email],
        (err, results)=>{
            if (err){
                return res.status(500).json({
                    message:"Database Error"
                })
            }
            if (results.length === 0){
                return res.status(401).json({
                    message:"Invalid email and password. Try again !"
                })
            }
            res.json(results)
        }
    )
})

module.exports = router;