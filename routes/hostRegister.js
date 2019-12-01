const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Host = require("../models/host.js");

router.get("/register", function(req, res) {
  res.render("hostRegister");
});

router.post("/register", function(req, res) {
  var name = req.body["username"];
  var email = req.body["email"];
  var contactNumber = req.body["contactNumber"];

  Host.findOne({
    hostEmail: email
  })
    .then(foundHost => {
      if (foundHost) {
        console.log("Host Already Exisit!!");
        throw "Host already exist";
      } else {
        Host.create({
          _id: new mongoose.Types.ObjectId(),
          hostName: name,
          hostEmail: email,
          hostContactNumber: contactNumber
        })
          .then(host => {
            console.log("New Host has been created");
            req.flash("success", "Host Successfully Created");
            res.redirect("/register");
            return;
          })
          .catch(err => {
            console.log("Errorrrrr ", err);
            req.flash("error", err);
            res.redirect("/register");
          });
      }
    })
    .catch(err => {
      console.log("Error Occurred: ", err);
      req.flash("error", err);
      res.redirect("/register");
      return;
    });
});

module.exports = router;
