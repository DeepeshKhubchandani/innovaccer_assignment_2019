const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

var flash = require("connect-flash-plus");
var session = require("express-session");

const homeRoute = require("./routes/home");
const registerRoute = require("./routes/hostRegister");
const checkInRoute = require("./routes/visitorCheckIn");
const checkOutRoute = require("./routes/visitorCheckOut");

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);

app.use(flash());

app.use(function(req, res, next) {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(express.static(path.join(__dirname, "./public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(homeRoute);
app.use(registerRoute);
app.use(checkInRoute);
app.use(checkOutRoute);

//db connection
var db = require("./config/db");

let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Updated : Server listening at port " + port);
});
