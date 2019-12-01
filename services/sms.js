const config = require("../config/config");
const accountSid = config.SMS_ACCOUNT_SID;
const authToken = config.SMS_AUTH_TOKEN;
const sms_num = config.SMS_NUMBER;
const client = require("twilio")(accountSid, authToken);

exports.send = function(hnum, gname, gemail, gnum, intime) {
  console.log("Host Number = ", hnum);
  client.messages
    .create({
      body:
        "Hello from Innovaccer Event Management system \n" +
        "You have a new Visitor. \n" +
        "Details of the visitor are:- \n" +
        "NAME :- " +
        gname +
        "\nE-mail Address :- " +
        gemail +
        "\nContact No :- " +
        gnum +
        "\nCheck-In Time :- " +
        intime,
      from: sms_num,
      to: "+91" + hnum
    })
    .then(message => console.log(message.sid))
    .catch(err => {
      console.log(err);
    });
};
