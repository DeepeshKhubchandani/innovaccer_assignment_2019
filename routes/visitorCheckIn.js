const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const DateTime = require("../utils/DateTime");
const timeStamp = require("../utils/timestamp");

const Visitor = require("../models/visitor.js");
const Host = require("../models/host.js");

const Sms = require("../services/sms.js");
const Email = require("../services/email.js");

router.get("/checkin", function(req, res) {
  res.render("visitorCheckIn");
});

router.post("/checkin", function(req, res) {
  const visitTimeStamp = timeStamp.getTimeStamp();

  var name = req.body["visitor-name"];
  var email = req.body["visitor-email"];
  var contactNumber = req.body["visitor-contactNumber"];
  let hostEmail = req.body["host-email"];

  const checkInTime = DateTime.getTime();
  const checkInDate = DateTime.getDate();
  Host.findOne({
    hostEmail: hostEmail
  })
    .then(host => {
      if (host) {
        Visitor.findOne({
          visitorEmail: email,
          visitorContactNo: contactNumber
        })
          .then(visitor => {
            if (visitor && visitor.status == "CheckedIN") {
              console.log("You are already checked in");
              throw "You are already checked in";
            } else {
              Visitor.create({
                _id: new mongoose.Types.ObjectId(),
                visitorName: name,
                visitorEmail: email,
                visitorContactNo: contactNumber,
                checkInTime: checkInTime,
                checkInDate: checkInDate,
                timeStamp: visitTimeStamp,
                hostEmail: hostEmail,
                status: "CheckedIN"
              }).then(newVisitor => {
                Host.findOne({
                  hostEmail: hostEmail
                }).then(foundHost => {
                  foundHost.visitors.push(newVisitor);
                  foundHost
                    .save()
                    .then(data => {
                      console.log("visitor added successfully in the database");
                      req.flash("success", "New Visitor Created.");
                      res.redirect("/checkin");
                      Sms.send(
                        foundHost.hostContactNumber,
                        name,
                        email,
                        contactNumber,
                        checkInTime
                      );
                      Email(
                        foundHost.hostName,
                        foundHost.hostEmail,
                        name,
                        contactNumber,
                        email,
                        null,
                        null,
                        true
                      );
                    })
                    .catch(err => {
                      console.log(err);
                      req.flash("error", err);
                      res.redirect("/checkin");
                    });
                });
              });
            }
          })
          .catch(err => {
            console.log("Error: ", err);
            req.flash("error", err);
            res.redirect("/checkin");
          });
      } else {
        console.log("Host Not found");
        throw "Host Not Found";
      }
    })
    .catch(err => {
      console.log("Error Occurred: ", err);
      req.flash("error", err);
      res.redirect("/checkin");
    });
});
module.exports = router;
