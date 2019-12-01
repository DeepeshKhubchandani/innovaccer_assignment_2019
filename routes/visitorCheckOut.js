const express = require("express");
const router = express.Router();

const DateTime = require("../utils/DateTime");
const Email = require("../services/email.js");

const Visitor = require("../models/visitor.js");
const Host = require("../models/host.js");

router.get("/checkout", (req, res) => {
  res.render("visitorCheckOut");
});

router.post("/checkout", (req, res) => {
  var email = req.body["visitor-email"];

  Visitor.findOne({ visitorEmail: email })
    .then(foundVisitor => {
      if (foundVisitor && foundVisitor.status == "CheckedIN") {
        var checkOutTime = DateTime.getTime();
        foundVisitor.status = "CheckedOUT";
        foundVisitor.checkOutTime = checkOutTime;
        foundVisitor
          .save()
          .then(data => {
            let visitorName = foundVisitor.visitorName;
            let visitorEmail = foundVisitor.visitorEmail;
            let visitorPhone = foundVisitor.visitorContactNo;
            let checkInTime = foundVisitor.checkInTime;
            let hostEmail = foundVisitor.hostEmail;
            let hostName;
            Visitor.deleteOne({
              visitorEmail: visitorEmail
            })
              .then(data => {
                Host.findOne({
                  hostEmail: hostEmail
                })
                  .then(foundHost => {
                    hostName = foundHost.hostName;
                    Email(
                      hostName,
                      null,
                      visitorName,
                      visitorPhone,
                      visitorEmail,
                      checkOutTime,
                      checkInTime,
                      false
                    );
                    console.log("Successfully Checked Out");
                    req.flash("success", "Successfully Checked Out");
                    res.redirect("/checkout");
                    return foundHost;
                  })
                  .catch(err => {
                    console.log("Err : ", err);
                    req.flash("error", err);
                    res.redirect("/checkout");
                  });
              })
              .catch(err => {
                console.log("Error :", err);
                req.flash("error", err);
                res.redirect("/checkout");
              });
          })
          .catch(err => {
            console.log("Error :", err);
            req.flash("error", err);
            res.redirect("/checkout");
          });
      } else {
        console.log("You have already checked out!!");
        throw "You have already checked out";
      }
    })
    .catch(err => {
      console.log("Error Occurred : ", err);
      req.flash("error", err);
      res.redirect("/checkout");
    });
});

module.exports = router;
