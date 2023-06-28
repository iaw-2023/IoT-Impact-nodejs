// loginReactRoutes.js
const express = require("express");
const router = express.Router();
const { db } = require("../db/connection");
const bcrypt = require('bcrypt');


//Lo hice asi feo tendria que ir en queries pero no llego con el tiempo jeje
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query('INSERT INTO "usersReact" (email, password) VALUES ($1, $2) RETURNING id', [email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    throw error;
  }

});

module.exports = router;
