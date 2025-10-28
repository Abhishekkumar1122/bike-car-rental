const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  vehicleName: String,
  vehicleType: String,
  hours: Number,
  days: Number,
  deliveryOption: String,
  paymentType: String,
  totalAmount: Number,
  customerMobile: String,
  bookingID: String,
  paymentStatus: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
