const express = require("express")

const router =express.Router();

const connection = require("../config/db")

router.get("/", (req, res) => {
    connection.query(
        "SELECT * FROM users",
        (err, results)=>{
            if (err){
                return res.status(400).json({
                    message:"databse eror"
                })

            }
            res.json(results)
        }
    )
});

router.post("/", (req, res)=>{
    
    connection.query(
        INSERT INTO users VALUES(?)

    )
})

module.exports = router;