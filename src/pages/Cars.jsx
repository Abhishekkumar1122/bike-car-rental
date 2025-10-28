import React, { useState, useEffect } from "react";
import "./Cars.css";

const Cars = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hours, setHours] = useState(1);
  const [days, setDays] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState("selfPickup");
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [paymentType, setPaymentType] = useState("full");
  const [customerMobile, setCustomerMobile] = useState("");

  const vehiclesData = [
    { type: "sedan", name: "AURA", brand: "HYUNDAI", image: "https://imgd.aeplcdn.com/642x336/n/cw/ec/139133/aura-exterior-right-front-three-quarter-8.jpeg?isig=0&q=80", prices: { 1: 500, 3: 1200, 6: 2000, 12: 3500, 24: 6000 } },
    { type: "sedan", name: "Swift Dzire", brand: "Maruti Suzuki", image: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/170173/dzire-exterior-right-front-three-quarter-27.jpeg?isig=0&q=80", prices: { 1: 450, 3: 1100, 6: 1900, 12: 3300, 24: 5500 } },
    { type: "hatchback", name: "Baleno", brand: "Maruti Suzuki", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/123460/maruti-baleno.png", prices: { 1: 400, 3: 1000, 6: 1800, 12: 3200, 24: 5000 } },
    { type: "hatchback", name: "Swift", brand: "Maruti Suzuki", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/123461/maruti-swift.png", prices: { 1: 400, 3: 1000, 6: 1800, 12: 3200, 24: 5000 } },
    { type: "sedan", name: "i10", brand: "HYUNDAI", image: "https://www.team-bhp.com/sites/default/files/styles/check_high_res/public/Detailing%20(1).jpg", prices: { 1: 350, 3: 900, 6: 1600, 12: 2800, 24: 4500 } },
    { type: "mpv", name: "Carens", brand: "KIA", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/123463/kia-carens.png", prices: { 1: 800, 3: 2000, 6: 3500, 12: 6500, 24: 12000 } },
    { type: "mpv", name: "Ertiga", brand: "Maruti Suzuki", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/123464/maruti-ertiga.png", prices: { 1: 700, 3: 1800, 6: 3200, 12: 6000, 24: 11000 } },
    { type: "suv", name: "Creta", brand: "HYUNDAI", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/123465/hyundai-creta.png", prices: { 1: 1000, 3: 3000, 6: 5500, 12: 10000, 24: 18000 } },
    { type: "suv", name: "Venue", brand: "HYUNDAI", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/123466/hyundai-venue.png", prices: { 1: 900, 3: 2700, 6: 5000, 12: 9500, 24: 17000 } },
    { type: "suv", name: "Scorpio N", brand: "Mahindra", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/123467/mahindra-scorpio-n.png", prices: { 1: 1200, 3: 3500, 6: 6000, 12: 11000, 24: 20000 } },
    { type: "suv", name: "Thar Roxx", brand: "Mahindra", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/123468/mahindra-thar.png", prices: { 1: 1000, 3: 3000, 6: 5500, 12: 10000, 24: 18000 } },
    { type: "suv", name: "Thar", brand: "Mahindra", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/123469/mahindra-thar.png", prices: { 1: 1000, 3: 3000, 6: 5500, 12: 10000, 24: 18000 } },
    { type: "suv", name: "Scorpio", brand: "Mahindra", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/123470/mahindra-scorpio.png", prices: { 1: 1100, 3: 3200, 6: 5800, 12: 10500, 24: 19000 } },
    { type: "suv", name: "Nexon", brand: "Tata", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/123471/tata-nexon.png", prices: { 1: 900, 3: 2700, 6: 5000, 12: 9500, 24: 17000 } },
    { type: "hatchback", name: "Punch", brand: "Tata", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/123472/tata-punch.png", prices: { 1: 500, 3: 1200, 6: 2000, 12: 3500, 24: 6000 } },
  ];

  const handleBookNow = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowPopup(true);
    setHours(1);
    setDays(0);
    setDeliveryOption("selfPickup");
    setPaymentType("full");
    setCustomerMobile("");
  };

  useEffect(() => {
    if (!selectedVehicle) return;
    let basePrice = 0;
    if (hours > 0) basePrice = selectedVehicle.prices[hours] || 0;
    else if (days > 0) basePrice = (selectedVehicle.prices[24] || 0) * days;
    const deliveryCost = deliveryOption === "yourLocation" ? 500 : 0;
    setTotalPrice(basePrice + deliveryCost);
  }, [hours, days, deliveryOption, selectedVehicle]);

  const generateBookingID = () => "BR-" + Math.floor(100000 + Math.random() * 900000);

  const handleConfirmBooking = () => {
    if (!customerMobile || !/^\d{10}$/.test(customerMobile)) {
      alert("Please enter a valid 10-digit mobile number!");
      return;
    }

    const bookingID = generateBookingID();
    const finalAmount = paymentType === "full" ? totalPrice : Math.round(totalPrice * 0.2);
    const pendingAmount = paymentType === "full" ? 0 : totalPrice - finalAmount;
    const duration = hours > 0 ? `${hours} Hour${hours > 1 ? "s" : ""}` : `${days} Day${days > 1 ? "s" : ""}`;
    const bookingTime = new Date().toLocaleString("en-IN", { hour12: true });

    const message = `✅ *Booking Confirmed!*\n\n🚗 *Vehicle:* ${selectedVehicle.name}\n🆔 *Booking ID:* ${bookingID}\n⏱️ *Duration:* ${duration}\n🕒 *Booking Time:* ${bookingTime}\n💳 *Payment Type:* ${paymentType === "full" ? "Full Payment" : "20% Advance"}\n💰 *Amount Paid:* ₹${finalAmount}\n${pendingAmount > 0 ? `🧾 *Pending Amount:* ₹${pendingAmount}\n` : ""}📦 *Delivery:* ${deliveryOption === "selfPickup" ? "Self Pickup" : "Deliver to your location (+₹500)"}\n\nThank you for booking with us! 🙌`;

    window.open(`https://wa.me/91${customerMobile}?text=${encodeURIComponent(message)}`, "_blank");
    alert(`Booking confirmed! Your Booking ID: ${bookingID}`);
    closePopup();
  };

  const closePopup = () => {
    setShowPopup(false);
    setHours(1);
    setDays(0);
    setDeliveryOption("selfPickup");
    setPaymentType("full");
    setCustomerMobile("");
  };

  return (
    <div className="cars">
      <h1>Our Cars</h1>
      <div className="car-cards">
        {vehiclesData.map(vehicle => (
          <div className="car-card" key={vehicle.name}>
            <img src={vehicle.image} alt={vehicle.name} />
            <h2>{vehicle.name}</h2>
            <p>Type: {vehicle.type.toUpperCase()}</p>
            <button onClick={() => handleBookNow(vehicle)}>Book Now</button>
          </div>
        ))}
      </div>

      {showPopup && selectedVehicle && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Book {selectedVehicle.name}</h2>

            <div className="form-group">
              <label>Choose Time Period:</label>
              <div className="radio-group">
                <label><input type="radio" checked={hours>0} onChange={()=>{setHours(1);setDays(0)}}/> Hours</label>
                <label><input type="radio" checked={days>0} onChange={()=>{setDays(1);setHours(0)}}/> Days</label>
              </div>
            </div>

            {hours>0 && (
              <div className="form-group">
                <label>Select Hours:</label>
                <select value={hours} onChange={(e)=>setHours(parseInt(e.target.value))}>
                  {Object.keys(selectedVehicle.prices).filter(k=>parseInt(k)<=24).map(k=>(
                    <option key={k} value={k}>{k} Hour{k>1?"s":""}</option>
                  ))}
                </select>
              </div>
            )}

            {days>0 && (
              <div className="form-group">
                <label>Select Days:</label>
                <select value={days} onChange={(e)=>setDays(parseInt(e.target.value))}>
                  {[...Array(30)].map((_,i)=><option key={i+1} value={i+1}>{i+1} Day{i+1>1?"s":""}</option>)}
                </select>
              </div>
            )}

            <div className="form-group">
              <label>Delivery Option:</label>
              <div className="radio-group">
                <label><input type="radio" checked={deliveryOption==="selfPickup"} onChange={()=>setDeliveryOption("selfPickup")}/> Self Pickup</label>
                <label><input type="radio" checked={deliveryOption==="yourLocation"} onChange={()=>setDeliveryOption("yourLocation")}/> Deliver to Your Location (+₹500)</label>
              </div>
            </div>

            <div className="form-group">
              <label>Mobile Number:</label>
              <input type="tel" value={customerMobile} onChange={(e)=>setCustomerMobile(e.target.value)} placeholder="Enter 10-digit mobile number"/>
            </div>

            <div className="form-group">
              <label>Payment Type:</label>
              <div className="radio-group">
                <label><input type="radio" checked={paymentType==="full"} onChange={()=>setPaymentType("full")}/> Full Payment (₹{totalPrice})</label>
                <label><input type="radio" checked={paymentType==="partial"} onChange={()=>setPaymentType("partial")}/> 20% Advance (₹{Math.round(totalPrice*0.2)})</label>
              </div>
            </div>

            <h3>💰 Total Payable: ₹{paymentType==="full"?totalPrice:Math.round(totalPrice*0.2)}</h3>

            <div className="popup-buttons">
              <button className="confirm" onClick={handleConfirmBooking}>Confirm & Pay</button>
              <button className="cancel" onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
