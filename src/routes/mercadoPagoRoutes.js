const express = require('express');
const router = express.Router();
require('dotenv').config();

var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.MP_TOKEN);


router.post('/orders/mp', (req, res) => {
  mercadopago.payment.save(req.body)
    .then(function(response) {
      const { status, status_detail, id } = response.body;
      res.status(response.status).json({ status, status_detail, id });
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).json({ error: 'Error al procesar el pago' });
    });
});

module.exports = router;
