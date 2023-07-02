const express = require('express');
const router = express.Router();
require('dotenv').config();
const { updateOrderWithMP } = require("../db/queries");

var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.MP_TOKEN);


router.post('/', (req, res) => {
  console.log("Call endpoint /rest/mp")
  mercadopago.payment.save(req.body)
    .then(function(response) {
      console.log("PAGO APROBADO")

      const email = req.body.payer.email;
      if (updateOrderWithMP(email)){
        console.log("Pago actualizado: usuario paga con MP")
      } else {
        console.log("Error intentando actualizar el pago del cliente...")
      }      

      const { status, status_detail, id } = response.body;
      res.status(response.status).json({ status, status_detail, id });
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).json({ error: 'Error al procesar el pago' });
    });
});

module.exports = router;
