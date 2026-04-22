# 🚗🏍️ Abhishek Rental — Bike & Car Rental Platform

Find your perfect ride in minutes.  
**Abhishek Rental** is a full-stack rental platform where users can explore bikes and cars, book quickly, and get instant booking updates.

## ✨ Highlights

- Clean and responsive UI for bikes and cars
- Separate pages for Home, Bikes, Cars, About, and Contact
- Integrated payment verification flow
- WhatsApp booking confirmation support
- Deployment-ready React frontend

## 🧰 Tech Stack

### Frontend
- React
- React Router
- React Icons
- CSS

### Backend
- Node.js
- Express
- Razorpay
- Twilio WhatsApp API

## 📁 Project Structure

- `/src` → React frontend
- `/bike-rental-backend` → Express backend services

## 🚀 Run Locally

### 1) Frontend

```bash
cd bike-car-rental
npm install
npm start
```

### 2) Backend

```bash
cd bike-car-rental/bike-rental-backend
npm install
npm start
```

## 🔐 Backend Environment Variables

Set these in `bike-rental-backend/.env`:

- `PORT`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_NUMBER`
- `TWILIO_WHATSAPP_TEMPLATE_SID`
- `BOOKINGS_FILE` (optional)

## 🌍 Live Project

Frontend is configured for GitHub Pages:  
`https://abhishekkumar1122.github.io/bike-car-rental`

## 🙌 Author

Built with passion by **Abhishek Kumar**.
