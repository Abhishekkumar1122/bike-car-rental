require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Twilio
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;

// Bookings file
const BOOKINGS_FILE = process.env.BOOKINGS_FILE || 'bookings.json';
const bookingsPath = path.resolve(__dirname, BOOKINGS_FILE);
if (!fs.existsSync(bookingsPath)) fs.writeFileSync(bookingsPath, JSON.stringify([], null, 2));

// Save booking
function saveBooking(booking) {
  const arr = JSON.parse(fs.readFileSync(bookingsPath, 'utf8') || "[]");
  arr.push(booking);
  fs.writeFileSync(bookingsPath, JSON.stringify(arr, null, 2));
}

// Send WhatsApp template
async function sendWhatsAppTemplate(customerMobile, booking) {
  const { id, bookingMeta, totalAmount, pendingAmount, paymentType, bookingTime } = booking;
  const { vehicleName, duration, delivery } = bookingMeta;

  const contentVariables = {
    "1": vehicleName,
    "2": id,
    "3": duration,
    "4": bookingTime,
    "5": paymentType,
    "6": totalAmount,
    "7": pendingAmount,
    "8": delivery === 'selfPickup' ? 'Self Pickup' : 'Deliver (+₹100)'
  };

  const msg = await twilioClient.messages.create({
    from: TWILIO_WHATSAPP_NUMBER,
    to: `whatsapp:+91${customerMobile}`,
    contentSid: process.env.TWILIO_WHATSAPP_TEMPLATE_SID,
    contentVariables: JSON.stringify(contentVariables)
  });

  console.log("WhatsApp sent:", msg.sid);
}

// Verify payment endpoint
app.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer, bookingMeta } = req.body;

    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature)
      return res.status(400).json({ ok: false, error: 'Invalid signature' });

    const bookingID = `BR-${Math.floor(100000 + Math.random() * 900000)}`;
    const bookingTime = new Date().toLocaleString("en-GB", { hour12: true });
    const totalAmount = bookingMeta.totalPricePaid;
    const pendingAmount = bookingMeta.totalPrice - totalAmount;
    const paymentTypeText = bookingMeta.paymentType === "full" ? "Full" : "20% Advance";

    const booking = {
      id: bookingID,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      bookingMeta,
      totalAmount,
      pendingAmount,
      paymentType: paymentTypeText,
      bookingTime,
      verifiedAt: new Date().toISOString()
    };

    saveBooking(booking);

    // Send WhatsApp
    if (customer?.mobile) await sendWhatsAppTemplate(customer.mobile, booking);

    res.json({ ok: true, msg: "Payment verified & WhatsApp sent", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
