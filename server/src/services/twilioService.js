// src/services/twilioService.js
require("dotenv").config();
const { Twilio } = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new Twilio(accountSid, authToken);
const twilioPhoneNumber = "+16507279180";
const recipientPhoneNumber = "+251985216795";

function sendErrorMessage(message) {
  twilioClient.messages.create({
    body: message,
    from: twilioPhoneNumber,
    to: recipientPhoneNumber,
  })
      .then(message => console.log(message.body))
          .done();
}

module.exports = { sendErrorMessage };
