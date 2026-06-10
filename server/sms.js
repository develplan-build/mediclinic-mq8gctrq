const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const client = (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) 
  : null;

router.post('/send', async (req, res) => {
  if (!client) return res.status(503).json({ error: 'Twilio non configurato: aggiungi TWILIO_ACCOUNT_SID e TWILIO_AUTH_TOKEN' });
  
  try {
    const { to, body } = req.body;
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });
    res.json({ success: true, messageId: message.sid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;