require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripeRoutes = require('./stripe');
const emailRoutes = require('./email');
const smsRoutes = require('./sms');
const { supabaseAdmin } = require('./supabase');

const app = express();
const PORT = 4000;

// Webhook stripe needs raw body
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/api/health', (req, res) => res.json({ status: 'ok', services: { stripe: !!process.env.STRIPE_SECRET_KEY, resend: !!process.env.RESEND_API_KEY, twilio: !!process.env.TWILIO_ACCOUNT_SID, supabase: !!process.env.SUPABASE_SERVICE_KEY } }));

// Routes
app.use('/api/stripe', stripeRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/sms', smsRoutes);

// Generic API endpoints (Empty by default, ready for DB integration)
app.get('/api/patients', async (req, res) => {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin.from('patients').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data || []);
  }
  res.json([]);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});