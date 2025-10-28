const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Create booking & payment session
router.post("/create", async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Create a Stripe payment session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: bookingData.vehicleName,
            },
            unit_amount: bookingData.totalAmount * 100, // in paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success?bookingID=${bookingData.bookingID}`,
      cancel_url: "http://localhost:3000/cancel",
    });

    const booking = new Booking({ ...bookingData, paymentStatus: "pending" });
    await booking.save();

    res.status(200).json({ success: true, sessionId: session.id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Confirm booking after payment success
router.post("/confirm", async (req, res) => {
  try {
    const { bookingID } = req.body;
    const booking = await Booking.findOne({ bookingID });

    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });

    booking.paymentStatus = "paid";
    await booking.save();

    // Send WhatsApp confirmation
    await twilio.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+91${booking.customerMobile}`,
      body: `✅ Booking Confirmed!\nVehicle: ${booking.vehicleName}\nBooking ID: ${booking.bookingID}\nAmount Paid: ₹${booking.totalAmount}`
    });

    res.status(200).json({ success: true, message: "Booking confirmed & WhatsApp sent!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
