require('dotenv').config();
const express = require('express');
const path = require('path');
const twilio = require('twilio');

const { AccessToken } = twilio.jwt;
const { SyncGrant } = AccessToken;

const app = express();
app.use(express.static('dist'));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.json());

// Create Twilio Sync Token
app.get('/api/token', async (req, res) => {
  try {
    const identity = 'kitchen-sync';
    const syncGrant = new SyncGrant({
      serviceSid: process.env.TWILIO_SYNC_SERVICE_SID,
    });

    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
    );

    token.addGrant(syncGrant);
    token.identity = identity;

    res.send({
      identity,
      token: token.toJwt(),
    });
  } catch (err) {
    res.status(500).send({ msg: 'Error retrieving Sync token.' });
  }
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
