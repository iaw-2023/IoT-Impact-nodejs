// loginReactRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserByEmail } = require("../db/queries");

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await getUserByEmail(email);

    if (user.length > 0 && await bcrypt.compare(password, user[0].password)) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      // Password does not match or user not found
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    let message = error.body;
    return res.status(500).json({ message });
  }

});

module.exports = router;
