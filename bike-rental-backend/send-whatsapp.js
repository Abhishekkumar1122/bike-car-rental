require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendWhatsApp = async (to, message) => {
  try {
    const msg = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${to}`,
      body: message,
    });
    console.log('WhatsApp message sent! SID:', msg.sid);
  } catch (err) {
    console.error('Error sending WhatsApp:', err);
    throw err;
  }
};

module.exports = { sendWhatsApp };
