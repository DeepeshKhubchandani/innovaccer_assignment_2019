var mongoose = require("mongoose");
var Visitor = require("./visitor.js");
var hostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hostName: { type: String, required: true },
  hostEmail: {
    type: String,
    required: true,
    match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  },
  hostContactNumber: {
    type: String,
    required: true,
    match: /\d{10}/
  },
  visitors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor"
    }
  ]
});

var Host = mongoose.model("Host", hostSchema);

module.exports = Host;
