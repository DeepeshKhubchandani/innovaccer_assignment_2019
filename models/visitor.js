var mongoose = require("mongoose");

let visitorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  visitorName: { type: String, required: true, default: null },
  visitorEmail: {
    type: String,
    required: true,
    default: null,
    match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  },
  visitorContactNo: {
    type: String,
    required: true,
    match: /\d{10}/,
    default: null
  },
  checkInTime: { type: String, required: true, default: null },
  checkInDate: { type: String, required: true, default: null },
  timeStamp: { type: Number, default: null },
  checkOutTime: { type: String, default: null },
  hostEmail: { type: String, default: null },
  status: { type: String, default: "CheckedIN" }
});

var Visitor = mongoose.model("Visitor", visitorSchema);
module.exports = Visitor;
