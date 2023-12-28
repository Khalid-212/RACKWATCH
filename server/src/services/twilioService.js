// src/services/twilioService.js
const { Twilio } = require("twilio");

const accountSid = "AC448b63f1aa68c1c73a1f42e72ae8edb3";
const authToken = "5a7343fe11fad462f8cd71e1070e3311";
const twilioClient = new Twilio(accountSid, authToken);
const twilioPhoneNumber = "+17277776495";
const recipientPhoneNumber = "+251985216795";

function sendErrorMessage(message) {
  twilioClient.messages.create({
    body: message,
    from: twilioPhoneNumber,
    to: recipientPhoneNumber,
  });
}

module.exports = { sendErrorMessage };
