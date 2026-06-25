const express = require("express");
const connection = require("../config/db")

const router = express.Router();



// const organizations = [
//   {
//     id: 1,
//     name: "zoho company",
//   },
//   {
//     id: 2,
//     name: "TCS company",
//   },
// ];

router.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM organizations",
    (err, results)=>{
      if (err){
        return res.status(400).json({
          message:"database error"
        })
      }
      res.json(results)
    }
  )
});

router.get("/:id", (req, res) => {
  // const id = parseInt(req.params.id);
  // const organization = organizations.find((org) => org.id === id);

  // if (!organization) {
  //   return res.status(500).json({
  //     message: "organization was not found",
  //   });
  // }
  // res.json(organization);
  

}

);

router.post("/", (req, res) => {
  // const organization = {
  //   id: organizations.length + 1,
  //   name: req.body.name,
  // };

  // organizations.push(organization);

  // res.json({
  //   message: "Organization created",
  //   data: organization,
  // });

  const {name} = req.body;

  connection.query("INSERT INTO organizations (name) VALUES (?)",
    [name],
    (err, result)=>{
      if (err){
        return res.status(400).json({
          message:"database error"
        })
      }
      res.json({
        message:"created successfully"
      })
    }
  )
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const organization = organizations.find((org) => org.id === id);

  if (!organization) {
    return res.status(404).json({
      message: "Organization not found",
    });
  }
  organization.name = req.body.name;
  res.json({
    message: "name was updated",
    data: organization,
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = organizations.findIndex((org) => org.id === id);

  if (index === -1) {
    return res.status(400).json({
      message: "organization not found",
    });
  }
  organizations.splice(index, 1);
  res.json({
    message: "organization was deleted",
  });
});

module.exports = router;
