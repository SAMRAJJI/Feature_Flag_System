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
    const {name, email, password, role, organization_id}=req.body;
    if (!name || !email || !password || !role){
        return res.status(400).json({
            message:"data input invalid"
        })
    }
    if (role == "SUPER_ADMIN" && organization_id != null){
        return res.status(400).json({
            message:" super admin should not have a organization id"
        })
    }
    if (role == "ORG_ADMIN" || role == "END_USER"){
        if (organization_id == null){
            return res.status(400).json({
                message:"error"
            })
        }
    }else if (role != "SUPER_ADMIN"){
        return res.status(400).json({
            message:"Organization ID is required for ORG_ADMIN and END_USER."
        })
    }

    connection.query(
        "INSERT INTO users (name, email, password, role, organization_id)VALUES(?,?,?,?,?)",
        [name, email, password, role, organization_id],
        (err, results)=>{
            if (err){
                return res.status(400).json({
                    message:"database error"
                })
            }
            res.status(201).json({
                message:"user created successfully"
            })
        }

    )
})

router.get("/:id", (req, res)=>{
    const {id} = req.params;
    connection.query(
        "select * from users where id = (?);",
        [id],
        (err, results)=>{
            if (err){
                return res.status(400).json({
                    message:"user not found"
                })
            }
            else if (results.length === 0){
                return res.status(404).json({
                    message:"user not found"
                })
            }
            res.json(results)
        }
    )
})

module.exports = router;