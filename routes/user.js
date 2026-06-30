const express = require("express");

const router = express.Router();

const connection = require("../config/db");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(400).json({
        message: "databse eror",
      });
    }
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { name, email, password, role, organization_id } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      message: "data input invalid",
    });
  }
  if (role == "SUPER_ADMIN" && organization_id != null) {
    return res.status(400).json({
      message: " super admin should not have a organization id",
    });
  }
  if (role == "ORG_ADMIN" || role == "END_USER") {
    if (organization_id == null) {
      return res.status(400).json({
        message: "error",
      });
    }
  } else if (role == "SUPER_ADMIN") {
    return res.status(400).json({
      message: "Invalid role.",
    });
  }

  connection.query(
    "INSERT INTO users (name, email, password, role, organization_id)VALUES(?,?,?,?,?)",
    [name, email, password, role, organization_id],
    (err, results) => {
      if (err) {
        return res.status(400).json({
          message: "database error",
        });
      }
      res.status(201).json({
        message: "user created successfully",
      });
    },
  );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "select * from users where id = (?);",
    [id],
    (err, results) => {
      if (err) {
        return res.status(400).json({
          message: "user not found",
        });
      } else if (results.length === 0) {
        return res.status(404).json({
          message: "user not found",
        });
      }
      res.json(results);
    },
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, organization_id } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      message: "data input invalid",
    });
  }
  if (role === "SUPER_ADMIN" && organization_id != null) {
    return res.status(400).json({
      message: " super admin should not have a organization id",
    });
  }
  if (role === "ORG_ADMIN" || role === "END_USER") {
    if (organization_id == null) {
      return res.status(400).json({
        message: "organization id is must",
      });
    }
  }
  if (role !== "SUPER_ADMIN" && role !== "ORG_ADMIN" && role !== "END_USER") {
    return res.status(400).json({
      message: "Invalid role",
    });
  }
  connection.query(
    "UPDATE users SET name = ?, email = ?, password =?, role = ?, organization_id =? where id =?",
    [name, email, password, role, organization_id, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "database error",
        });
      } else if (results.affectedRows === 0) {
        return res.status(404).json({
          message: "user not found",
        });
      }
      res.status(200).json({
        message: "updated successfully",
      });
    },
  );
});

router.delete("/:id", (req, res)=>{

  const {id} = req.params;
  connection.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (err, results)=>{
      if (err){
        return res.status(500).json({
          message:"database not found"
        })
      }else if (results.affectedRows ===0){
        return res.status(404).json({
          message:"user not found"
        })
      }
      return res.status(200).json({
        message:"row deleted successfully"
      })
    }
  )

})

module.exports = router;
