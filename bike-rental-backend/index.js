const express = require('express');
const cors = require('cors');
const { sendWhatsApp } = require('./send-whatsapp');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-whatsapp', async (req, res) => {
  const { mobile, message } = req.body;
  try {
    await sendWhatsApp(mobile, message);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
