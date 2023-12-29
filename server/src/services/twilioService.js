// src/services/twilioService.js
require("dotenv").config();
const { Twilio } = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const accountSid = "AC448b63f1aa68c1c73a1f42e72ae8edb3";
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const authToken = "a4b2927e672a5d2eb294752a75b5fa9f";
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
