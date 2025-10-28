
import React, { useState, useEffect } from "react";
import "./Bikes.css";

const Bikes = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hours, setHours] = useState(1);
  const [days, setDays] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState("selfPickup");
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [paymentType, setPaymentType] = useState("full");
  const [selectedType, setSelectedType] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");

   const vehiclesData = [
    { type: "bike", name: "Bajaj Pulsar 150", brand: "Bajaj", image: "https://5.imimg.com/data5/YA/OI/GLADMIN-4852289/bajaj-pulsar-150.png", prices: { 1: 150, 3: 300, 6: 400, 12: 500, 24: 900 } },
    { type: "bike", name: "Ns Pulsar 200", brand: "Bajaj", image: "https://5.imimg.com/data5/TestImages/UE/WT/KE/SELLER-989864/pulsar-200-ns-abs-500x500.jpg", prices: { 1: 150, 3: 300, 6: 400, 12: 599, 24: 900 } },
    { type: "bike", name: "KTM Duke 250", brand: "KTM", image: "https://5.imimg.com/data5/SELLER/Default/2024/10/456073591/LS/LX/YW/86775922/ktm-duke-250.jpg", prices: { 1: 199, 3: 399, 6: 599, 12: 899, 24: 1399 } },
    { type: "bike", name: "XPULSE 200", brand: "HERO", image: "https://etimg.etb2bimg.com/thumb/msid-116493770,width-1200,height-900,resizemode-4/.jpg", prices: { 1: 199, 3: 399, 6: 499, 12: 799, 24: 1199 } },
    { type: "bike", name: "Classic 350", brand: "Royal Enfield", image: "https://i.ytimg.com/vi/YgtOpykCUtk/hq720.jpg", prices: { 1: 199, 3: 399, 6: 499, 12: 599, 24: 1199 } },
    { type: "bike", name: "Meteor 350", brand: "Royal Enfield", image: "https://www.saranmotors.in/wp-content/uploads/2023/07/stellar-black-1.jpg", prices: { 1: 199, 3: 399, 6: 499, 12: 599, 24: 1199 } },
    { type: "bike", name: "Hunter 350", brand: "Royal Enfield", image: "https://i.pinimg.com/736x/c7/7d/6b/c77d6bdfe2c81053a9d9a5160bf6a32f.jpg", prices: { 1: 199, 3: 399, 6: 499, 12: 599 , 24: 1099 } },
    { type: "bike", name: "Guerrilla-450", brand: "Royal Enfield", image: "https://images.drivespark.com/img/2024/07/royal-enfield-guerrilla-450-front-1721184207.jpg", prices: { 1: 199, 3: 499, 6: 599, 12: 699, 24: 1299 } },
    { type: "bike", name: "Scram 411", brand: "Royal Enfield", image: "https://cdn.bikedekho.com/processedimages/royal-enfield/scram/640X309/scram62381d1eb7d11.jpg", prices: { 1: 199, 3: 499, 6: 599, 12: 699, 24: 1399 } },
    { type: "bike", name: "Himalayan 450", brand: "Royal Enfield", image: "https://c.ndtvimg.com/2023-11/krcee13g_royal-enfield-himalayan-450-650_625x300_24_November_23.jpg", prices: { 1: 199, 3: 499, 6: 699, 12: 799, 24: 1499 } },
    { type: "bike", name: "Yamaha R15 V4", brand: "Yamaha", image: "https://www.yamaha-motor-india.com/theme/v3/image/r15v4/color/red.png", prices: { 1: 299, 3: 499, 6: 599, 12: 899, 24: 1299 } },
    { type: "bike", name: "Yamaha MT15 V4", brand: "Yamaha", image: "https://images.unsplash.com/photo-1695013147209-1516a20f0cdd?fm=jpg&q=60&w=3000", prices: { 1: 249, 3: 399, 6: 599, 12: 899, 24: 1199 } },
    { type: "bike", name: "TVS Apache RTR 200", brand: "TVS", image: "https://img.autocarpro.in/autocarpro/IMG/444/66444/tvs-apache-rtr-200-4v-race-edition-2.jpg", prices: { 1: 120, 3: 300, 6: 450, 12: 700, 24: 1050 } },

    { type: "scooty", name: "Honda Activa", brand: "Honda", image: "https://images.timesdrive.in/photo/msid-151054468,thumbsize-566229/151054468.jpg", prices: { 1: 100, 3: 300, 6: 400, 12: 500, 24: 800 } },
    { type: "scooty", name: "TVS Jupiter", brand: "TVS", image: "https://media.zigcdn.com/media/model/2025/Sep/lest-side-view-125725342_600x400.jpg", prices: { 1: 100, 3: 200, 6: 300, 12: 400, 24: 700 } },
    { type: "scooty", name: "TVS Ntorq 125", brand: "TVS", image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/102709/ntorq-125-left-rear-three-quarter.jpeg?isig=0", prices: { 1: 100, 3: 200, 6: 300, 12: 400, 24: 700 } },
    { type: "scooty", name: "Suzuki Access 125", brand: "Suzuki", image: "https://www.team-bhp.com/sites/default/files/pictures2023-09/IMG_20231029_145415.jpg", prices: { 1: 100, 3: 200, 6: 300, 12: 400, 24: 700 } },
  ];

  const filteredVehicles = vehiclesData.filter(
    (v) => selectedType === "" || v.type === selectedType
  );

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
    const priceTable = selectedVehicle.prices;
    let basePrice = 0;
    if (hours > 0) basePrice = priceTable[hours] || 0;
    else if (days > 0) basePrice = (priceTable[24] || 0) * days;
    const deliveryCost = deliveryOption === "yourLocation" ? 100 : 0;
    setTotalPrice(basePrice + deliveryCost);
  }, [hours, days, deliveryOption, selectedVehicle]);

  const generateBookingID = () => "BR-" + Math.floor(100000 + Math.random() * 900000);

  const handlePayment = () => {
    if (!customerMobile || !/^\d{10}$/.test(customerMobile)) {
      alert("Please enter a valid 10-digit mobile number!");
      return;
    }

    const amount = paymentType === "full" ? totalPrice * 100 : Math.round(totalPrice * 0.2) * 100;

    const options = {
      key: "rzp_test_RRVylx56jc3aTB",
      amount: amount,
      currency: "INR",
      name: "Bike Rental Demo",
      description: `Booking for ${selectedVehicle.name}`,
      prefill: { contact: customerMobile },
      theme: { color: "#3399cc" },
      handler: async function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

        const bookingID = generateBookingID();
        const duration = hours > 0 ? `${hours} Hour${hours>1?'s':''}` : `${days} Day${days>1?'s':''}`;
        const paidAmount = paymentType === "full" ? totalPrice : Math.round(totalPrice*0.2);
        const pendingAmount = paymentType === "full" ? 0 : totalPrice - paidAmount;
        const deliveryText = deliveryOption === "selfPickup" ? "Self Pickup" : "Deliver (+₹100)";
        const bookingTime = new Date().toLocaleString("en-GB", { hour12: true });

        try {
          const res = await fetch('http://localhost:3001/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              mobile: customerMobile,
              vehicle: selectedVehicle.name,
              bookingID,
              duration,
              paymentType: paymentType === "full" ? "Full" : "20% Advance",
              amountPaid: paidAmount,
              pendingAmount,
              delivery: deliveryText,
              bookingTime
            })
          });
          const data = await res.json();
          if(data.ok) alert("WhatsApp confirmation sent!");
          else alert("WhatsApp failed: " + data.error);
        } catch(err) {
          console.error(err);
          alert("Error sending WhatsApp message");
        }

        closePopup();
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const closePopup = () => {
    setShowPopup(false);
    setTotalPrice(0);
    setHours(1);
    setDays(0);
    setDeliveryOption("selfPickup");
    setPaymentType("full");
    setCustomerMobile("");
  };

  return (
    <div className="bikes">
      <div className="vehicle-types">
        <button onClick={() => setSelectedType("bike")}>Bikes</button>
        <button onClick={() => setSelectedType("scooty")}>Scooties</button>
        <button onClick={() => setSelectedType("")}>All</button>
      </div>

      <div className="bike-cards">
        {filteredVehicles.map((vehicle) => (
          <div className="bike-card" key={vehicle.name}>
            <img src={vehicle.image} alt={vehicle.name} />
            <h2>{vehicle.name}</h2>
            <p>Type: {vehicle.type}</p>
            <button onClick={() => handleBookNow(vehicle)}>Book Now</button>
          </div>
        ))}
      </div>

      {showPopup && selectedVehicle && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Book {selectedVehicle.name}</h2>

            <div className="form-group">
              <label>Mobile Number:</label>
              <input
                type="tel"
                placeholder="10-digit number"
                value={customerMobile}
                onChange={(e) => setCustomerMobile(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Time Period:</label>
              <div className="radio-group">
                <label><input type="radio" checked={hours>0} onChange={() => { setHours(1); setDays(0); }} /> Hours</label>
                <label><input type="radio" checked={days>0} onChange={() => { setDays(1); setHours(0); }} /> Days</label>
              </div>
            </div>

            {hours>0 && (
              <div className="form-group">
                <label>Select Hours:</label>
                <select value={hours} onChange={e => setHours(parseInt(e.target.value))}>
                  {Object.keys(selectedVehicle.prices).filter(k => parseInt(k)<=24).map(k => <option key={k} value={k}>{k} Hour{k>1?'s':''}</option>)}
                </select>
              </div>
            )}

            {days>0 && (
              <div className="form-group">
                <label>Select Days:</label>
                <select value={days} onChange={e => setDays(parseInt(e.target.value))}>
                  {[...Array(30)].map((_, i) => <option key={i+1} value={i+1}>{i+1} Day{i+1>1?'s':''}</option>)}
                </select>
              </div>
            )}

            <div className="form-group">
              <label>Delivery Option:</label>
              <div className="radio-group">
                <label><input type="radio" checked={deliveryOption==="selfPickup"} onChange={()=>setDeliveryOption("selfPickup")} /> Self Pickup</label>
                <label><input type="radio" checked={deliveryOption==="yourLocation"} onChange={()=>setDeliveryOption("yourLocation")} /> Deliver (+₹100)</label>
              </div>
            </div>

            <div className="form-group">
              <label>Payment:</label>
              <div className="radio-group">
                <label><input type="radio" checked={paymentType==="full"} onChange={()=>setPaymentType("full")} /> Full (₹{totalPrice})</label>
                <label><input type="radio" checked={paymentType==="partial"} onChange={()=>setPaymentType("partial")} /> 20% (₹{Math.round(totalPrice*0.2)})</label>
              </div>
            </div>

            <h3>💰 Total: ₹{paymentType==="full"?totalPrice:Math.round(totalPrice*0.2)}</h3>

            <div className="popup-buttons">
              <button className="confirm" onClick={handlePayment}>Pay Now</button>
              <button className="cancel" onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bikes;
